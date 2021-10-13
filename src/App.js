import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './components/Header';
import AddTask from './components/AddTask';
import Tasks from './components/Tasks';
import Footer from './components/Footer';
import About from './components/About';

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

 
  // Fetch Tasks, esperamos una respuesta de el servidor json. Obtenemos todos los tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    
    const data = await res.json();
    return data;
  }

  // Obtenemos solo un task especifíco
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
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

    // El id de una task que coincida con la lista de task, ese se eliminay qel que no se queda, según la condición del filter 
    setTasks(tasks.filter( (task) => task.id !== id) );
  }

  // Para cambiar el toggle
  const toggleReminder = async (id) => {
    // obtenemos el id especifíco de el json
    const taskToToggle = await fetchTask(id);

    // actualizamos el task, con su reminder true o false
    const updateTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updateTask),
    });

    const data = await res.json();

    // Cambiamos el estado de el reminder
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder }
        : task
      )
    );
  };

  return (
    <Router>
      <div className="container col-lg-6 px-5">
        <Header
          // pasamos a true el showAddTask
          onAdd={() => setShowAddTask(!showAddTask)}
          // Cambiamos el estado de el button de 'Add Task' a 'Close' y sus colores
          showAdd={showAddTask}
        />

        {/* Todo esto se mostrará en la ruta principal */}
        <Route 
          path="/"
          exact
          render={ (props) => (
            <>
              {/* Si es true 'showAddTask', nos muestra el form */}
              {showAddTask && <AddTask onAdd={addTask} />}

              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                <h3 style={{ 'font-weight': 'bold' }}>No Tasks To Show</h3>
              )}
            </>
          ) }
        />

        {/* En la ruta /about se mostrará el componente About */}
        <Route path="/about" component={About}/>
        {/* Mostramos el footer */}
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
