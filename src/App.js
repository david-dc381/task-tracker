import { useState } from "react";
import Header from './components/Header';
import AddTask from './components/AddTask';
import Tasks from './components/Tasks';

function App() {
  // Para mostrar el formulario, creamos su estado
  const [showAddTask, setShowAddTask] = useState(false);
  // Para cambiar los estados de los task, dento un array
  const [task, setTask] = useState([]);

  // const tasks = [
  //   {
  //     id: 1,
  //     text: 'Doctor',
  //     day: '$th July',
  //     reminder: true,
  //   },
  //   {
  //     id: 2,
  //     text: 'Profesor',
  //     day: '6th August',
  //     reminder: false,
  //   }
  // ]

  const addTask = async(task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      

    });
  }

  return (
    <div className="container">
        
      <Header
      // pasamos a true el showAddTask
        onAdd={() => setShowAddTask(!showAddTask)}
        // Cambiamos el estado de el button de 'Add Task' a 'Close' y sus colores
        showAdd={showAddTask}
      />

      {/* Si es true 'showAddTask', nos muestra el form */}
      { showAddTask && <AddTask/> }

      {/* <Tasks tasks={tasks} /> */}
      
    </div>
    
  );
}

export default App;
