import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../rdx/tasks/actions';
import './NewTodoForm.scss';

export const NewTodoForm = () => {
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const onFormSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(addTask(newTodo, newDescription));
    setNewTodo('');
    setNewDescription('');
  }, [newTodo, newDescription, dispatch]);

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
      />
      <button className="todo-form__button" type="submit">
        &#43; Add
      </button>
    </form>
  );
};
