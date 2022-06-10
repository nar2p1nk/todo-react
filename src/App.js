import axios from 'axios'
import {useEffect, useState} from "react";
import './App.css';

function App() {

  const [newTodo,setNewTodo] = useState('')
  const [todoToComplete,setTodoToComplete] = useState([])
  const [deleteTodo, setDeleteTodo] = useState([])
  const [todo,setTodo] = useState([])

  const onChange = (e,setUseState)=>{
    setUseState(e.target.value)
  }

  const createTodo = () =>{
    console.log(newTodo)
    axios.post('http://localhost:8000/todo/create',{
      todo:newTodo
    })
      .then((response)=>{
        setTodo(response.data)
        console.log(response.data)
      })
      .catch((err)=>console.log(err))
    setNewTodo('')
  }

  const completeTodo = () =>{
    console.log(todoToComplete)
    axios.post('http://localhost:8000/todo/complete',{
      list:todoToComplete
    })
      .then((res)=>{console.log(res.data);setTodo(res.data)})
      .catch((err)=> console.log(err))
  }

  const handleCheckedTodo = (e,setUsestate,usestate) =>{
    if(e.target.checked === true){
      const listTodo = [...usestate,e.target.value]
      setUsestate(listTodo)
      console.log(usestate,e.target.value,'checking')
    }
    if(e.target.checked === false){
      const newTodo = usestate;
      const id = newTodo.indexOf(e.target.value)
      newTodo.splice(id,1)
      setUsestate(newTodo);
      console.log(usestate,'unchecking')
    }
  }
  const postDeleteTodo = () =>{
    console.log(deleteTodo)
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
      <form onSubmit={e=>{e.preventDefault()}}>
        <input className='inputTodo' type="text" placeholder='enter todo'
          onChange={e=>onChange(e,setNewTodo)} value={newTodo} />
        <button className='postTodo' onClick={createTodo}>Create todo</button>
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
                    value={i.todoId} onClick={(e) =>
                  handleCheckedTodo(
                    e,setTodoToComplete,todoToComplete)}/>
                </p>
              </li>
            )
        })}
        <button type='button' className="check" onClick={completeTodo}>
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
                    value={i.todoId} onClick={(e)=>handleCheckedTodo(e,setDeleteTodo,deleteTodo)}/>
                </p>
              </li>
            )
        })}
        <button className='check' onClick={postDeleteTodo}>
        Delete tasks</button>
      </ul>
      </div>
    </div>
  );
}

export default App;
