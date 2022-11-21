import { v4 as uuidv4 } from 'uuid';

export const ADD_TASK = '@tasks/ADD_TASK';
export const REMOVE_TASK = '@tasks/REMOVE_TASK';
export const UPDATE_TASK = '@tasks/UPDATE_TASK';
export const CHANGE_TASK_STATUS = '@tasks/CHANGE_STATUS';

export const addTask = (newTodo, newDescription) => ({
  type: ADD_TASK,
  payload: {
    id: uuidv4(),
    title: newTodo,
    description: newDescription,
    status: 'Open',
    creationDate: Date.now(),
    updateDate: null,
  },
});

export const removeTask = (id) => ({
  type: REMOVE_TASK,
  id,
});

export const updateTask = (newValue, updatedItem) => ({
  type: UPDATE_TASK,
  newValue,
  updatedItem,
});

export const changeTaskStatus = (id, newStatus) => ({
  type: CHANGE_TASK_STATUS,
  id,
  newStatus,
});
