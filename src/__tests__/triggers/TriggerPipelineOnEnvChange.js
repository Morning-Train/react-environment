import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { Environment, EnvironmentHelper, TriggerPipelineOnEnvChange } from '../..'
import { CallbackOnPipe, Pipeline } from '@morningtrain/react-pipelines'

it('does not trigger on initial render', async () => {
  const mockCallBack = jest.fn()
  expect.assertions(1)

  const env = new EnvironmentHelper({ some: 'data' })
  render(
    <Environment env={env}>
      <Pipeline>
        <TriggerPipelineOnEnvChange />
        <CallbackOnPipe callback={mockCallBack} />
      </Pipeline>
      test
    </Environment>
  )

  expect(mockCallBack.mock.calls.length).toEqual(0)
})

it('does trigger on env change', async () => {
  const mockCallBack = jest.fn()
  expect.assertions(3)

  const env = new EnvironmentHelper({ some: 'data' })
  render(
    <Environment env={env}>
      <Pipeline>
        <TriggerPipelineOnEnvChange path='some' />
        <CallbackOnPipe callback={mockCallBack} />
      </Pipeline>
      test
    </Environment>
  )

  expect(mockCallBack.mock.calls.length).toEqual(0)

  await act(() => {
    env.set('some', 'value')
  })

  expect(mockCallBack.mock.calls.length).toEqual(1)

  await act(() => {
    env.set('some', 'value')
  })

  expect(mockCallBack.mock.calls.length).toEqual(2)
})
