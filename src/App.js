import axios from 'axios'
import {useEffect, useState} from "react";
import './App.css';

function App() {

  const [checkedTodo,setCheckedTodo] = useState([])
  const [todo,setTodo] = useState([])

  const handleCheckedTodo = (e) =>{
    if(e.target.checked === true){
      const listTodo = [...checkedTodo,e.target.value]
      setCheckedTodo(listTodo)
      console.log(checkedTodo,e.target.value)
    }
    if(e.target.checked === false){
      const newTodo = checkedTodo;
      const id = newTodo.indexOf(e.target.value)
      newTodo.splice(id,1)
      setCheckedTodo(newTodo);
      console.log(checkedTodo,'deletion')
    }
  }
  const postCheckedTodo = () =>{
    console.log(checkedTodo)

  }

  useEffect(()=>{
    axios.get('http://localhost:8000/todo/').then((response)=>{
      const data = [...response.data]
      setTodo(data)
    })
  },[])
  return (
    <div className="App">
      <h1 className="title">Todo-app</h1>
      <form >
        <input className='inputTodo' type="text" placeholder='enter todo' />
        <button className='postTodo'>Create todo</button>
      </form>
      <div className='uncomplete'>
      <ul className="todoList">
        {todo.map(i=>{
          if(i.completed === 1){
            return(null);
          }
            return(
              <li id={i.todoId} key={i.todoId}>
                <p>
                  <label>{i.todo}</label>
                  <input type='checkbox'
                  value={i.todoId} onClick={handleCheckedTodo}/>
                </p>
              </li>
            )
        })}
        <button type='button' className="check" onClick={postCheckedTodo}>
        complete checked tasks</button>
      </ul>
      </div>
      <div className='complete'>
        <h3>completed:</h3>
      <ul>
        {todo.map(i=>{
          // filter uncompleted todo
          if(i.completed === 0){
            return(null);
          }
            return(
              <li id={i.todoId} key={i.todoId}>
                <p>
                  <label>{i.todo}</label>
                  <input type='checkbox'
                  value={i.todoId} onClick={handleCheckedTodo}/>
                </p>
              </li>
            )
        })}
        <button className='check' onClick={postCheckedTodo}>
        Delete tasks</button>
      </ul>
      </div>
    </div>
  );
}

export default App;
