import React from 'react';
import AddTime from './AddTime';
import { withRouter, useParams } from 'react-router-dom';

function EditTime() {
  const props = useParams();
  return new AddTime(props);
}

export default withRouter(EditTime);