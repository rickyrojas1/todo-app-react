import PropTypes from "prop-types";
import React from "react";
import check from "../assets/images/check.png";

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  status: PropTypes.string,
  onClickTodo: PropTypes.func
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  status: "",
  onClickTodo: noop
};

/**
 * Todo component
 * @returns {ReactElement}
 */
const Checkbox = ({ onClickTodo, status }) => {
  /**
   * Base CSS class
   */

  const baseCls = "checkbox";
  const isComplete = status === "complete";
  const isArchived = status === "archived";

  const checkCls =
    baseCls +
    (isComplete || isArchived ? " checkbox--status-selected" : " display-none");

  return (
    <div className={baseCls}>
      <label className={`${baseCls}__container`}>
        <input onClick={isArchived ? null : onClickTodo} type="checkbox" />
        <span className={`${baseCls}__checkmark`}>
          <img className={checkCls} src={check} />
        </span>
      </label>
    </div>
  );
};

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
