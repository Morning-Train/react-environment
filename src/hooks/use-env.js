import React from 'react'
import { EnvContext } from '../contexts'
import EnvironmentHelper from '../helpers/EnvironmentHelper'

export default function useEnv() {
  const env = React.useContext(EnvContext)

  if(env) {
    return env;
  }

  return new EnvironmentHelper()
}