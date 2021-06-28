import React from 'react'

export default function useShouldConditionallyRender (value, match, negate = false) {
  function checkIfShouldRender (value, match) {
    if (typeof match === 'function') {
      return match(value)
    }

    /// If match has not been provided - we assume that we are checking for existence
    if (typeof match === 'undefined') {
      return value !== null && typeof value !== 'undefined'
    }

    /// Exact match check
    if (value === match) {
      return true
    }

    /// String cast equality check
    if (`${value}` === `${match}`) {
      return true
    }

    return false
  }

  const [shouldRender, setShouldRender] = React.useState(checkIfShouldRender(value, match) !== negate)

  React.useEffect(() => {
    const nextShouldRender = checkIfShouldRender(value, match) !== negate

    if (nextShouldRender !== shouldRender) {
      setShouldRender(nextShouldRender)
    }
  }, [shouldRender, value, match, negate])

  return [shouldRender, setShouldRender]
}
