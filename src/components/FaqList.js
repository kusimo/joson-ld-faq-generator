import { useState } from 'react';

export default function FaqList({
  tasks,
  onChangeTask,
  onDeleteTask
}) {
  return (
    <div className='faq__accordion'>
      {tasks.map(task => (
        <faq-tab className='tab' key={task.id}>
            
          <Task
            task={task}
            onChange={onChangeTask}
            onDelete={onDeleteTask}
            classN='faq-wrapper'
          />
        </faq-tab>
      ))}
    </div>
  );
}

function Task({ task, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
    <div className='container editing-tab-wrapper'>

        <div className='editing-content'>
          <input
            value={task.question}
            onChange={e => {
              onChange({
                ...task,
                question: e.target.value
              });
            }} />
          <textarea onChange={e => {
            onChange({
              ...task,
              answer: e.target.value
            });
          }} value={task.answer} ></textarea>
        </div>
        <div className='button-wrapper user-actions'>
          <button onClick={() => setIsEditing(false)}>
          <svg className='ok-button'   strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm-5.049 10.386 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z"/></svg>
          </button>
          <button className='drag-btn'>
          <svg viewBox="0 0 24 24"><path d="M9,3H11V5H9V3M13,3H15V5H13V3M9,7H11V9H9V7M13,7H15V9H13V7M9,11H11V13H9V11M13,11H15V13H13V11M9,15H11V17H9V15M13,15H15V17H13V15M9,19H11V21H9V19M13,19H15V21H13V19Z"></path></svg>
          </button>
        </div>
      </div>
    );
  } else {
    taskContent = (
        <div className='tab-wrapper'>
               <input id={`tab-${task.id}`}
                type="checkbox"
                name='tabs'
                checked={task.done}
                onChange={e => {
                onChange({
                    ...task,
                    done: e.target.checked
                });
                }}
            />
            <label htmlFor={`tab-${task.id}`} className='h4 accordion-title'>
            <span>{task.question}</span>
            <div className='user-actions'>
              <button onClick={() => setIsEditing(true)}>
              <svg  strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.134 19.319 11.587-11.588c.171-.171.279-.423.279-.684 0-.229-.083-.466-.28-.662l-3.115-3.104c-.185-.185-.429-.277-.672-.277s-.486.092-.672.277l-11.606 11.566c-.569 1.763-1.555 4.823-1.626 5.081-.02.075-.029.15-.029.224 0 .461.349.848.765.848.511 0 .991-.189 5.369-1.681zm-3.27-3.342 2.137 2.137-3.168 1.046zm.955-1.166 10.114-10.079 2.335 2.327-10.099 10.101z" /></svg>
              </button>
              <button className='btn-remove' onClick={() => onDelete(task.id)}>
              <svg viewBox="0 0 24 24"><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"></path></svg>
              </button>
             
            </div>
            </label>
            <div className='tab-content'>
            {task.answer}
            </div>
            
           
        </div>
      
    );
  }
  return (
    <>
      {taskContent}
    </>
  );
}
