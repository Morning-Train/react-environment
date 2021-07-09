---
title: Environment
---

The Environment component provides an instance of the `EnvironmentHelper` class using the `EnvContext`.

It is possible to pass an `env` prop to the component. 
It is primarily used to ease testing, but it can be used to pass an env instance that will be directly passed to the context.

Passing the `data` prop to the component will instantiate `EnvironmentHelper` with a custom data object.

Not providing either the `data`or `env` props will generate an instance of `EnvironmentHelper` using `window.env`as base variable.

````jsx
import React from "react";
import {Environment} from "@morningtrain/react-environment";

export default function TestComponentUsingEnvironmentProvider() {
    return (
      <Environment data={{initial: 'data'}}>
        {/* Our children using the environment */}
      </Environment>
    );
}
````
