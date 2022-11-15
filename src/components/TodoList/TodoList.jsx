import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import { useState, useCallback, useEffect } from "react";
import { NewTodoForm } from "../NewTodoForm/NewTodoForm";
import { DropDownList } from "../DropDownList/DropDownList";
import { TodoItem } from "../TodoItem/TodoItem";
import "./TodoList.scss";

const filterByStatusList = [
  {
    id: 10,
    title: "Filter by status",
    list: [
      { id: 11, value: "► Choose status" },
      { id: 12, value: "Open" },
      { id: 13, value: "In Progress" },
      { id: 14, value: "Done" },
      { id: 15, value: "All statuses" }
    ]
  }
];

const sortByList = [
  {
    id: 20,
    title: "Sort by",
    list: [
      { id: 21, value: "► Sort by" },
      { id: 22, value: "Creation date (Early to Late)" },
      { id: 23, value: "Creation date (Late to Early)" },
      { id: 24, value: "Update date (Early to Late)" },
      { id: 25, value: "Update date (Late to Early)" },
      { id: 26, value: "Default" }
    ]
  }
];

export const TodoList = ({ tasks }) => {
  const [todos, setTodos] = useState(tasks);
  const [updatedItem, setUpdatedItem] = useState(null);
  const [todosDisplayed, setTodosDisplayed] = useState(todos);
  const [selectedStatus, setSelectedStatus] = useState("All statuses");
  const [selectedSortBy, setSelectedSortBy] = useState("Default");

  const addTodo = useCallback(
    (newTodo, newDescription) => {
      setTodos([
        ...todos,
        {
          id: uuidv4(),
          title: newTodo,
          description: newDescription,
          status: "Open",
          creationDate: Date.now(),
          updateDate: null
        }
      ]);
    },
    [todos]
  );

  const removeTodo = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  const editTodo = useCallback(
    (id) => {
      setUpdatedItem(updatedItem === id ? null : id);
    },
    [updatedItem]
  );

  const updateTodo = useCallback(
    (newValue) => {
      setTodos([
        ...todos.slice(
          0,
          todos.findIndex((i) => i.id === updatedItem)
        ),
        newValue,
        ...todos.slice(todos.findIndex((i) => i.id === updatedItem) + 1)
      ]);
    },

    [todos, updatedItem]
  );

  const changeStatus = useCallback(
    (id, newStatus) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                status: newStatus,
                updateDate:
                  todo.status === newStatus ? todo.updateDate : Date.now()
              }
            : todo
        )
      );
    },
    [todos]
  );  

  const filterByStatus = useCallback((e) => {
    setSelectedStatus(e.target.value);
  }, []);

  const sortByDate = useCallback((e) => {
    setSelectedSortBy(e.target.value);
  }, []);

  useEffect(() => {
    if (selectedStatus === "All statuses" && selectedSortBy === "Default") {
      setTodosDisplayed(todos);
    } else if (selectedStatus !== "All statuses" && selectedSortBy === "Default") {
      setTodosDisplayed(todos.filter((todo) => todo.status === selectedStatus));
    } else if (selectedStatus !== "All statuses" && selectedSortBy === "Creation date (Early to Late)") {
      setTodosDisplayed(
        todos
          .filter((todo) => todo.status === selectedStatus)
          .sort((a, b) => (a.creationDate > b.creationDate ? 1 : -1))
      );
    } else if (selectedStatus !== "All statuses" && selectedSortBy === "Creation date (Late to Early)") {
      setTodosDisplayed(
        todos
          .filter((todo) => todo.status === selectedStatus)
          .sort((a, b) => (b.creationDate > a.creationDate ? 1 : -1))
      );
    } else if (selectedStatus !== "All statuses" && selectedSortBy === "Update date (Early to Late)") {
      setTodosDisplayed(
        todos
          .filter((todo) => todo.status === selectedStatus)
          .sort((a, b) => (a.updateDate > b.updateDate ? 1 : -1))
      );
    } else if (selectedStatus !== "All statuses" && selectedSortBy === "Update date (Late to Early)"
    ) {
      setTodosDisplayed(
        todos
          .filter((todo) => todo.status === selectedStatus)
          .sort((a, b) => (b.updateDate > a.updateDate ? 1 : -1))
      );
    } else if (selectedStatus === "All statuses" && selectedSortBy === "Creation date (Early to Late)") {
      setTodosDisplayed([...todos].sort((a, b) => (a.creationDate > b.creationDate ? 1 : -1)));
    } else if (selectedStatus === "All statuses" && selectedSortBy === "Creation date (Late to Early)") {
      setTodosDisplayed([...todos].sort((a, b) => (b.creationDate > a.creationDate ? 1 : -1)));
    } else if (selectedStatus === "All statuses" && selectedSortBy === "Update date (Early to Late)") {
      setTodosDisplayed([...todos].sort((a, b) => (a.updateDate > b.updateDate ? 1 : -1)));
    } else if (selectedStatus === "All statuses" && selectedSortBy === "Update date (Late to Early)") {
      setTodosDisplayed([...todos].sort((a, b) => (b.updateDate > a.updateDate ? 1 : -1)));
    }
  }, [todos, selectedStatus, selectedSortBy]);

  return (
    <div className="todo-list">
      <h1 className="todo-list__title">ToDo List</h1>
      <NewTodoForm addTodo={addTodo} />
      <div className="todo-list__changes">
        <DropDownList
          items={filterByStatusList}
          handleSelectChange={filterByStatus}
        />
        <DropDownList
          items={sortByList}
          handleSelectChange={sortByDate} />
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
      updateDate: PropTypes.number
    })
  )
};