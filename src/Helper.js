
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

export const faqGenerator = (obj, format='html', minify=false, htmlStyle='', htmlIcon ='plus') => {
  let total = obj.length;
  
  switch (format) {
    
    // Generate the JsonLd FAQ Title & Content.
    case 'jsonld':
      let counter = 0;
      let contentStart = `<script type="application/ld+json">`;
      let content = `
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [`;
      obj.forEach(item => {
        counter++;
        
        let question = item.question;
        let answer = item.answer;

        let obj = `
          {
            "@type": "Question",
            "name": "${escapeSpecialChars(question)}",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "${escapeSpecialChars(answer)}"
            }
          }`;
        counter !== total ? content += obj + ',' : content += obj;

      })
      content += `]
        }`;

      let contentEnd = `
      </script>`;

      let result = contentStart + content + contentEnd ;

      console.log('result', result);

      
      break;

    case 'html':
     
      const faqContent = obj.map((item, i) => {
        return `
          <faq-tab classname="tab">
              <div class="tab-wrapper">
                  <input id="tab-${i}" type="checkbox" name="tabs">
                  <label for="tab-${i}" class="h4 accordion-title faq-icon-${htmlIcon}">
                      <span>${item.question}</span>
                  </label>
                  <div class="tab-content">
                    ${item.answer}
                  </div>
              </div>
          </faq-tab>`
      })
      
      let htmlContent = `
      <div class="faqContainer">
        <div class="faq__accordion">
            ${faqContent}
        </div>
      </div>
      `;
      console.log(htmlContent)

      break;

    default :
    console.log('default')
  } // End switch
}