import os
from dotenv import load_dotenv
import cohere
from nltk import tokenize
from nltk import word_tokenize
from nltk.util import ngrams
from fuzzywuzzy import fuzz

load_dotenv()
API_KEY = os.getenv('COHERE_API_KEY')

co = cohere.Client(API_KEY)

def getSentences(text):
    return tokenize.sent_tokenize(text)

def getRerank(query, documents, threshold):
    results = co.rerank(query=query, documents=documents, model='rerank-english-v2.0')
    return [r for r in results if r.relevance_score >= threshold]

#get the index of matching tokens in sentence relative to the sentence.
def getIdxOfMatchesInSentence(query, match, threshold):
    ngramSize = len(word_tokenize(query))
    sentence = match['sentence']
    tokenize = word_tokenize(sentence)
    m_ngrams = ngrams(tokenize, ngramSize)
    ngramList = []
    for gram in m_ngrams:
        ngramList.append(" ".join(gram))
    
    results = getRerank(query, ngramList, threshold)
    for idx, r in enumerate(results):
        print(f"Document Rank: {idx + 1}, Document Index: {r.index}")
        print(f"Document: {r.document['text']}")
        print(f"Relevance Score: {r.relevance_score:.2f}")
        print("\n")
    matchStrings = [r.document['text'] for r in results]
    matchIdxs = []
    for sub in matchStrings:
        matchIdxs.append({'matchedText': sub, 'idx': sentence.find(sub)})
    
    return matchIdxs

def fuzzGetIdxOfMatchesInSentence(query, match, threshold):
    threshold = threshold * 100
    ngramSize = len(word_tokenize(query))
    sentence = match['sentence']
    tokenize = word_tokenize(sentence)
    m_ngrams = ngrams(tokenize, ngramSize)
    ngramList = []
    for gram in m_ngrams:
        ngramList.append(" ".join(gram))
    
    matchStrings = [sub for sub in ngramList if fuzz.token_sort_ratio(query, sub) >= threshold]
    print("fuzz: ", matchStrings)
    matchIdxs = []
    for sub in matchStrings:
        matchIdxs.append({'matchedText': sub, 'idx': sentence.find(sub)})
    
    return matchIdxs
    

def cleanOverlappingIndexes(matchingIdxs):
    cleanedIdxs = []

    sortedIdxs = sorted(matchingIdxs, key=lambda k:(k['startIdx']))



    currStartIdx = sortedIdxs[0]["startIdx"]
    highestEndIdx = sortedIdxs[0]["endIdx"]
    n = len(sortedIdxs)
    for i, idxRange in enumerate(sortedIdxs):
        if currStartIdx < idxRange["startIdx"]:
            currStartIdx = idxRange["startIdx"]
            highestEndIdx = idxRange["endIdx"]

        if idxRange["endIdx"] > highestEndIdx:
            highestEndIdx = idxRange["endIdx"]

        if i == n - 1 or sortedIdxs[i + 1]["startIdx"] != currStartIdx:
            cleanedIdxs.append({"startIdx":currStartIdx, "endIdx":highestEndIdx})

    print("sorted:", sortedIdxs)
    print("cleaned:", cleanedIdxs)
    return cleanedIdxs

def findIndexesOfQuery(query, body):
    query = query.lower()
    sentences = getSentences(body.lower())
    results = getRerank(query, sentences, 0.5)
    for idx, r in enumerate(results):
        print(f"Document Rank: {idx + 1}, Document Index: {r.index}")
        print(f"Document: {r.document['text']}")
        print(f"Relevance Score: {r.relevance_score:.2f}")
        print("\n")

    trueMatches = []
    for r in results:
        res = {'sentenceIdx': int(r.index), 'sentence':r.document['text']}
        sentenceIdxs = fuzzGetIdxOfMatchesInSentence(query, res, 0.7)
        
        if not sentenceIdxs:
            continue

        res['matchesInSentence'] = [idx for idx in sentenceIdxs]
        trueMatches.append(res)

    charCount = 0
    charOffsetForSentence = []
    #NOTE: this does not handle if sentences are repeated in the search text unfortunately
    for sentence in sentences:    
        charOffsetForSentence.append(body.find(sentence))

    finalIdxs = []
    for match in trueMatches:
        offset = charOffsetForSentence[match['sentenceIdx']]
        for matchInSentence in match['matchesInSentence']:
            startIdx = offset + int(matchInSentence['idx'])
            finalIdxs.append({'startIdx':startIdx, 'endIdx':startIdx + len(matchInSentence['matchedText'])})
            #print("found '",matchInSentence['matchedText'], "' at idx: ", startIdx)

    cleanedIdxs = cleanOverlappingIndexes(finalIdxs)
    return cleanedIdxs