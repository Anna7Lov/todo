import PropTypes from 'prop-types';
import { React, useState, useCallback } from 'react';
import { DropDownList } from '../DropDownList/DropDownList';
import './TodoItem.scss';

const statusList = [
  {
    id: 1,
    title: 'New status:',
    list: [
      { id: 2, value: '► Change status' },
      { id: 3, value: 'Open' },
      { id: 4, value: 'In Progress' },
      { id: 5, value: 'Done' },
    ],
  },
];

export const TodoItem = ({
  todo,
  isUpdated,
  onUpdate,
  setUpdatedItem,
  onStatusChange,
  onEdit,
  onDelete,
}) => {
  const [newValue, setNewValue] = useState(todo);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onUpdate(newValue);
      setUpdatedItem(undefined);
    },
    [onUpdate, newValue, setUpdatedItem],
  );

  const onReset = useCallback(
    (e) => {
      e.preventDefault();
      setNewValue(todo);
      setUpdatedItem(undefined);
    },
    [todo, setUpdatedItem],
  );

  const onTitleChange = useCallback(
    (e) => {
      const value = e.target.value;
      setNewValue({
        ...newValue,
        title: value,
        status: todo.status,
        updateDate: Date.now(),
      });
    },
    [newValue, todo.status],
  );

  const onDescriptionChange = useCallback(
    (e) => {
      const value = e.target.value;
      setNewValue({
        ...newValue,
        description: value,
        status: todo.status,
        updateDate: Date.now(),
      });
    },
    [newValue, todo.status],
  );

  const changeStatus = useCallback(
    (e) => {
      onStatusChange(todo.id, e.target.value);
    },
    [onStatusChange, todo.id],
  );

  const onEditClick = useCallback(() => {
    onEdit(todo.id);
  }, [onEdit, todo.id]);

  const onDeleteClick = useCallback(() => {
    onDelete(todo.id);
  }, [onDelete, todo.id]);

  return (
    <li className="todo-item">
      {isUpdated ? (
        <form onSubmit={onSubmit} onReset={onReset}>
          <input
            className="todo-item__input"
            onChange={onTitleChange}
            value={newValue.title}
          />
          <textarea
            className="todo-item__textarea"
            rows="5"
            onChange={onDescriptionChange}
            value={newValue.description}
          />
          <div>
            <div className="todo-item__buttons">
              <button className="todo-item__primary-button" type="submit">
                &#10004; Apply
              </button>
              <button className="todo-item__danger-button" type="reset">
                &#10008; Cancel
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div>
          <div className="todo-item__content">
            <h2 className="todo-item__title">{todo.title}</h2>
            <p className="todo-item__description">{todo.description}</p>
            <span className="todo-item__data">
              Current status:
              {' '}
              <span
                style={{
                  fontWeight: 600,
                  color:
                    todo.status === 'Open'
                      ? 'rgb(228, 37, 31)'
                      : todo.status === 'In Progress'
                        ? 'rgb(255, 140, 0)'
                        : 'rgb(7, 150, 5)',
                }}
              >
                {todo.status}
              </span>
            </span>
            <DropDownList
              items={statusList}
              handleSelectChange={changeStatus}
              additionalClass="status-list"
            />
            <span className="todo-item__data">
              Creation date:
              {' '}
              {todo.creationDate
                ? new Date(todo.creationDate).toLocaleDateString()
                : ''}
            </span>
            <span className="todo-item__data">
              Update date:
              {' '}
              {todo.updateDate
                ? new Date(todo.updateDate).toLocaleDateString()
                : 'No updates'}
            </span>
          </div>
          <div className="todo-item__buttons">
            <button
              className="todo-item__primary-button"
              type="submit"
              onClick={onEditClick}
            >
              &#10000; Edit
            </button>
            <button
              className="todo-item__danger-button"
              type="submit"
              onClick={onDeleteClick}
            >
              &#10006; Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    creationDate: PropTypes.number.isRequired,
    updateDate: PropTypes.number,
  }),
  isUpdated: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  setUpdatedItem: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
