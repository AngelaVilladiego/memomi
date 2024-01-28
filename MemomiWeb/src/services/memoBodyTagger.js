export const preWrap = (content) => {
  return '<pre style="white-space:pre-wrap;">' + content + "</pre>";
};

export const tagBody = (content, existingLinks = [], suggestionLinks = []) => {
  //existing
  var sortedLinks = sortLinks(existingLinks);
  var offset = 0;
  sortedLinks.forEach((link) => {
    var preTag =
      '<a href="#" onClick={() => console.log("clicked!",' +
      link.linkedMemoId +
      ')} class="color:red;">';
    var postTag = "</a>";
    var rawStartIdx = link.linkIndexes.startIdx;
    var rawEndIdx = link.linkIndexes.endIdx;
    content = content.insert(rawStartIdx + offset, preTag);
    offset += preTag.length;
    content = content.insert(rawEndIdx + offset, postTag);
    offset += postTag.length;
  });

  console.log(content);
  return preWrap(content);
};

export const sortLinks = (links) => {
  return links.sort(function (first, second) {
    return first.linkIndexes.startIdx - second.linkIndexes.startIdx;
  });
};

String.prototype.insert = function (index, string) {
  if (index > 0) {
    return (
      this.substring(0, index) + string + this.substring(index, this.length)
    );
  }

  return string + this;
};
