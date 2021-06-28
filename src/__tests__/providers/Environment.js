import React from 'react'
import { mount, shallow } from 'enzyme'
import { act } from 'react-dom/test-utils'
import {
  WithEnvValue,
  Environment
} from '../..'

it('renders without crashing', () => {
  mount(
    <Environment>
      test
    </Environment>
  )
})

it('renders with data without crashing', () => {
  mount(
    <Environment data={{ some: 'data' }}>
      test
    </Environment>
  )
})

it('renders with null data without crashing', () => {
  mount(
    <Environment data={{ some: 'data' }}>
      test
    </Environment>
  )
})

it('renders with numeric data without crashing', () => {
  mount(
    <Environment data={3}>
      test
    </Environment>
  )
})

it('renders with string data without crashing', () => {
  mount(
    <Environment data='string data'>
      test
    </Environment>
  )
})

it('global data is accessible to children', () => {
  global.env = {
    some: {
      test: {
        data: 'value'
      }
    }
  }

  const wrapper = mount(
    <Environment>
      <WithEnvValue path='some.test.data'>
        {val => val}
      </WithEnvValue>
    </Environment>
  )

  expect(wrapper.text()).toBe('value')

  const wrapper2 = mount(
    <Environment>
      <WithEnvValue path='some.test'>
        {val => val.data}
      </WithEnvValue>
    </Environment>
  )

  expect(wrapper2.text()).toBe('value')
})

it('local data is accessible to children', () => {
  global.env = {
    some: {
      test: {
        data: 'value'
      }
    }
  }

  const envData = {
    test: {
      data: 'value'
    }
  }

  const wrapper = mount(
    <Environment data={envData}>
      <WithEnvValue path='some.test.data' defaultValue='test_default_value'>
        {val => val}
      </WithEnvValue>
    </Environment>
  )

  expect(wrapper.text()).toBe('test_default_value')

  const wrapper2 = mount(
    <Environment data={envData}>
      <WithEnvValue path='test'>
        {val => val.data}
      </WithEnvValue>
    </Environment>
  )

  expect(wrapper2.text()).toBe('value')
})

it('local data overrides global data', () => {
  const envData = {
    some: {
      test: {
        data: 'value'
      }
    }
  }

  const wrapper = mount(
    <Environment data={envData}>
      <WithEnvValue path='some.test.data'>
        {val => val}
      </WithEnvValue>
    </Environment>
  )

  expect(wrapper.text()).toBe('value')

  const wrapper2 = mount(
    <Environment data={envData}>
      <WithEnvValue path='some.test'>
        {val => val.data}
      </WithEnvValue>
    </Environment>
  )

  expect(wrapper2.text()).toBe('value')
})
