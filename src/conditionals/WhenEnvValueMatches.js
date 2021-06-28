import React from 'react'
import PropTypes from 'prop-types'
import useEnvValue from '../hooks/use-env-value'
import useShouldConditionallyRender from '../hooks/use-should-conditionally-render'

function WhenEnvValueMatches ({
  name,
  path,
  matches,
  negate = false,
  children
}) {
  const _path = path || name
  const [value] = useEnvValue(_path)
  const [shouldRender] = useShouldConditionallyRender(value, matches, negate)

  return shouldRender ? children : null
}

WhenEnvValueMatches.propTypes = {
  /**
     * The env path(name). (USE PATH INSTEAD)
     */
  name: PropTypes.string,
  /**
     * The env path.
     */
  path: PropTypes.string,
  /**
     * The value to match the current parameter against.
     */
  matches: PropTypes.any,
  /**
     * Should the result be negated?
     */
  negate: PropTypes.bool
}

export default WhenEnvValueMatches
