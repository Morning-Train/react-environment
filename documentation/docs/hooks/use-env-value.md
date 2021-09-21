---
title: useEnvValue
---

The useEnvValue hook manages an internal React state that is synced to the value of a ENV value.

It returns an array matching the API for `React.useState`. 
The first entry in the array is the environment value and the second entry is a setter that will both update the state and the value in the environment.

The first parameter of the hook is the `path` to the environment value and the second parameter is the `defaultValue`.

````jsx
import React from "react";
import {useEnvValue} from "@morningtrain/react-environment";

export default function TestComponentUsingEnvValue() {
    
    const [value, setValue] = useEnvValue('path.to.value', 'default_value');
    
    /// Do something with the env value.
    
    return value;
}
````
