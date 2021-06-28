import React from 'react'
import { EnvContext } from '../contexts'
import EnvironmentHelper from '../helpers/EnvironmentHelper'

export default function Environment ({
  data = null,
  env = null,
  children
}) {
  const _env = env || new EnvironmentHelper(data)

  return (
    <EnvContext.Provider value={_env}>
      {children}
    </EnvContext.Provider>
  )
}
