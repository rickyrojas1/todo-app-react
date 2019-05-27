import PropTypes from "prop-types";
import React from "react";

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  status: PropTypes.string
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  onClick: noop,
  text: "",
  status: ""
};

/**
 * Link component
 * @returns {ReactElement}
 */
const TodoLink = ({ status, text, onClick }) => {
  /**
   * Base CSS class
   */
  const baseCls = "todo-link";
  const isComplete = status === "complete";
  const isArchived = status === "archived";

  const todoLinkCls =
    baseCls + (isComplete || isArchived ? " todo-link--status-complete" : "");

  return (
    <div className={todoLinkCls} onClick={isArchived ? null : onClick}>
      {text}
    </div>
  );
};

TodoLink.propTypes = propTypes;
TodoLink.defaultProps = defaultProps;

export default TodoLink;
