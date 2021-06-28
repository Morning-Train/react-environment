import React from 'react'
import { mount, shallow } from 'enzyme'
import { act } from 'react-dom/test-utils'
import {
  WhenEnvValueMatches, Environment
} from '../..'

it('renders without environment', () => {
  mount(
    <WhenEnvValueMatches>
      test
    </WhenEnvValueMatches>
  )
})

it('renders children using root path', () => {
  const wrapper = mount(
    <Environment data={{ test: 'value' }}>
      <WhenEnvValueMatches path='test' matches='value'>
        test
      </WhenEnvValueMatches>
    </Environment>
  )

  expect(wrapper.text()).toEqual('test')
})

it('renders children using callback', () => {
  const wrapper = mount(
    <Environment data={{ test: 'value' }}>
      <WhenEnvValueMatches path='test' matches={val => val === 'value'}>
        test
      </WhenEnvValueMatches>
    </Environment>
  )

  expect(wrapper.text()).toEqual('test')
})

it('renders children using mixed number types', () => {
  const wrapper = mount(
    <Environment data={{ test: 1 }}>
      <WhenEnvValueMatches path='test' matches='1'>
        test
      </WhenEnvValueMatches>
    </Environment>
  )

  expect(wrapper.text()).toEqual('test')
})

it('does not render children using wrong match', () => {
  const wrapper = mount(
    <Environment data={{ test: 123 }}>
      <WhenEnvValueMatches path='test' matches='1'>
        test
      </WhenEnvValueMatches>
    </Environment>
  )

  expect(wrapper.text()).toEqual('')
})

it('does not render children using root path - negated', () => {
  const wrapper = mount(
    <Environment data={{ test: 'value' }}>
      <WhenEnvValueMatches path='test' matches='value' negate>
        test
      </WhenEnvValueMatches>
    </Environment>
  )

  expect(wrapper.text()).toEqual('')
})
