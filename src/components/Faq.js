import React, { useReducer } from "react";
import AddFaq from "./AddFaq";
import FaqList from "./FaqList";

export default function Faq({handleAddNewFaq}) {
  
    const [tasks, dispatch] = useReducer(
      tasksReducer,
      initialTasks
    );
  
    function handleAddTask(question, answer) {
      dispatch({
        type: 'added',
        id: nextId++,
        question: question,
        answer: answer,
      });
    }
  
    function handleChangeTask(task) {
      dispatch({
        type: 'changed',
        task: task
      });
    }
  
    function handleDeleteTask(taskId) {
      dispatch({
        type: 'deleted',
        id: taskId
      });
      
    }

  
    return (
      <>
       
        <FaqList
          tasks={tasks}
          onChangeTask={handleChangeTask}
          onDeleteTask={handleDeleteTask}
        />
         <AddFaq
          onAddTask={handleAddTask}
        />
      </>
    );
  }
  
  function tasksReducer(tasks, action) {
    switch (action.type) {
      case 'added': {
        return [...tasks, {
          id: action.id,
          question: action.question,
          answer: action.answer,
          done: false
        }];
      }
      case 'changed': {
        return tasks.map(t => {
          if (t.id === action.task.id) {
            return action.task;
          } else {
            return t;
          }
        });
      }
      case 'deleted': {
        return tasks.filter(t => t.id !== action.id);
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }
  
  let nextId = 3;
  const initialTasks = [
    { id: 0, question: 'Visit Kafka Museum', answer: 'test 1',  done: true },
    { id: 1, question: 'Watch a puppet show', answer: 'test 2', done: false },
    { id: 2, question: 'Lennon Wall pic', answer: 'test 3', done: false }
  ];
  