import axios from 'axios'
import {useEffect, useState} from "react";
import './App.css';

function App() {

  const [todo,setTodo] = useState([])

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
        <input type="text" placeholder />
        <button>Create todo</button>
      </form>
      <div className='uncomplete'>
      <ul className="todoList">
        {todo.map(i=>{
          if(i.completed === 1){
            return(null);
          }
            return(
              <li id={i.todoId} key={i.todoId}>{i.todo}</li>
            )
        })}
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
              <li id={i.todoId} key={i.todoId}>{i.todo}</li>
            )
        })}
      </ul>
      </div>
    </div>
  );
}

export default App;
