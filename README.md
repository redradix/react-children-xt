<!--
SPDX-FileCopyrightText: 2023 Redradix - development@redradix.com

SPDX-License-Identifier: MIT
-->

# react-children-xt

> Count and map over React children flattening fragments and not taking into account elements that won't be rendered such as `undefined` or `null`

## Why to use it

On one hand, accessing directly to `children.length` or `children.map` doesn't works as expected when receiving a single child, as it is not encapsulated in an array. The solution may be to use `React.Children.count` and `React.Children.map` but this may also have an unexpected behaviour when treating as valid children elements that won't be rendered such as `undefined` or `null`.

Moreover, sometimes we need to flatten `Fragment`s and treat its content as direct children of the Component so this package does it by default. It is possible to disable this behaviour passing `false` as the last argument of the methods.

## Installation

```
npm install --save react-children-xt
```

or

```
yarn add react-children-xt
```

## Usage

```jsx
import React from 'react'
import { countChildren, mapChildren } from 'react-children-xt'

function MyParentComponent() {
  return (
    <MyComponent>
      <div>One</div>
      {undefined}
      {null}
      <div>Two</div>
      <>
        <div>Three</div>
        <div>Four</div>
      </>
    </MyComponent>
  )
}

function MyComponent({ children }) {
  // Native way to count React children.
  // It counts the two main `div`s, `undefined`, `null` and the `Fragment`.
  const badChildrenCount = React.Children.count(children)
  console.log(badChildrenCount) // output: 5

  // Using `countChildren` method.
  // It counts the four `div`s, flattening the `Fragment`.
  const childrenCount = countChildren(children)
  console.log(childrenCount) // output: 4

  // Using `countChildren` method without flattening the `Fragment`.
  // It counts the two main `div`s and the `Fragment`.
  const mainChildrenCount = countChildren(children, false)
  console.log(mainChildrenCount) // output: 3

  // `MyComponent` will render the four `div`s.
  return (
    <>
      {mapChildren(children, (child, index) => (
        <React.Fragment key={index}>{child}</React.Fragment>
      ))}
    </>
  )
}
```
