import './index.css';
import { useState, useEffect } from "react"
import Header from "./Components/Header";
import Tasks from './Components/Tasks';
import AddTask from './Components/AddTask';

function App() {
  const [showAddTask, setShowAddTask]=useState(false)
  const [tasks, setTasks]=useState([])



  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])
//fetch Tasks 

  const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()

  return data
}



//Add Task
const addTask = async (task) =>{
  const res = await fetch ('http://localhost:5000/tasks' , {
    method :'Post', 
    headers : {
      'content-type': 'application/json'
    },
    body : JSON.stringify(task),
  })
  const data = await res.json()
  setTasks ([...tasks,data])
}



//Delete Task
const deleteTask= async(id)=>{
  await fetch (`http://localhost:5000/tasks/${id}` ,{
    method :'DELETE'
  })
setTasks(tasks.filter((task) => task.id !==id))
}

//Toggle reminder
const toggleReminder=(id)=>{
setTasks(
  tasks.map((task)=>
  task.id ===id? {...task, reminder :!task.reminder}:task)
)
}


  return (
    <div className="container">
<Header onAdd={() => setShowAddTask (!showAddTask)}  
showAdd={showAddTask}
/>
{ showAddTask && <AddTask onAdd={addTask}/>}
{tasks.length >0 ? (
<Tasks tasks={tasks} onDelete={deleteTask}  onToggle={toggleReminder} /> ) :(
  'No Tasks to Show'
)}
    </div>
  );
}

export default App;
