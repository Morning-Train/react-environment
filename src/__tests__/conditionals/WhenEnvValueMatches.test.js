import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import {
  WhenEnvValueMatches, Environment, EnvironmentHelper
} from '../..'

it('renders without environment', () => {
  render(
    <WhenEnvValueMatches>
      test
    </WhenEnvValueMatches>
  )
})

it('renders children using root path', () => {
  render(
    <div data-testid="wrapper">
      <Environment data={{ test: 'value' }}>
        <WhenEnvValueMatches path='test' matches='value'>
          test
        </WhenEnvValueMatches>
      </Environment>
    </div>
  )

  expect(screen.getByTestId('wrapper')).toHaveTextContent('test');
})

it('renders children using callback', () => {
  render(
    <div data-testid="wrapper">
      <Environment data={{ test: 'value' }}>
        <WhenEnvValueMatches path='test' matches={val => val === 'value'}>
          test
        </WhenEnvValueMatches>
      </Environment>
    </div>
  )

  expect(screen.getByTestId('wrapper')).toHaveTextContent('test');
})

it('renders children using mixed number types', () => {
  render(
    <div data-testid="wrapper">
      <Environment data={{ test: 1 }}>
        <WhenEnvValueMatches path='test' matches='1'>
          test
        </WhenEnvValueMatches>
      </Environment>
    </div>
  )

  expect(screen.getByTestId('wrapper')).toHaveTextContent('test');
})

it('does not render children using wrong match', () => {
  render(
    <div data-testid="wrapper">
      <Environment data={{ test: 123 }}>
        <WhenEnvValueMatches path='test' matches='1'>
          test
        </WhenEnvValueMatches>
      </Environment>
    </div>
  )

  expect(screen.getByTestId('wrapper')).toHaveTextContent('');
})

it('does not render children using root path - negated', () => {
  render(
    <div data-testid="wrapper">
      <Environment data={{ test: 'value' }}>
        <WhenEnvValueMatches path='test' matches='value' negate>
          test
        </WhenEnvValueMatches>
      </Environment>
    </div>
  )

  expect(screen.getByTestId('wrapper')).toHaveTextContent('');
})


it('renders children after env upd', async () => {
  expect.assertions(3)

  const env = new EnvironmentHelper({ test: 'wrong_value' })

  render(
    <div data-testid="wrapper">
      <Environment env={env}>
        <WhenEnvValueMatches path='test' matches='value'>
          test
        </WhenEnvValueMatches>
      </Environment>
    </div>
  )

  expect(screen.getByTestId('wrapper')).toHaveTextContent('');

  await act(() => {
    env.set('test', 'value')
  })

  expect(screen.getByTestId('wrapper')).toHaveTextContent('test');

  await act(() => {
    env.set('test', 'crappy value')
  })

  expect(screen.getByTestId('wrapper')).toHaveTextContent('');
})
