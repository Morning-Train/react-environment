---
title: WithEnvValue
---

WithEnvValue is a component used to get an adhoc env value in JSX. 

The component takes two props, `path` and `defaultValue`.

It will need a single child that must be a function taking the env value as the first and only parameter.

````jsx
import React from "react";
import {WithEnvValue} from "@morningtrain/react-environment";

export default function TestComponentUsingWithEnvValue() {
    return (
      <WithEnvValue path='path.to.value' defaultValue='my_default_value'>
        {val => val}
      </WithEnvValue>
    );
}
````
