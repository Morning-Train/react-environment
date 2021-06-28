import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { Environment, EnvironmentHelper, SetEnvValueOnPipe, TriggerPipelineOnEnvChange } from '../..'
import { Pipeline } from '@morningtrain/react-pipelines'

it('does trigger on env change', async () => {
  expect.assertions(3)

  const env = new EnvironmentHelper({ some: 'data' })
  const wrapper = mount(
    <Environment env={env}>
      <Pipeline>
        <TriggerPipelineOnEnvChange path='some' />
        <SetEnvValueOnPipe path='another' value='value' />
      </Pipeline>
    </Environment>
  )

  await act(async () => wrapper.update())

  expect(env.get('another')).toEqual(null)

  env.set('some', 'value')

  await act(async () => wrapper.update())

  expect(env.get('another')).toEqual('value')

  env.set('some', 'value')

  await act(async () => wrapper.update())

  expect(env.get('another')).toEqual('value')
})
