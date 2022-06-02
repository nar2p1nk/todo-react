import axios from 'axios'
import {useEffect, useState} from "react";

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
      {todo.map((item)=>{
        return(
          <p>{item.todo}</p>
        )
      })}
    </div>
  );
}

export default App;
