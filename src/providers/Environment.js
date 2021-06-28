import React from 'react'
import {EnvContext} from '../contexts'
import EnvironmentHelper from '../helpers/EnvironmentHelper'

export default function Environment({
  data = null,
  children
}) {
  const env = new EnvironmentHelper(data)

  return (
    <EnvContext.Provider value={env} >
      {children}
    </EnvContext.Provider>
  )
}