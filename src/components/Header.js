import PropType from 'prop-types';
import Button from './Button';

const Header = ({ title, onAdd , showAdd}) => {
  return (
    <header>
      <h1 className="header">{title}</h1>

      {/* onAdd, lo usamos para mostrar el form de registro */}
      <Button
        buttonOpenClose={onAdd}
        color={showAdd ? "red" : "green"}
        text={showAdd ? "Close" : "Add Task"}
      />
    </header>
  );
}

// Mediante el Prop agregamos un título por defecto
Header.defaultProps = {
  title: 'Task Tracker',
}

// Declaramos que el título es requerido y de tipo string
Header.propType = {
  title: PropType.string.isRequired,
}

export default Header;