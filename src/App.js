import { useEffect, useState } from "react";
import Header from './components/Header';
import AddTask from './components/AddTask';
import Tasks from './components/Tasks';

function App() {
  // Para mostrar el formulario, creamos su estado
  const [showAddTask, setShowAddTask] = useState(false);
  // Para cambiar los estados de los task, dento un array
  const [tasks, setTasks] = useState([]);

  // Algo que sucede por detrás, antes para después mostrarlo en componente
  useEffect(() => {
    // usamos async para obtener una respuesta
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, [])

 
  // Fetch Tasks, esperamos una respuesta de el servidor json
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    
    const data = await res.json();
    return data;
  }


  // Para añadir una nueva task
  const addTask = async(task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
     
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      // El nuevo tasks lo convertimos a json
      body: JSON.stringify(task),
    });

    const data = await res.json();

    // Metemos el nuevo task, dentro de la lista
    setTasks([...tasks, data]);
  }


  // Para eliminar un task
  const deleteTask = async(id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    // console.log('deleted', id)

    // El id de una task que coincida con la lista de task, ese se eliminay qel que no se queda, según la condición del filter 
    setTasks(tasks.filter( (task) => task.id !== id) );
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
      { showAddTask && <AddTask onAdd={addTask} /> }

      {tasks.length > 0 ? (
        <Tasks 
          tasks={tasks} 
          onDelete={deleteTask}
        />
      ): (
        "No Tasks to Show"
      )}
      
    </div>
    
  );
}

export default App;
