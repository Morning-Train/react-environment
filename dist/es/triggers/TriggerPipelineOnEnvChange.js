import 'react';
import { usePipeline } from '@morningtrain/react-pipelines';
import useOnEnvChange from '../hooks/use-on-env-change.js';

function TriggerPipelineOnEnvChange(_ref) {
  var path = _ref.path;
  var pipeline = usePipeline();
  useOnEnvChange(path, function () {
    var payload = {};
    pipeline.trigger(payload);
  }, [pipeline]);
  return null;
}

export default TriggerPipelineOnEnvChange;
//# sourceMappingURL=TriggerPipelineOnEnvChange.js.map
