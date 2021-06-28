import React from 'react'

const EnvContext = React.createContext(null)

export const { Provider } = EnvContext
export const { Consumer } = EnvContext

export default EnvContext
