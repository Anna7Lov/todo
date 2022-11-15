import { v4 as uuidv4 } from "uuid";
import { TodoList } from "./components/TodoList/TodoList";
import "./App.scss";

const initialTodosList = [
  {
    id: uuidv4(),
    title: "Learn CSS",
    description: "Watch video and do homework 5",
    status: "Done",
    creationDate: 1569437585730,
    updateDate: null
  },
  {
    id: uuidv4(),
    title: "Bake a birthday cake",
    description: "Honey cake",
    status: "In Progress",
    creationDate: 1665765789757,
    updateDate: 1668364647658
  },
  {
    id: uuidv4(),
    title: "Do English homework",
    description: "Page 35, exercises 1-6",
    status: "Open",
    creationDate: 1668364647658,
    updateDate: null
  },
  {
    id: uuidv4(),
    title: "Buy meat",
    description: "Buy 1.5 kg of beef",
    status: "Done",
    creationDate: Date.now(),
    updateDate: Date.now()
  },
  {
    id: uuidv4(),
    title: "Cook dinner",
    description: "Meat and garnish for 2 persons",
    status: "In Progress",
    creationDate: Date.now(),
    updateDate: null
  },
  {
    id: uuidv4(),
    title: "Learn Redux",
    description: "Watch video tutorial",
    status: "Open",
    creationDate: 1666478568885,
    updateDate: null
  },
  {
    id: uuidv4(),
    title: "Wash the dishes",
    description: "Clean up all dirty dishes",
    status: "Open",
    creationDate: Date.now(),
    updateDate: Date.now()
  }
];

const App = () => {
  return (
    <div className="App">
      <TodoList tasks={initialTodosList} />
    </div>
  );
};

export default App;