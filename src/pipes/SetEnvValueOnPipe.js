import React from 'react'
import { useWillPipe } from '@morningtrain/react-pipelines'
import { useEnv } from '../hooks'

export default function SetEnvValueOnPipe ({
  path,
  value
}) {
  const env = useEnv()

  useWillPipe((payload) => {
    return new Promise((resolve, reject) => {
      env.set(path, value)

      resolve(payload)
    })
  }, [env, path, value])

  return null
}
