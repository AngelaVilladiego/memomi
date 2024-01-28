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
    sentences = tokenize.sent_tokenize(text)
    return [sentence for sentence in sentences if len(sentence) > 5]

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

def fuzzGetIdxOfMatchInSentence(query, match, threshold):
    threshold = threshold * 100
    ngramSize = len(word_tokenize(query))
    sentence = match['sentence']
    tokenize = word_tokenize(sentence)
    m_ngrams = ngrams(tokenize, ngramSize)
    ngramList = []
    for gram in m_ngrams:
        ngramList.append(" ".join(gram))
    
    matchStrings = []

    for sub in ngramList:
        ratio = fuzz.token_sort_ratio(query, sub)
        if ratio > threshold:
            matchStrings.append({"substring": sub, "ratio": ratio})
    
    if not matchStrings:
        return -1
    
    sortedMatchStrings = sorted(matchStrings, key=lambda k: k["ratio"], reverse=True)
    print("SORTED WHICH WAT???", sortedMatchStrings)

    strongMatchSentenceIdx = sentence.find(sortedMatchStrings[0]["substring"])
    print ("BEEG STRONG WORD:", strongMatchSentenceIdx)
    return {"matchedText":sortedMatchStrings[0]["substring"], "idxInSentence": strongMatchSentenceIdx} 
    
    #for match in matchStrings:
    #    sub = match["substring"]
    #    matchIdxs.append({'matchedText': sub, 'idx': sentence.find(sub)})
    
    #return matchIdxs
    

def cleanOverlappingIndexes(matchingIdxs):
    cleanedIdxs = []

    if not matchingIdxs:
        return cleanedIdxs
    
    sortedIdxs = sorted(matchingIdxs, key=lambda k:(k['startIdx']))
    print("SORTED::: ", sortedIdxs)



    currStartIdx = sortedIdxs[0]["startIdx"]
    highestEndIdx = sortedIdxs[0]["endIdx"]
    n = len(sortedIdxs)
    for i, idxRange in enumerate(sortedIdxs):
        if highestEndIdx < idxRange["startIdx"]:
            currStartIdx = idxRange["startIdx"]
            highestEndIdx = idxRange["endIdx"]

        if idxRange["endIdx"] > highestEndIdx:
            highestEndIdx = idxRange["endIdx"]

        if i == n - 1 or sortedIdxs[i + 1]["startIdx"] > highestEndIdx:
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
        strongestMatchInSentence = fuzzGetIdxOfMatchInSentence(query, res, 0.7)
        
        if strongestMatchInSentence == -1:
            continue

        res['idxOfMatchInSentence'] = strongestMatchInSentence["idxInSentence"]
        res['matchedText'] = strongestMatchInSentence["matchedText"]
        trueMatches.append(res)

    charCount = 0
    charOffsetForSentence = []
    #NOTE: this does not handle if sentences are repeated in the search text unfortunately
    for i, sentence in enumerate(sentences):
        splitStart = 0
        if i > 0:
            splitStart = charOffsetForSentence[i - 1]    
        charOffset= body.lower()[splitStart:].find(sentence.lower()) + splitStart
        charOffsetForSentence.append(charOffset)

    print("+!+!+~++~", charOffsetForSentence)

    finalIdxs = []
    for match in trueMatches:
        offset = charOffsetForSentence[match['sentenceIdx']]
        startIdx = offset + int(match['idxOfMatchInSentence'])
        finalIdxs.append({'startIdx':startIdx, 'endIdx':startIdx + len(match['matchedText'])})
        #print("found '",matchInSentence['matchedText'], "' at idx: ", startIdx)

    cleanedIdxs = cleanOverlappingIndexes(finalIdxs)

    for idxRange in cleanedIdxs:
        print("CLEANED EXTRACTION AT STARTIDX OF ", idxRange["startIdx"], "ENDIDX OF ", idxRange["endIdx"], ":")
        print(body[idxRange["startIdx"]:idxRange["endIdx"]])

    #STUFF



    return cleanedIdxs