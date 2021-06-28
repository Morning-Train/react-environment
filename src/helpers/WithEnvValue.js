import React from 'react'
import PropTypes from 'prop-types'
import { useEnvValue } from '../hooks'

export default function WithEnvValue ({
  path,
  defaultValue = null,
  children
}) {
  const [value] = useEnvValue(path, defaultValue)

  if (typeof children === 'function') {
    return children(value)
  }

  throw new Error('Always pass a function as child to WithEnvValue')
}

WithEnvValue.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired
}
