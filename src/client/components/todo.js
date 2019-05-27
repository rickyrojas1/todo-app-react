import PropTypes from "prop-types";
import React from "react";
import Button from "./button";
import TodoLink from "./todo-link";
import Checkbox from "./checkbox";

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filtered: PropTypes.bool,
  onClickDelete: PropTypes.func,
  onClickTodo: PropTypes.func,
  status: PropTypes.string,
  text: PropTypes.string
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filtered: false,
  onClickDelete: noop,
  onClickTodo: noop,
  status: "",
  text: ""
};

/**
 * Todo component
 * @returns {ReactElement}
 */
const Todo = ({
  filtered,
  onClickDelete,
  onClickArchive,
  onClickTodo,
  status,
  text
}) => {
  /**
   * Base CSS class
   */
  const baseCls = "todo";
  const isComplete = status === "complete";
  const isArchived = status === "archived";

  const todoCls =
    baseCls +
    (isComplete || isArchived ? " todo--status-complete" : "") +
    (filtered ? " todo--filtered" : "");

  return (
    <li className={todoCls}>
      <Checkbox status={status} onClickTodo={onClickTodo} />
      <TodoLink status={status} text={text} onClick={onClickTodo} />
      {(isComplete || isArchived) && (
        <Button
          text={isComplete ? "Archive" : "Restore"}
          onClick={onClickArchive}
        />
      )}
      <Button text="Delete" onClick={onClickDelete} />
    </li>
  );
};

Todo.propTypes = propTypes;
Todo.defaultProps = defaultProps;

export default Todo;
