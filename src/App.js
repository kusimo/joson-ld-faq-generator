import './App.css';
import { faqGenerator } from './Helper';
import Selection from './components/Selection';
import { useState, useEffect, createRef } from 'react';
import Faq from './components/Faq';
import { CopyToClipboard } from 'react-copy-to-clipboard';


function App() {

  const [minifyFaq, setminifyFaq] = useState(false);
  const [minifyLevel, setMinifyLevel] = useState(minifyFaq ? 0 : 3);
  const [outputFormat, setOutputFormat] = useState('jsonld');
  const [tasks, setTasks] = useState([]);
  const [textareaValue, setTextareaValue] = useState(null);
  const [copied, setCopied] = useState(false);
  const textareaRef = createRef();

  useEffect(() => {
    generateFaqOutput(outputFormat, minifyLevel);  
    setTextareaValue(textareaRef.current.value);
  });

  const handleBorderColor = () => {
    const currentElem = textareaRef.current;
    setTimeout(function() {
      currentElem.style.border = "1px solid #FF9800";
      setCopied(true)
   },100);

   setTimeout(function() {
    currentElem.style.border = "1px solid #cacaca";
   }, 400);

   setTimeout(function() {
    setCopied(false)
   }, 1500);

  }


  const getCurrentFormat = (f) => {
    setOutputFormat(f);
    return f;
  }

  const handleOutput = (value) => {
    generateFaqOutput(value);
  }

  const handleAddNewFaq = (value) => {
    setTasks(value);
    //console.log(tasks)
    faqGenerator(value);
  }


/**
 * 
 * @param {string} format 
 * @param {number} level 
 */
  const generateFaqOutput = (format, level = minifyLevel) => {
    setMinifyLevel(level);
    let textarea = document.querySelector('.jsonContent textarea');

      textarea.value = faqGenerator(tasks, format, minifyFaq);
      
      textarea.style.height = 'inherit';
      textarea.style.height = `${textarea.scrollHeight}px`; 

  } // End function.



  const ToggleSwitch = ({ title }) => {
    const onToggleSwitchChange = () => {
      setminifyFaq(!minifyFaq);

      if(outputFormat === 'jsonld') {
        generateFaqOutput('jsonld', minifyFaq);
      }

      if (outputFormat === 'html') {
        generateFaqOutput('html', minifyFaq);
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
            <textarea 
              spellCheck={false} 
              disabled 
              ref={textareaRef}
              defaultValue='<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[]}</script>'>
            </textarea>
          </div>
          <div className='user-actions-wrapper'>
            <div className='user-action-top'>
              <CopyToClipboard text={textareaValue}
                onCopy={() => handleBorderColor()}>
                <button className="btn">
                  <span>{copied ? 'Copied' : `Copy ${outputFormat ==='html'? 'HTML': 'FAQ Schema'}`}</span>
                </button>
              </CopyToClipboard>
              {outputFormat === 'jsonld' ? (
                <button className='btn'>
                <span>Test in SDTT</span>
              </button>
              ) : 
              (
                <button className='btn'>
                  <span>Preview HTML</span>
              </button>
              )
            }
            
            </div>
            <div className='user-action-bottom'>
              <Selection getCurrentFormat={getCurrentFormat} handleOutput={handleOutput} />
              <ToggleSwitch title={minifyFaq ? 'Minify(ON)' : 'Minify(OFF)'} />
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default App;
