import PropTypes from "prop-types";
import React from "react";
import Button from "./button";
import TodoLink from "./todo-link";
import Checkbox from "./checkbox";
import { api } from "../helpers/api";
const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filterRemaining: PropTypes.string,
  tasksLeft: PropTypes.array,
  updateTodos: PropTypes.func
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterRemaining: "",
  tasksLeft: [],
  updateTodos: noop
};

/**
 * SummaryBar component
 * @returns {ReactElement}
 */
const SummaryBar = ({ filterRemaining, tasksLeft, updateTodos }) => {
  /**
   * Base CSS class
   */
  const baseCls = "summary-bar";
  let endOfText;
  let action;
  let switchTo;
  let clickHandler = () => {
    api("PUT", "multipleTodos", { filterRemaining, switchTo }, updateTodos);
  };

  if (filterRemaining === "active") {
    endOfText = "remaining";
    action = "Complete";
    switchTo = "complete";
  }

  if (filterRemaining === "complete") {
    endOfText = "completed";
    action = "Archive";
    switchTo = "archived";
  }

  if (filterRemaining === "archived") {
    endOfText = "archived";
    action = "Restore";
    switchTo = "complete";
  }

  return (
    <div className={baseCls}>
      <span className={`${baseCls}__text `}>
        {tasksLeft.length} task{tasksLeft.length === 1 ? "" : "s"} {endOfText}
      </span>
      {tasksLeft.length > 0 && (
        <span className={`${baseCls}__link `} onClick={clickHandler}>
          {action} All
        </span>
      )}
    </div>
  );
};

SummaryBar.propTypes = propTypes;
SummaryBar.defaultProps = defaultProps;

export default SummaryBar;
