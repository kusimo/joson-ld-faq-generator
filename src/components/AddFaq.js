import { useState } from 'react';

export default function AddFaq({ onAddTask }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  return (
    <div className="QA">
       
      <div className="container">
          <div className='input-wrapper'>
              <label htmlFor="QA__question">Faq question</label>
              <input
                id="QA__question" 
                name="QA__question"
                placeholder="Faq question"
                value={question}
                onChange={e => setQuestion(e.target.value)}
              />
          </div>
          <div className='input-wrapper'>
              <label htmlFor="QA__answer">Faq answer</label>
              <textarea 
                name="QA__answer" 
                id="QA__answer"
                placeholder="Faq answer" 
                onChange={e => setAnswer(e.target.value)} 
                value={answer}></textarea>
          </div>
      </div>
      <button className='add-new' onClick={() => {
        setQuestion('');
        setAnswer('');
        onAddTask(question, answer);
      }}>
        <span className='icon-plus'>+</span>
        <span>Add (another) FAQ</span>
      </button>
    </div>
  )
}
