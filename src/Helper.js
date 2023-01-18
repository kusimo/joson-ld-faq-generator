
export const TestingHelper = () => {
    console.log('helper');
}

export const beaufityJson = (content, n = 3) => {
  
    return JSON.stringify(JSON.parse(content), null, n)
  }

  export const formatHtml = (html) => {
    var tab = '\t';
    var result = '';
    var indent = '';

    html.split(/>\s*</).forEach(function (element) {
      if (element.match(/^\/\w/)) {
        indent = indent.substring(tab.length);
      }

      result += indent + '<' + element + '>\r\n';

      if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input")) {
        indent += tab;
      }
    });

    return result.substring(1, result.length - 3);
  }

  export const removeElement = (elem) => {
    if (elem.length > 0)
      elem.forEach(e => {
        e.remove();
      })
  }


  export const updateHtml = (textarea, minify) => {
    let htmlOutput = ``;
          let styleStart = `<style>`;
          let styleEnd = `</style>`;
          let newFaq = document.querySelector('.faqContainer').cloneNode(true);
          let userActions = newFaq.querySelectorAll('.user-actions');
          let addBtn = newFaq.querySelectorAll('.add-new');

          removeElement(userActions);
          removeElement(addBtn);

          htmlOutput += styleStart;
          htmlOutput += styleEnd;
          htmlOutput += newFaq.outerHTML;

          textarea.value = minify ? htmlOutput : formatHtml(htmlOutput);
  }

  export const escapeSpecialChars = (jsonString) => {
    return jsonString.replace(/\n/g, "\\n")
                     .replace(/\r/g, "\\r")
                     .replace(/\t/g, "\\t")
                     .replace(/\f/g, "\\f")
                     .replace(/\"/g, "\\\"")
                     .replace(/\'/g, "\\'")
                     .replace(/\&/g, "\\&");
}

  