import React from "react";
import PropTypes from "prop-types";
import useEnvValue from "../hooks/use-env-value";
import useShouldConditionallyRender from "../hooks/use-should-conditionally-render";

function WhenEnvValueMatches({name, matches, negate = false, children}) {

    const [value] = useEnvValue(name);
    const [shouldRender] = useShouldConditionallyRender(value, matches, negate);

    return shouldRender ? children : null;
}

WhenEnvValueMatches.propTypes = {
    /**
     * The parameter name to match the current route against.
     */
    name: PropTypes.string.isRequired,
    /**
     * The value to match the current parameter against.
     */
    matches: PropTypes.any,
    /**
     * Should the result be negated?
     */
    negate: PropTypes.bool,
}

export default WhenEnvValueMatches
