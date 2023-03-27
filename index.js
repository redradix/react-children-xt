// SPDX-FileCopyrightText: 2023 Redradix - development@redradix.com
//
// SPDX-License-Identifier: MIT

let React

try {
  React = require('react')
} catch (err) {
  throw new Error('This package must be used in a React app')
}

/**
 * childrenToArray – Convert react children to an array. Works for a single
 * child. Omits children that will not be rendered (null, undefined, false).
 * Flattens children inside fragments
 * REVIEW we are calling Array.prototype.flat() once in every recursive call
 * @param {React.Children} children - Children object as provided by react
 * @param {Boolean} flatten - Whether or not to flatten children inside
 * fragments. Defaults to true
 * @return {Array} An array of react elements
 */
const childrenToArray = (children, flatten = true) => {
  const array = React.Children.toArray(children)
  if (flatten) {
    return array
      .map(child =>
        child.type === React.Fragment
          ? childrenToArray(child.props.children, flatten)
          : child,
      )
      .flat()
  }
  return array
}

/**
 * countChildren – Count the number of children. Omits children that will not be
 * rendered (null, undefined, false). Flattens children inside fragments
 * @param {React.Children} children - Children object as provided by react
 * @param {Boolean} flatten - Whether or not to flatten children inside
 * fragments. Defaults to true
 * @return {Number} The actual number of children
 */
const countChildren = (children, flatten = true) =>
  React.Children.count(childrenToArray(children, flatten))

/**
 * mapChildren – Map over all children, invoking a callback with any of them.
 * Omits children that will not be rendered (null, undefined, false). Flattens
 * children inside fragments
 * @param {React.Children} children - Children object as provided by react
 * @param {Function} fn - Callback that will be called with every child
 * @param {Boolean} flatten - Whether or not to flatten children inside
 * fragments. Defaults to true
 * @return {Array} An array with the results of calling fn with every child in
 * children
 */
const mapChildren = (children, fn, flatten = true) =>
  React.Children.map(childrenToArray(children, flatten), fn)

module.exports = { countChildren, mapChildren }
