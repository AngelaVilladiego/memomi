def preWrap (content):
    return f"<pre style='white-space:pre-wrap;'>{content}</pre>"

def tagBody(content, existingLinks, suggestionLinks):
    if not existingLinks:
        existingLinks = []

    if not suggestionLinks:
        suggestionLinks = []

    sortedLinks = sorted(existingLinks, key=lambda d: d["linkIndexes"]["startIdx"])
    offset = 0;
    for link in sortedLinks:
        preTag = '<a href="#" class="linkToMemo">'
        postTag = "</a>"
        rawStartIdx = link["linkIndexes"]["startIdx"]
        rawEndIdx = link["linkIndexes"]["endIdx"]

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



