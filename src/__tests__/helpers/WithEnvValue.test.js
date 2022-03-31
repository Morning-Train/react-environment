import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import {
  WithEnvValue, Environment
} from '../..'

it('renders children using root path', () => {
  render(
    <div data-testid="wrapper">
      <Environment data={{ test: 'value' }}>
        <WithEnvValue path='test'>
          {val => val}
        </WithEnvValue>
      </Environment>
    </div>
  )

  expect(screen.getByTestId('wrapper')).toHaveTextContent('value');
})

it('Default value works with WithEnvValue', () => {
  render(
    <div data-testid="wrapper">
      <Environment data={{ test: 'value' }}>
        <WithEnvValue path='nested.test' defaultValue='some value'>
          {val => val}
        </WithEnvValue>
      </Environment>
    </div>
  )

  expect(screen.getByTestId('wrapper')).toHaveTextContent('some value');
})
