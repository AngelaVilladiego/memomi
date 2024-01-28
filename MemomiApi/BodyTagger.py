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
        preTag = f'<a href="#" onClick={{() => {{console.log("{link["linkedMemoId"]}")}}}}class="color:red;">'
        postTag = "</a>"
        rawStartIdx = link["linkIndexes"]["startIdx"]
        rawEndIdx = link["linkIndexes"]["endIdx"]
        sIdx = rawStartIdx + offset - 1
        newContent = content[:sIdx] + preTag + content[sIdx:]
        offset += len(preTag)
        eIdx = rawEndIdx + offset
        content = newContent
        newContent = content[:eIdx] + preTag + content[eIdx:]
        offset += len(postTag)
        content = newContent

    return(content)



