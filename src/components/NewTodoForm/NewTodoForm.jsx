import PropTypes from "prop-types";
import { useState, useCallback } from "react";
import "./NewTodoForm.scss";

export const NewTodoForm = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const onFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      addTodo(newTodo, newDescription);
      setNewTodo("");
      setNewDescription("");
    },
    [addTodo, newTodo, newDescription]
  );

  const onInputChange = useCallback((e) => {
    setNewTodo(e.target.value);
  }, []);

  const onTextAreaChange = useCallback((e) => {
    setNewDescription(e.target.value);
  }, []);  

  return (
    <form className="todo-form" onSubmit={onFormSubmit}>
      <input
        type="text"
        className="todo-form__input"
        value={newTodo}
        onChange={onInputChange}
        placeholder="Title"
      />
      <textarea
        className="todo-form__textarea"
        rows="5"
        value={newDescription}
        onChange={onTextAreaChange}
        placeholder="Description"
      ></textarea>
      <button className="todo-form__button" type="submit">
        &#43; Add
      </button>
    </form>
  );
};

NewTodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired
};