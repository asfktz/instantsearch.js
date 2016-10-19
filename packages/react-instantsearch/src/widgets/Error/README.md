---
title: Error
layout: widget.pug
nav_groups:
  - widgets
---

# Error

Displays an error when the Algolia Search client had an issue fetching the results set.

### Theme

`root`

### Translations

`error(err)`

## Implementing your own Error

See [Making your own widgets](../Customization.md) for more information on how to use the `Error.connect` HOC.

```
import {Error} from 'react-instantsearch';

function MyError(props) {
  if (props.error) {
    return (
      <div>Oh no, there was an error! {error}</div>
    );
  }
  return null;
}

export default Error.connect(MyError);
```