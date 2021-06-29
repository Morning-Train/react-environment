'use strict';

require('react');
var reactPipelines = require('@morningtrain/react-pipelines');
var useOnEnvChange = require('../hooks/use-on-env-change.js');

function TriggerPipelineOnEnvChange(_ref) {
  var path = _ref.path;
  var pipeline = reactPipelines.usePipeline();
  useOnEnvChange(path, function () {
    var payload = {};
    pipeline.trigger(payload);
  }, [pipeline]);
  return null;
}

module.exports = TriggerPipelineOnEnvChange;
//# sourceMappingURL=TriggerPipelineOnEnvChange.js.map
