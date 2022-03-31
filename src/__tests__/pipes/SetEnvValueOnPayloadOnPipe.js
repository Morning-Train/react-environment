import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import { Environment, EnvironmentHelper, SetEnvValueOnPayloadOnPipe, TriggerPipelineOnEnvChange } from '../..'
import { CallbackOnPipe, ConditionalNestedPipeline, Pipeline } from '@morningtrain/react-pipelines'
import { act } from 'react-dom/test-utils'

it('does trigger on env change', async () => {
  const mockCallBack = jest.fn()
  expect.assertions(4)

  const env = new EnvironmentHelper({ some: 'data' })
  render(
    <Environment env={env}>
      <Pipeline>
        <TriggerPipelineOnEnvChange path='some' />
        <SetEnvValueOnPayloadOnPipe path='some' payloadPath='payload_value_path' />
        <ConditionalNestedPipeline when='payload_value_path' matches='value'>
          <CallbackOnPipe callback={mockCallBack} />
        </ConditionalNestedPipeline>
      </Pipeline>
    </Environment>
  )

  expect(mockCallBack.mock.calls.length).toEqual(0)

  await act(() => {
    env.set('some', 'other value')
  })

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
