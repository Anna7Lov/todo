import PropTypes from 'prop-types';
import {
  React, useState, useCallback, useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import { NewTodoForm } from '../NewTodoForm/NewTodoForm';
import { DropDownList } from '../DropDownList/DropDownList';
import { TodoItem } from '../TodoItem/TodoItem';
import { removeTask, updateTask, changeTaskStatus } from '../../rdx/tasks/actions';
import './TodoList.scss';

const filterByStatusList = [
  {
    id: 10,
    title: 'Filter by status',
    list: [
      { id: 11, value: '► Choose status' },
      { id: 12, value: 'Open' },
      { id: 13, value: 'In Progress' },
      { id: 14, value: 'Done' },
      { id: 15, value: 'All statuses' },
    ],
  },
];

const sortByList = [
  {
    id: 20,
    title: 'Sort by',
    list: [
      { id: 21, value: '► Sort by' },
      { id: 22, value: 'Creation date (Early to Late)' },
      { id: 23, value: 'Creation date (Late to Early)' },
      { id: 24, value: 'Update date (Early to Late)' },
      { id: 25, value: 'Update date (Late to Early)' },
      { id: 26, value: 'Default' },
    ],
  },
];

export const TodoList = ({ tasks }) => {
  const dispatch = useDispatch();
  const [updatedItem, setUpdatedItem] = useState(null);
  const [todosDisplayed, setTodosDisplayed] = useState(tasks);
  const [selectedStatus, setSelectedStatus] = useState('All statuses');
  const [selectedSortBy, setSelectedSortBy] = useState('Default');

  const removeTodo = useCallback((id) => {
    dispatch(removeTask(id));
  }, [dispatch]);

  const editTodo = useCallback(
    (id) => {
      setUpdatedItem(updatedItem === id ? null : id);
    },
    [updatedItem],
  );

  const updateTodo = useCallback((newValue) => {
    dispatch(updateTask(newValue, updatedItem));
  }, [dispatch, updatedItem]);

  const changeStatus = useCallback(
    (id, newStatus) => {
      dispatch(changeTaskStatus(id, newStatus));
    },
    [dispatch],
  );

  const filterByStatus = useCallback((e) => {
    setSelectedStatus(e.target.value);
  }, []);

  const sortByDate = useCallback((e) => {
    setSelectedSortBy(e.target.value);
  }, []);

  useEffect(() => {
    if (selectedStatus === 'All statuses' && selectedSortBy === 'Default') {
      setTodosDisplayed(tasks);
    } else if (selectedStatus !== 'All statuses' && selectedSortBy === 'Default') {
      setTodosDisplayed(tasks.filter((todo) => todo.status === selectedStatus));
    } else if (selectedStatus !== 'All statuses' && selectedSortBy === 'Creation date (Early to Late)') {
      setTodosDisplayed(
        tasks
          .filter((todo) => todo.status === selectedStatus)
          .sort((a, b) => (a.creationDate > b.creationDate ? 1 : -1)),
      );
    } else if (selectedStatus !== 'All statuses' && selectedSortBy === 'Creation date (Late to Early)') {
      setTodosDisplayed(
        tasks
          .filter((todo) => todo.status === selectedStatus)
          .sort((a, b) => (b.creationDate > a.creationDate ? 1 : -1)),
      );
    } else if (selectedStatus !== 'All statuses' && selectedSortBy === 'Update date (Early to Late)') {
      setTodosDisplayed(
        tasks
          .filter((todo) => todo.status === selectedStatus)
          .sort((a, b) => (a.updateDate > b.updateDate ? 1 : -1)),
      );
    } else if (selectedStatus !== 'All statuses' && selectedSortBy === 'Update date (Late to Early)'
    ) {
      setTodosDisplayed(
        tasks
          .filter((todo) => todo.status === selectedStatus)
          .sort((a, b) => (b.updateDate > a.updateDate ? 1 : -1)),
      );
    } else if (selectedStatus === 'All statuses' && selectedSortBy === 'Creation date (Early to Late)') {
      setTodosDisplayed([...tasks].sort((a, b) => (a.creationDate > b.creationDate ? 1 : -1)));
    } else if (selectedStatus === 'All statuses' && selectedSortBy === 'Creation date (Late to Early)') {
      setTodosDisplayed([...tasks].sort((a, b) => (b.creationDate > a.creationDate ? 1 : -1)));
    } else if (selectedStatus === 'All statuses' && selectedSortBy === 'Update date (Early to Late)') {
      setTodosDisplayed([...tasks].sort((a, b) => (a.updateDate > b.updateDate ? 1 : -1)));
    } else if (selectedStatus === 'All statuses' && selectedSortBy === 'Update date (Late to Early)') {
      setTodosDisplayed([...tasks].sort((a, b) => (b.updateDate > a.updateDate ? 1 : -1)));
    }
  }, [tasks, selectedStatus, selectedSortBy]);

  return (
    <div className="todo-list">
      <h1 className="todo-list__title">ToDo List</h1>
      <NewTodoForm />
      <div className="todo-list__changes">
        <DropDownList
          items={filterByStatusList}
          handleSelectChange={filterByStatus}
        />
        <DropDownList
          items={sortByList}
          handleSelectChange={sortByDate}
        />
      </div>
      <ul className="todo-list__items">
        {todosDisplayed.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            isUpdated={todo.id === updatedItem}
            onUpdate={updateTodo}
            setUpdatedItem={setUpdatedItem}
            onStatusChange={changeStatus}
            onEdit={editTodo}
            onDelete={removeTodo}
          />
        ))}
      </ul>
    </div>
  );
};

TodoList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      status: PropTypes.string,
      creationDate: PropTypes.number,
      updateDate: PropTypes.number,
    }),
  ),
};
