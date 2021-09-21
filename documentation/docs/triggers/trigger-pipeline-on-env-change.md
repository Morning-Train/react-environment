---
title: TriggerPipelineOnEnvChange
---

The `TriggerPipelineOnEnvChange` component will trigger the pipeline whenever the ENV value at `path` changes.

:::info
View the [pipelines documentation](https://react-pipelines.daf-docs.dev/) for detailed information about the pipeline components.
:::
  
```jsx

import React from "react";
import {
    Pipeline, 
    TriggerPipelineOnClick
} from "@morningtrain/react-pipelines";

export default function TriggerPipelineOnEnvChangeExample() {    
    return (
        <Pipeline>
            <TriggerPipelineOnEnvChange path={'path.to.env.value'} />       
            
            {/*Cusom piping action #1*/}
            {/*Cusom piping action #2*/}
            {/*Cusom piping action #3*/}
            {/*Cusom piping action #4*/}
        </Pipeline>
    );
}

```