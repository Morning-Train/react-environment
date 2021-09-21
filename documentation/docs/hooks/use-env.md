---
title: useEnv
---

The useEnv hook implement `React.useContext` with the `EnvContext`.
The EnvContext will return an instance of the `EnvironmentHelper` class provided to it be an `EnvironmentProvider`.

:::caution
This is not always the case.
To support legacy projects not implementing an `EnvironmentProvider`,
`useEnv` will create and return a new `EnvironmentHelper` instance if the provider is missing.

In this case, the env will be synced to the `window.env` variable.
:::

It is essentially a shortcut to this implementation:

````jsx
import React from "react";
import {PipelineContext} from "@morningtrain/react-environment";

export default function TestComponentUsingEnv() {
    
    const env = React.useContext(EnvContext);
    
    /// Do something with the env instance.
    
    return null;
}
````

The implementation becomes a bit simpler by utilizing the custom hook.

````jsx
import React from "react";
import {useEnv} from "@morningtrain/react-environment";

export default function TestComponentUsingEnv() {
    
    const env = useEnv();
    
    /// Do something with the env instance.
    
    return null;
}
````
