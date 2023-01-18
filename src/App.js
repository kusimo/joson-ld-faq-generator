import './App.css';
import { beaufityJson, updateHtml, escapeSpecialChars } from './Helper';
import Selection from './components/Selection';
import { useState, useEffect } from 'react';
import Faq from './components/Faq';



function App() {

  const [minifyFaq, setminifyFaq] = useState(false);
  const [minifyLevel, setMinifyLevel] = useState(minifyFaq ? 0 : 3);
  const [outputFormat, setOutputFormat] = useState('jsonld');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    generateFaqOutput(outputFormat, minifyLevel);    
  });


  const getCurrentFormat = (f) => {
    setOutputFormat(f);
    return f;
  }

  const handleOutput = (value) => {
    generateFaqOutput(value);
  }

  const handleAddNewFaq = (value) => {
    setTasks(value);
    console.log(tasks)
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
            let faqHeader = escapeSpecialChars(header.innerHTML);
            let faqBody = escapeSpecialChars(question.innerHTML);

            let obj = `
              {
                "@type": "Question",
                "name": "${faqHeader}",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "${faqBody}"
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

  return (
    <div className="App">
      <div className='AppWrapper'>
        <div className='faqContainer'>
          <Faq handleAddNewFaq={handleAddNewFaq} generate={generateFaqOutput}  level={minifyFaq} format={outputFormat} />
        </div>
        <div className='jsonContainer'>
          <div className='jsonContent'>
            <textarea spellCheck={false} defaultValue='<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[]}</script>'>
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
