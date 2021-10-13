import { BsXCircleFill } from "react-icons/bs"; //iconos de bootstrap

// Aqui se muestra cada elemento registrado
const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div
      // si el reminder es true cambia de color
      className={`task ${task.remider ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}
        <BsXCircleFill
         style={{ color: "red" }} 
         onClick={() => onDelete(task.id)}
        />
      </h3>

      <p>{task.day}</p>
    </div>
  );
};

export default Task;
