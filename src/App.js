import './App.css';
import { beaufityJson, updateHtml } from './Helper';
import Selection from './components/Selection';
import { useState, useEffect } from 'react';



function App() {
  const [minifyFaq, setminifyFaq] = useState(false);
  const [minifyLevel, setMinifyLevel] = useState(minifyFaq ? 0 : 3);
  const [outputFormat, setOutputFormat] = useState('jsonld');

  useEffect(() => {
    generateFaqOutput(outputFormat, minifyLevel);
  })


  const getCurrentFormat = (f) => {
    setOutputFormat(f);
    return f;
  }

  const handleOutput = (value) => {
    generateFaqOutput(value);
  }


/**
 * 
 * @param {string} format 
 * @param {number} level 
 */
  const generateFaqOutput = (format, level = minifyLevel) => {
    setMinifyLevel(level);
    let tabs = document.querySelectorAll('.tab-wrapper');
    let textarea = document.querySelector('.jsonContent textarea');
    let faqsQ = document.querySelectorAll('.accordion-title span');
    let faqsA = document.querySelectorAll('.tab-content');

    if (faqsQ.length > 0 && faqsA.length > 0) {
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
          tabs.forEach(item => {
            counter++;
            let header = item.querySelector('.accordion-title span');
            let question = item.querySelector('.tab-content');
            let obj = `
              {
                "@type": "Question",
                "name": "${header.innerHTML}",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "${question.innerHTML}"
                }
              }`;
            counter !== tabs.length ? content += obj + ',' : content += obj;

          })
          content += `]
            }`;

          let contentEnd = '</script>';
         
         
          minifyFaq ? textarea.value = contentStart + beaufityJson(content, 0) + contentEnd 
          :
          textarea.value = contentStart + beaufityJson(content, level) + contentEnd;
    
          
          break;

        case 'html':
          updateHtml(textarea, minifyFaq);

          break;

        default :
        updateHtml(textarea, minifyFaq);
      } // End switch

    } // End If

  } // End function.



  const ToggleSwitch = ({ title }) => {
    const onToggleSwitchChange = () => {
      setminifyFaq(!minifyFaq);

      let level = minifyFaq === false ? 0 : 3;
      if(outputFormat === 'jsonld') {
        generateFaqOutput('jsonld', level);
      }

      if (outputFormat === 'html') {
        let textarea = document.querySelector('.jsonContent textarea');
        updateHtml(textarea, minifyFaq);
      }

      
    }
    return (
      <div className='ToggleSwitch ToggleSwitch__rounded'>
        <span className='ToggleSwitch__title'>{title}</span>
        <div className='ToggleSwitch__wrapper'>
          <div className={`Slider ${minifyFaq && 'isChecked'}`} onClick={onToggleSwitchChange}></div>
        </div>
      </div>
    )

  }
  const handleAddNew = () => {
    const insertAt = 0;
    /*
    const nextFaqs = [
      ...faqs.slice(0, insertAt),
      //New item:
      {id: nextId++, question: question, answer: answer }, 
      // Items after the insertion point:
      ...faqs.slice(insertAt)
    ];
    setFaqs(nextFaqs);
    */

  }

  return (
    <div className="App">
      <div className='AppWrapper'>
        <div className='faqContainer'>
          <div className='faq__accordion'>
            <faq-tab className='tab'>
              <div className='tab-wrapper'>
                <input id='tab-1' type='checkbox' name='tabs' />
                <label htmlFor='tab-1' className='h4 accordion-title'>
                  <span>What is lorem ipsum?</span>
                  <div className='user-actions'>
                    <button className='btn-remove'>
                      <svg viewBox="0 0 24 24"><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"></path></svg>
                    </button>
                    <button className='btn-drag'>
                      <svg viewBox="0 0 24 24"><path d="M9,3H11V5H9V3M13,3H15V5H13V3M9,7H11V9H9V7M13,7H15V9H13V7M9,11H11V13H9V11M13,11H15V13H13V11M9,15H11V17H9V15M13,15H15V17H13V15M9,19H11V21H9V19M13,19H15V21H13V19Z"></path></svg>
                    </button>
                  </div>
                </label>
                <div className='tab-content'>
                  <p>
                    This is the content. Needs to be hidden.
                  </p>
                </div>
              </div>
            </faq-tab>
            <faq-tab className='tab'>
              <div className='tab-wrapper'>
                <input id='tab-2' type='checkbox' name='tabs' />
                <label htmlFor='tab-2' className='h4 accordion-title'>
                  <span>What made lorem?</span>
                  <div className='user-actions'>
                    <button className='btn-remove'>
                      <svg viewBox="0 0 24 24"><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"></path></svg>
                    </button>
                    <button className='btn-drag'>
                      <svg viewBox="0 0 24 24"><path d="M9,3H11V5H9V3M13,3H15V5H13V3M9,7H11V9H9V7M13,7H15V9H13V7M9,11H11V13H9V11M13,11H15V13H13V11M9,15H11V17H9V15M13,15H15V17H13V15M9,19H11V21H9V19M13,19H15V21H13V19Z"></path></svg>
                    </button>
                  </div>
                </label>
                <div className='tab-content'>
                  <p>
                    No weapon formed against me shall prosper, it wouldn't work. They just wouldn't work.
                  </p>
                </div>
              </div>
            </faq-tab>
          </div>
          <button onClick={handleAddNew} className='add-new'>
            <span className='icon-plus'>+</span>
            <span>Add (another) FAQ</span>
          </button>
        </div>
        <div className='jsonContainer'>
          <div className='jsonContent'>
            <textarea defaultValue='<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[]}</script>'>
            </textarea>
          </div>
          <div className='user-action-bottom'>
            <Selection getCurrentFormat={getCurrentFormat} handleOutput={handleOutput} />
            <ToggleSwitch title={minifyFaq ? 'Minify(ON)' : 'Minify(OFF)'} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
