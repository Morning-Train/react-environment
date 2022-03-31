import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { Environment, EnvironmentHelper, SetEnvValueOnPipe, TriggerPipelineOnEnvChange } from '../..'
import { Pipeline } from '@morningtrain/react-pipelines'

it('does trigger on env change', async () => {
  expect.assertions(3)

  const env = new EnvironmentHelper({ some: 'data' })

  render(
    <Environment env={env}>
      <Pipeline>
        <TriggerPipelineOnEnvChange path='some' />
        <SetEnvValueOnPipe path='another' value='value' />
      </Pipeline>
    </Environment>
  )

  expect(env.get('another')).toEqual(null)

  await act(() => {
    env.set('some', 'value')
  })

  expect(env.get('another')).toEqual('value')

  await act(() => {
    env.set('some', 'value')
  })

  expect(env.get('another')).toEqual('value')
})
