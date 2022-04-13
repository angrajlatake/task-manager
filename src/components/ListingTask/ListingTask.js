import React, { Component } from "react";
import "./ListingTask.scss";
import axios from "axios";
import TaskForm from "../TaskForm/TaskForm";
const API_URL = "https://angralatake-task-manager.herokuapp.com/tasks/";
class ListingTask extends Component {
  state = {
    categoryList: [],
    addButtonClicked: false,
  };

  sortTasksByCategory(data) {
    const categoryList = [];
    data.forEach((task) => {
      const currentCategory = task.category.toLowerCase();
      let categoryExsited = false;
      for (let i = 0; i < categoryList.length; ++i) {
        if (categoryList[i].categoryName === currentCategory) {
          categoryList[i].tasks.push(task);
          categoryExsited = true;
          break;
        }
      }
      if (!categoryExsited) {
        const newCategory = {
          categoryName: currentCategory,
          tasks: [task],
        };
        categoryList.push(newCategory);
      }
    });
    this.setState({ categoryList });
  }

  componentDidMount() {
    axios
      .get(API_URL)
      .then((response) => {
        this.sortTasksByCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleAdd = (event) => {
    event.preventDefault();
    const newTask = {
      category: event.target.category.value,
      content: event.target.content.value,
      priority: event.target.priority.value,
      date: event.target["due-date"].value,

    };
    axios
      .post(API_URL, newTask)
      .then((response) => {
        this.sortTasksByCategory(response.data);
        event.target.category.value = ""
        event.target.content.value = ""
        event.target.priority.value = ""
        event.target['due-date'].value = ""
        this.setState({
          addButtonClicked: false
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDelete = (event) => {
    event.preventDefault();
    const taskDiv = event.target.closest(".task");
    for (let i = 0; i < taskDiv.attributes.length; ++i) {
      const { name, value } = taskDiv.attributes[i];
      if (name === "id") {
        axios
          .delete(`${API_URL}${value}`)
          .then((response) => {
            this.sortTasksByCategory(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  render() {
    const { categoryList } = this.state;
    return (
      <div className="main">
        <button
          className="main__add-button btn"
          onClick={() => {
            this.setState((state) => ({
              addButtonClicked: !state.addButtonClicked,
            }));
          }}
        >
          +
        </button>
        {this.state.addButtonClicked && <TaskForm handleAdd={this.handleAdd} />}
        {categoryList.length === 0 ? (
          <></>
        ) : (
          <div className="tasks">
            {categoryList.map((category) => {
              return (
                <div className="tasks__container" key={category.categoryName}>
                  <h2 className="tasks__category">{category.categoryName}</h2>
                  {category.tasks.map((task) => {
                    return (
                      <div className="task" id={task.id} key={task.id}>
                        <p className="task__content">{task.content}</p>
                        <p className="task__priority">Level {task.priority}</p>
                        <p className="task__date">
                          {new Date(task.due).toLocaleDateString("en-US")}
                        </p>
                        <button
                          className="task__button"
                          onClick={this.handleDelete}
                        >
                          Delete
                        </button>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default ListingTask;
