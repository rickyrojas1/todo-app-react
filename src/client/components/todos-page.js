import PropTypes from "prop-types";
import React from "react";
import { api } from "../helpers/api";
import Navbar from "./navbar";
import TodoForm from "./todo-form";
import Todos from "./todos";
import SummaryBar from "./summary-bar";

/**
 * TodosPage component
 * @class
 */
class TodosPage extends React.Component {
  /**
   * Base CSS class
   *
   */
  baseCls = "todos-page";

  /**
   * Prop types
   * @static
   */
  static propTypes = {
    params: PropTypes.object
  };

  /**
   * Constructor
   * @constructor
   *
   * @param  {object} props - Props
   */
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      filterBy: "all"
    };

    this.addTodo = this.addTodo.bind(this);
    this.postTodo = this.postTodo.bind(this);
    this.setFilterBy = this.setFilterBy.bind(this);
    this.updateTodos = this.updateTodos.bind(this);
    this.setRemainingTasks = this.setRemainingTasks.bind(this);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    api("GET", "todos", null, this.updateTodos);
  }

  /**
   * Add todo
   *
   * @param  {string} text - Todo text
   */
  addTodo(text) {
    if (!text) {
      return;
    }

    api("POST", "todos", { text }, this.postTodo);
  }

  /**
   * Posts new todo to the todos collection
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  postTodo(json) {
    let { filterBy } = this.state;
    filterBy = filterBy ? filterBy : "all";
    this.setState({
      todos: [...json]
    });

    this.setRemainingTasks(filterBy, json);
  }

  /**
   * Set filterBy state
   *
   * @param {string} filterBy - filterBy state
   */
  setFilterBy(filterBy) {
    this.setState({ filterBy });
    this.setRemainingTasks(filterBy, this.state.todos);
  }

  /**
   * Set Remaining Tasks
   *
   * @param {string} filterBy - filterBy state
   * @param {Array} todos - Array of todo objects
   */
  setRemainingTasks(filterBy, todos) {
    let filterRemaining = filterBy === "all" ? "active" : filterBy;
    if (filterBy === "completed") {
      filterRemaining = "complete";
    }

    let tasksLeft = todos.filter(todo => {
      return todo.status == filterRemaining;
    });
    this.setState({ filterRemaining, tasksLeft });
  }

  /**
   * Update todos array state
   *
   * @param  {Array} todos - Array of todo objects
   */
  updateTodos(todos) {
    let { id } = this.props.match.params;

    this.setRemainingTasks(id ? id : "all", todos);
    this.setState({ todos, filterBy: id });
  }

  /**
   * Render
   * @returns {ReactElement}
   */
  render() {
    const { filterBy, todos, filterRemaining, tasksLeft } = this.state;

    return (
      <div className={this.baseCls}>
        <Navbar filterBy={filterBy} onClickFilter={this.setFilterBy} />

        <SummaryBar
          filterRemaining={filterRemaining}
          tasksLeft={tasksLeft}
          updateTodos={this.updateTodos}
        />

        <TodoForm onSubmit={this.addTodo} updateTodos={this.updateTodos} />

        <Todos
          filterBy={filterBy}
          todos={todos}
          updateTodos={this.updateTodos}
        />
      </div>
    );
  }
}

export default TodosPage;
