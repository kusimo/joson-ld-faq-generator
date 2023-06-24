import React, { useReducer, useEffect } from "react";
import AddFaq from "./AddFaq";
import FaqList from "./FaqList";

export default function Faq({handleAddNewFaq, generate, level, format}) {

  useEffect(() => {
    handleAddNewFaq(tasks);
  });

  let sourceElement = null
  
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
      handleAddNewFaq(tasks)
    }
  
    function handleChangeTask(task) {
      dispatch({
        type: 'changed',
        task: task
      });

      handleAddNewFaq(tasks);
    }
  
    function handleDeleteTask(taskId) {
      dispatch({
        type: 'deleted',
        id: taskId
      });
      //generate(format, 3);
      handleAddNewFaq(tasks);
    }

    function handleDragTask(updatedTasks) {
      // updated tasks object
      dispatch({
        type: 'update',
        tasks: updatedTasks
      });
      //handleAddNewFaq(updatedTasks);
    }


    function handleDragStart(ev) {
      ev.target.style.opacity = '0.4';
      //ev.dataTransfer.effectAllowed = 'move';
      sourceElement = ev.target
      ev.dataTransfer.effectAllowed = 'move'
    }

    function handleDragEnd(ev) {
      ev.target.style.opacity = '1';
    }

    function handleDragEnter(ev) {
      let targetElement = ev.target.closest('faq-tab')
      targetElement.classList.add('over');
    }

    const handleDragLeave = (event) => {
      let targetElement = event.target.closest('faq-tab');
      targetElement.classList.remove('over')
    }

    function handleDragOver(ev) {
      ev.preventDefault()
      ev.dataTransfer.dropEffect = 'move' 
    }

    function arraymove(arr, fromIndex, toIndex) {
      var element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
      return arr;
    }

    const handleDrop = (event) => {
      event.stopPropagation();
     
      let targetElement = event.target.closest('faq-tab');

      if (sourceElement !== event.target) {

        // Find index of the drag
        const filteredTasks = tasks
        .filter((task, index) => 
          task.id.toString() === sourceElement.id);
        const fromIndex = tasks.indexOf(filteredTasks[0]);
       
        // Find index of the drop
        const filteredTasksTo = tasks
        .filter((task, index) => 
          task.id.toString() === targetElement.id);
        const toIndex = tasks.indexOf(filteredTasksTo[0]);
      
        let newArray = [...tasks];
        const myData = arraymove(newArray, fromIndex, toIndex);
        // Set new state.
        handleDragTask(myData)

      } else {
        targetElement.classList.remove('over') 
      }
    }

  
    return (
      <>
        <FaqList
          tasks={tasks}
          onChangeTask={handleChangeTask}
          onDeleteTask={handleDeleteTask}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDrageEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDrop ={handleDrop}
          onDragLeave={handleDragLeave}
        />
         <AddFaq
          onAddTask={handleAddTask}
          tasks ={tasks}
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
      case 'update': {
        return action.tasks;
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }
  

/*
  let nextId = 3;
  const initialTasks = [
    { id: 0, question: 'Where is Lagos', answer: 'Nigeria',  done: true },
    { id: 1, question: 'Where is Barcelona', answer: 'Spain', done: false },
    { id: 2, question: 'Where is Manchester', answer: 'in the UK', done: false }
  ];
*/
 //*
 let nextId = 1;
  const initialTasks = [
    { id: 0, question: '', answer: '',  done: false }
  ];
//*/
  