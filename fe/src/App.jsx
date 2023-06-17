import "./App.css";
import { useEffect, useState, useRef } from "react";
import { getTodos, createTodo, updateCompleteness, deleteTodo } from "./api";

function App() {
  const [controlledInput, setControlledInput] = useState("");
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  const handleUpdateTodos = async () => {
    const { data } = await getTodos();
    setTodos(data);
  };

  useEffect(() => {
    handleUpdateTodos();
  }, []);

  const onInputChange = (e) => {
    setControlledInput(inputRef.current.value);
  };

  const handleCatchEnter = (e) => {
    if (e.key === "Enter") {
      handleCreateTodo();
    }
  };

  const handleCreateTodo = async () => {
    if (inputRef.current.value) {
      const { data: newTodo } = await createTodo(inputRef.current.value);
      setControlledInput("");

      setTodos([...todos, newTodo]);
    }
  };

  const handleUpdateTodo = async (id, value) => {
    const { data: updatedTodo } = await updateCompleteness(id, value);
    const newTodosArray = todos.map((item) => (item._id === id ? updatedTodo : item));
    setTodos(newTodosArray);
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    const newTodosArray = todos.filter((item) => item._id !== id);
    setTodos(newTodosArray);
  };

  return (
    <div className="App">
      <div className="query-input">
        <input
          ref={inputRef}
          value={controlledInput}
          onChange={(e) => onInputChange(e)}
          onKeyDown={(e) => handleCatchEnter(e)}
        />
        <button onClick={() => handleCreateTodo()}>add</button>
      </div>
      <ul className="list">
        {todos.map((item) => (
          <li key={item._id} className="list-item">
            {item.text}
            <div className="list-item-action">
              <input
                checked={item.completed}
                type="checkbox"
                onChange={(e) => handleUpdateTodo(item._id, e.target.checked)}
              />
              <button onClick={() => handleDeleteTodo(item._id)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
