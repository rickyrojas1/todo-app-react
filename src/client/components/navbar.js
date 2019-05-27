import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filterBy: PropTypes.string,
  onClickFilter: PropTypes.func
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterBy: "",
  onClickFilter: noop
};

/**
 * Navbar component
 * @returns {ReactElement}
 */
const Navbar = ({ filterBy, onClickFilter }) => {
  /**
   * Base CSS class
   */
  const baseCls = "navbar";

  let allLinkCls = `${baseCls}__item`;
  allLinkCls += filterBy === "" ? ` ${baseCls}__item--active` : "";

  return (
    <div className={baseCls}>
      <NavLink
        to="/all"
        className={allLinkCls}
        activeClassName={` ${baseCls}__item--active`}
        onClick={() => onClickFilter("all")}
      >
        All
      </NavLink>
      <NavLink
        to="/active"
        className={`${baseCls}__item`}
        activeClassName={` ${baseCls}__item--active`}
        onClick={() => onClickFilter("active")}
      >
        Active
      </NavLink>
      <NavLink
        to="/completed"
        className={`${baseCls}__item`}
        activeClassName={` ${baseCls}__item--active`}
        onClick={() => onClickFilter("completed")}
      >
        Completed
      </NavLink>
      <NavLink
        to="/archived"
        className={`${baseCls}__item`}
        activeClassName={` ${baseCls}__item--active`}
        onClick={() => onClickFilter("archived")}
      >
        Archived
      </NavLink>
    </div>
  );
};

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
