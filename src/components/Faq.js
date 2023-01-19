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
      console.log('-------------------------------------------------------------')
    }

    function handleDragEnter(ev) {
      console.log('dragenter', ev.target)
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

    const handleDrop = (event) => {
      event.stopPropagation();
     
      let targetElement = event.target.closest('faq-tab');

      if (sourceElement !== event.target) {
        console.log( 'source: ', sourceElement);
       
        
        /* remove dragged item from list */
        const list = tasks.filter((item, i) => 
          i.toString() !== sourceElement.id)

        /* this is the removed item */
        const removed = tasks.filter((item, i) => 
        i.toString() === sourceElement.id)[0]

        /* insert removed item after this number. */
        let insertAt = Number(targetElement.id)

        console.log('list with item removed', list)
        console.log('removed:  line', removed)
        console.log('insertAt index', insertAt)

        let tempList = []

      /* if dropped at last item, don't increase target id by +1. 
        max-index is arr.length */
          if (insertAt >= list.length) {
            tempList = list.slice(0).concat(removed);
            console.log('New slice', tempList)
            handleDragTask(tempList)
            //handleChangeTask(tempList)
            
            targetElement.classList.remove('over')
          }  else
          if ((insertAt < list.length)) {
          /* original list without removed item until the index it was removed at */
            tempList = list.slice(0,insertAt).concat(removed)
          
            console.log('tempList', tempList)
            console.log('insert the rest: ', list.slice(insertAt))
          
            /* add the remaining items to the list */
            const newList = tempList.concat(list.slice(
              insertAt))
            console.log('newList', newList)
          
            /* set state to display on page */
            //setSortedList(newList)
            handleDragTask(newList)
            
            targetElement.classList.remove('over')
          }

      } else {
        console.log('nothing happened')
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
  

  
  let nextId = 3;
  const initialTasks = [
    { id: 0, question: 'Visit " Kafka Museum', answer: 'test 1',  done: true },
    { id: 1, question: 'Watch a puppet show', answer: 'test 2', done: false },
    { id: 2, question: 'Lennon Wall pic', answer: 'test 3', done: false }
  ];
  
 /*
 let nextId = 1;
  const initialTasks = [
    { id: 0, question: '', answer: '',  done: false }
  ];
  */
  