module.exports = {
  someSidebar: {
    'Getting started': [
      'getting_started/introduction',
      'getting_started/installation',
      'getting_started/best-practices',
      'getting_started/examples'
    ],
    Pipelines: [
      'pipelines/pipeline',
      'pipelines/async-pipeline',
      'pipelines/nested-pipeline',
      'pipelines/nested-async-pipeline',
      'pipelines/conditional-nested-pipeline',
      'pipelines/conditional-nested-async-pipeline',
      'pipelines/error-pipeline',
      'pipelines/error-async-pipeline',
      'pipelines/on-click-pipeline'
    ],
    Pipes: [
      'pipes/set-env-value-on-pipe',
      'pipes/set-env-value-on-payload-on-pipe'
    ],
    Triggers: [
      'triggers/trigger-pipeline-on-env-change'
    ],
    Conditionals: [
      'conditionals/when-env-value-matches',
    ],
    Providers: [
      'providers/environment',
    ],
    Helpers: [
      'helpers/with-env-value',
    ],
    Hooks: [
      'hooks/use-env',
      'hooks/use-env-value'
    ],
    Cookbook: [
      'cookbook/basic-pipeline',
      'cookbook/basic-async-pipeline',
      'cookbook/on-click-pipeline',
      'cookbook/custom-pipes',
      'cookbook/render-when-piping'
    ]
  }
}
