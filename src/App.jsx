import React from 'react';
import { useSelector } from 'react-redux';
import { TodoList } from './components/TodoList/TodoList';
import { selectAllTasks } from './rdx/tasks/selectors';
import './App.scss';

const App = () => {
  const tasks = useSelector(selectAllTasks);
  return (
    <div className="App">
      <TodoList tasks={tasks} />
    </div>
  );
};

export default App;
