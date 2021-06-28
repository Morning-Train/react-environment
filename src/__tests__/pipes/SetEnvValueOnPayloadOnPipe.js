import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { Environment, EnvironmentHelper, SetEnvValueOnPayloadOnPipe, TriggerPipelineOnEnvChange } from '../..'
import { CallbackOnPipe, ConditionalNestedPipeline, Pipeline } from '@morningtrain/react-pipelines'

it('does trigger on env change', async () => {
  const mockCallBack = jest.fn()
  expect.assertions(4)

  const env = new EnvironmentHelper({ some: 'data' })
  const wrapper = mount(
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

  await act(async () => wrapper.update())

  expect(mockCallBack.mock.calls.length).toEqual(0)

  env.set('some', 'other value')

  await act(async () => wrapper.update())

  expect(mockCallBack.mock.calls.length).toEqual(0)

  env.set('some', 'value')

  await act(async () => wrapper.update())

  expect(mockCallBack.mock.calls.length).toEqual(1)

  env.set('some', 'value')

  await act(async () => wrapper.update())

  expect(mockCallBack.mock.calls.length).toEqual(2)
})
