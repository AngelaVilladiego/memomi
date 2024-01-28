from ExtractTopicKeywords import removeExistingLinks

def preWrap (content):
    return f"<pre style='white-space:pre-wrap;'>{content}</pre>"

def tagBody(content, existingLinks, suggestionLinks):
    if not existingLinks:
        existingLinks = []

    if not suggestionLinks:
        suggestionLinks = []


    #sortedLinks = sorted(existingLinks, key=lambda d: d["linkIndexes"]["startIdx"])
    #sortedSuggests = sorted(suggestionLinks, key=lambda d:d["suggestionIndexes"]["startIdx"])
    together = []

    cleanSuggestionLinks = removeExistingLinks(suggestionLinks, existingLinks)

    for link in existingLinks:
        together.append({"type": "link", "indexes": link["linkIndexes"], "key": link["linkedMemoId"]})

    for suggest in cleanSuggestionLinks:
        together.append({"type": "suggest", "indexes": suggest["suggestionIndexes"], "key": suggest["suggestedTitle"]})

    sortedTogether = sorted(together, key=lambda d: d["indexes"]["startIdx"])

    offset = 0;
    for item in sortedTogether:
        if item["type"] == "link":
            preTag = f'<span class="linkToMemo" data-id="{item["key"]}">'
            postTag = "</span>"
        else:
            preTag = f'<span class="suggest" data-title="{item["key"]}">'
            postTag = "</span>"

        rawStartIdx = item["indexes"]["startIdx"]
        rawEndIdx = item["indexes"]["endIdx"]

        sIdx = rawStartIdx + offset
        newContent = content[:sIdx] + preTag + content[sIdx:]

        print("INSERTED PRE")

        offset += len(preTag)
        eIdx = rawEndIdx + offset

        content = newContent
        newContent = content[:eIdx] + postTag + content[eIdx:]
        
        print("INSERTED POST")

        offset += len(postTag)
        content = newContent

    return(preWrap(content))



