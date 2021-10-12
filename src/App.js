import { useState } from "react";
import Header from "./components/Header";
import AddTask from "./components/AddTask";

function App() {
  // Para mostrar el formulario, creamos su estado
  const [showAddTask, setShowAddTask] = useState(false);

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

      
    </div>
    
  );
}

export default App;
