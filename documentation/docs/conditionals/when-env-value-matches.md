---
title: WhenEnvValueMatches
---
This component will render its children when the ENV value at `path` matches a given condition.

It could be used to conditionally render children basic on potentially changing ENV values.

Especially in larger projects, it is recommended to encapsulate uses of `WhenEnvValueMatches` into custom conditional components.
This will help to create reusable components with custom business logic at the project level.
Doing this, it becomes easier to update the business logic in a central location.


### Props

#### path:
The prop `path` is a string indicating where to find the value in the ENV object.

Usings dots in the `path` will target nested values.

Given the following ENV object: 
```json
{
  "test": {
    "path": {
      "to": {
        "boolean": false
      }
    }
  }
}
```

We can target the nested boolean value using this path: `test.path.to.boolean`.

#### matches:
The `matches` prop is used to indicate what the ENV value should be matched against.

If the prop is not provided, then it will make a simple existence check.
The conditional will be true if the ENV value is not `undefined` and is not `null`.

If `matches` is a function, then the return value of that function will be used.
The function is passed the current ENV value as the only parameter.

Passing any simple value (string, number, boolean) will make an exact match check against the ENV value.

If the exact check fails, then it will make a string cast equality check using this logic: *\`${value}\` === \`${match}\`*

#### negate:
The `negate` prop is a boolean (defaults to `false`) that can be set to invert the conditional.
Setting the negate prop to `true` will render the children when the ENV value does not match.

### Examples

#### WhenUserIsTrial (simple boolean value)
This is a very basic example of creating a conditional to check a boolean value in the environment.

It looks at the value `user.is_trial` and renders its children if the value is `true` and `negate` is `false`.

```jsx
import React from "react";
import {WhenEnvValueMatches} from "@morningtrain/react-environment";

export default function WhenUserIsTrial({
  negate = false,
  children
}) {
    return (
        <WhenEnvValueMatches path={'user.is_trial'} matches negate={negate}>
            {children}
        </WhenEnvValueMatches>
    );
}
```
