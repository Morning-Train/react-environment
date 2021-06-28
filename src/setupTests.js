import { configure } from 'enzyme'
import React from 'react'
import React16Adapter from 'enzyme-adapter-react-16'
//import React17Adapter from '@wojtekmaj/enzyme-adapter-react-17'

const REACT_MAJOR_VERSION = parseInt(React.version)

if(REACT_MAJOR_VERSION === 16) {
  configure({ adapter: new React16Adapter() })
}


if(REACT_MAJOR_VERSION === 17) {
  //configure({ adapter: new React17Adapter() })
}

