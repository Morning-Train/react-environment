import React from 'react'
import { usePipeline } from '@morningtrain/react-pipelines'
import { useOnEnvChange } from '../hooks'

export default function TriggerPipelineOnEnvChange({
  path,
}) {

  const pipeline = usePipeline()

  useOnEnvChange(path,() => {

    const payload = {}

    pipeline.trigger(payload)

  }, [])

  return null
}