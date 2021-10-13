// Aqui se muestra cada elemento registrado
const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div>
      <h3>{task.text}</h3>
      <p>{task.date}</p>
    </div>
  )
}

export default Task