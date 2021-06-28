import React from 'react'
import { useWillPipe } from '@morningtrain/react-pipelines'
import { useEnv } from '../hooks'
import set from 'lodash/set'

export default function SetEnvValueOnPayloadOnPipe ({
  path,
  payloadPath,
  defaultValue
}) {
  const env = useEnv()

  useWillPipe((payload) => {
    return new Promise((resolve, reject) => {
      const value = env.get(path, defaultValue)

      set(payload, payloadPath, value)

      resolve(payload)
    })
  }, [env, path, payloadPath, defaultValue])

  return null
}
