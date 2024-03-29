import { useState } from 'react';

export default function AddFaq({ onAddTask, tasks }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  
  return (
    <div className="QA">
       
      <div className="json-ld-container">
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
        <span>Add {tasks.length > 0 ? 'another': ''} Question</span>
      </button>
    </div>
  )
}
