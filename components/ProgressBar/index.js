import React from 'react';
import { Progress } from 'semantic-ui-react';

const ProgressBar = ({ percent }) => {
  return (
    <div>
      <Progress percent={percent} indicating />
    </div>
  );
};

export default React.memo(ProgressBar);
