import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import {
  WithEnvValue,
  Environment
} from '../..'

it('renders without crashing', () => {
  render(
    <Environment>
      test
    </Environment>
  )
})

it('renders with data without crashing', () => {
  render(
    <Environment data={{ some: 'data' }}>
      test
    </Environment>
  )
})

it('renders with null data without crashing', () => {
  render(
    <Environment data={{ some: 'data' }}>
      test
    </Environment>
  )
})

it('renders with numeric data without crashing', () => {
  render(
    <Environment data={3}>
      test
    </Environment>
  )
})

it('renders with string data without crashing', () => {
  render(
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

  render(
    <div data-testid="wrapper">
      <Environment>
        <WithEnvValue path='some.test.data'>
          {val => val}
        </WithEnvValue>
      </Environment>
    </div>
  )

  expect(screen.getByTestId('wrapper')).toHaveTextContent('value');

  render(
    <div data-testid="wrapper-2">
      <Environment>
        <WithEnvValue path='some.test'>
          {val => val.data}
        </WithEnvValue>
      </Environment>
    </div>
  )

  expect(screen.getByTestId('wrapper-2')).toHaveTextContent('value');

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

  render(
    <div data-testid="wrapper">
      <Environment data={envData}>
        <WithEnvValue path='some.test.data' defaultValue='test_default_value'>
          {val => val}
        </WithEnvValue>
      </Environment>
    </div>
  )

  expect(screen.getByTestId('wrapper')).toHaveTextContent('test_default_value');

  render(
    <div data-testid="wrapper-2">
      <Environment data={envData}>
        <WithEnvValue path='test'>
          {val => val.data}
        </WithEnvValue>
      </Environment>
    </div>
  )

  expect(screen.getByTestId('wrapper-2')).toHaveTextContent('value');
})

it('local data overrides global data', () => {
  const envData = {
    some: {
      test: {
        data: 'value'
      }
    }
  }

  render(
    <div data-testid="wrapper">
      <Environment data={envData}>
        <WithEnvValue path='some.test.data'>
          {val => val}
        </WithEnvValue>
      </Environment>
    </div>
  )

  expect(screen.getByTestId('wrapper')).toHaveTextContent('value');

  render(
    <div data-testid="wrapper-2">
      <Environment data={envData}>
        <WithEnvValue path='some.test'>
          {val => val.data}
        </WithEnvValue>
      </Environment>
    </div>
  )

  expect(screen.getByTestId('wrapper-2')).toHaveTextContent('value');
})
