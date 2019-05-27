import PropTypes from "prop-types";
import React from "react";

import { api } from "../helpers/api";
import Todo from "./todo";

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filterBy: PropTypes.string,
  todos: PropTypes.arrayOf(PropTypes.object),
  updateTodos: PropTypes.func
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterBy: "",
  todos: [],
  updateTodos: noop
};

/**
 * Todos component
 * @returns {ReactElement}
 */
const Todos = ({ filterBy, todos, updateTodos }) => {
  /**
   * Base CSS class
   */
  const baseCls = "todos";

  /**
   * Callback function to handle todo updates
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  const handleTodoUpdates = json => {
    updateTodos(json);
  };

  /**
   * Click handler for clicking on delete button
   * Deletes todo
   *
   * @param {object} todo - Todo object
   */
  const onClickDelete = todo => {
    api("DELETE", "todos", todo, handleTodoUpdates);
  };

  /**
   * Click handler for clicking on archive button
   * Archives todo
   *
   * @param {object} todo - Todo object
   */
  const onClickArchive = todo => {
    const newTodo = Object.assign({}, todo);
    newTodo.status = todo.status === "complete" ? "archived" : "complete";

    api("PUT", "todos", newTodo, handleTodoUpdates);
  };

  /**
   * Click handler for clicking on the todo
   * Toggles status state of Todo
   *
   * @param {object} todo - Todo object
   */
  const onClickTodo = todo => {
    const newTodo = Object.assign({}, todo);
    newTodo.status = todo.status === "complete" ? "active" : "complete";

    api("PUT", "todos", newTodo, handleTodoUpdates);
  };

  /**
   * Renders All Todos
   *
   * @returns {Array} - Returns an array of Todo React Elements
   */
  const renderTodos = () => {
    if (!Array.isArray(todos)) {
      return null;
    }
    return todos.map(todo => {
      let filtered;
      switch (filterBy) {
        case "active":
          filtered = todo.status !== "active";
          break;
        case "completed":
          filtered = todo.status !== "complete";
          break;
        case "archived":
          filtered = todo.status !== "archived";
          break;
        default:
          filtered = todo.status === "archived" ? true : false;
      }

      return (
        <Todo
          key={todo.id}
          filtered={filtered}
          onClickDelete={onClickDelete.bind(this, todo)}
          onClickTodo={onClickTodo.bind(this, todo)}
          onClickArchive={onClickArchive.bind(this, todo)}
          status={todo.status}
          text={todo.text}
        />
      );
    });
  };

  return <ul className={baseCls}>{renderTodos()}</ul>;
};

Todos.propTypes = propTypes;
Todos.defaultProps = defaultProps;

export default Todos;
