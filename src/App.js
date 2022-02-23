import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import './css/App.css';
import './css/toDoList/toDoList.css'
import { ToDoList } from './components/ToDoList';
import { v4 as uuid } from 'uuid';
import React from 'react';

export const App = () => {
const [toDoList, setToDoList] = React.useState([]);
const [input, setInput] = React.useState("");


React.useEffect(()=>{
  checkLocalStorage();
},[])

const inputChangeHandler = (e) => {
  setInput(e.target.value);
}

const submitToDoHandler = (e) => {
  e.preventDefault();
  if(input) {
    const toDo = {
      id: uuid(),
      text: input
    }
    addLocalStorage(toDo);
    setToDoList([...toDoList, toDo]);
    setInput("");
  } else {
    alert("Input is empty!");
  }
}

const deleteToDoHandler = (id) => {
  setToDoList(
    toDoList.filter(toDo => toDo.id !== id)
  )
  deleteLocalStorage(id);
}

const addLocalStorage = (toDo) => {
  if(!localStorage.getItem("toDos")) {
    const toDos = [toDo];
    localStorage.setItem("toDos", JSON.stringify(toDos));
  } else {
    let toDos = JSON.parse(localStorage.getItem("toDos"));
    toDos = [...toDos, toDo];
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }
}

const deleteLocalStorage = (id) => {
  let toDos = JSON.parse(localStorage.getItem("toDos"));
  toDos = toDos.filter(toDo => toDo.id !== id);
  localStorage.setItem("toDos", JSON.stringify(toDos));
}

const checkLocalStorage = () => {
  if(localStorage.getItem("toDos")) {
    const toDos = JSON.parse(localStorage.getItem("toDos"));
    setToDoList(toDos);
  }
}

  return (
    <div className='container'>
      <div className="App">
        <form onSubmit={submitToDoHandler}>
        <h1 style={{fontFamily:"cursive"}}>You have {toDoList.length} todos</h1>

          <div  className="input-group mb-3 myInput">
            <input  
              type="text"
              className="form-control "
              value={input}
              onChange={inputChangeHandler}
            />
            <button   className="btn btn-primary" type='submit' >SUBMIT</button>
          </div>
            {toDoList.map((toDo) => {
              return (
                <ToDoList
                  key={toDo.id}
                  text={toDo.text}
                  onDelete={() => deleteToDoHandler(toDo.id)}
                />
              )
            })}
        </form>

       
      </div>



    </div>
  );
}



