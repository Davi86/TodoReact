import React, { useState, useEffect } from "react";
import axios from 'axios'
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./Components/Header";
import "./app.css";
import Tasks from "./Components/Tasks";
import AddTask from "./Components/AddTask";
import TaskDetails from "./Components/TaskDetails";

//COMPONENTE DE CLASSE
/*class App extends React.Component{
  constructor() {
    super();

    this.state = {
      message: "Hello World!",
    };
  }

  componentDidMount() {
    console.log("Foi renderizado pela primeira vez");
  }

  handleMessageChangeClick() {
    this.setState({message: 'heloooo'})
  }

  render() {
    return (
      <>
        <h1>{this.state.message}</h1>
        <button onClick={this.handleMessageChangeClick.bind(this)}>Mudar Mensagem</button>
      </>
    )
  }

}

export default App;*/

//COMPONENTE DE FUNÇÃO
const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Learning Programming",
      completed: true,
    },
    {
      id: "2",
      title: "Ler Livros",
      completed: true,
    },
  ]);

  useEffect(() => {
    const fetchTasks = async () => {
      const  {data} = await axios.get(
        "https://jsonplaceholder.cypress.io/todos?_limit=10"
      );
      setTasks(data);
    };
    fetchTasks();
  }, [Tasks]);

  const handleTaskClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) return { ...task, completed: !task.completed };
      return task;
    });
    setTasks(newTasks);
  };

  const handleTaskAddition = (taskTitle) => {
    const newTasks = [
      ...tasks,
      {
        title: taskTitle,
        id: uuidv4(),
        completed: false,
      },
    ];
    setTasks(newTasks);
  };

  const handleTaskDeletion = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  };

  return (
    <Router>
      <div className="container">
        <Header />
        <Route
          path="/"
          exact
          render={() => (
            <>
              <AddTask handleTaskAddition={handleTaskAddition} />
              <Tasks
                tasks={tasks}
                handleTaskClick={handleTaskClick}
                handleTaskDeletion={handleTaskDeletion}
              />
            </>
          )}
        />
        <Route path="/:taskTitle" exact component={TaskDetails} />
      </div>
    </Router>
  );
};

export default App;
