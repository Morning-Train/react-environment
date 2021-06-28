import React from 'react'
import useEnv from './use-env'

export default function useOnEnvChange(path, callback, dependencies = [])
{
  const env = useEnv()

  React.useEffect(() => {
    return env.observe(path, () => {
      callback(env.get(path))
    })
  }, [env, path, callback, ...dependencies])
}