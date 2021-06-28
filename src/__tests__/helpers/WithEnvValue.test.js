import React from 'react'
import { mount, shallow } from 'enzyme'
import { act } from 'react-dom/test-utils'
import {
  WithEnvValue, Environment
} from '../..'

it('renders children using root path', () => {
  const wrapper = mount(
    <Environment data={{ test: 'value' }}>
      <WithEnvValue path='test'>
        {val => val}
      </WithEnvValue>
    </Environment>
  )

  expect(wrapper.text()).toEqual('value')
})

it('Default value works with WithEnvValue', () => {
  const wrapper = mount(
    <Environment data={{ test: 'value' }}>
      <WithEnvValue path='nested.test' defaultValue='some value'>
        {val => val}
      </WithEnvValue>
    </Environment>
  )

  expect(wrapper.text()).toEqual('some value')
})
