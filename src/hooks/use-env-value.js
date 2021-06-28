import React from 'react'
import useEnv from './use-env'
import clone from 'lodash/clone'

export default function useEnvValue (path, defaultValue = null) {

  const env = useEnv()

  const defaultValueRef = React.useRef(defaultValue)
  defaultValue = defaultValueRef.current

  const [value, setValue] = React.useState(env.get(path, defaultValue))

  React.useEffect(() => {
    const disposer = env.observe(path, () => {
      setValue(clone(env.get(path, defaultValue)))
    })
    setValue(clone(env.get(path, defaultValue)))
    return disposer
  }, [env, path, defaultValue])

  React.useEffect(() => {
    setValue(clone(env.get(path, defaultValue)))
  }, [])

  function setValueOverride (newValue) {
    const valueInEnv = env.get(path)

    if (valueInEnv !== newValue) {
      env.set(path, newValue)
    }
  }

  return [value, setValueOverride]
}
