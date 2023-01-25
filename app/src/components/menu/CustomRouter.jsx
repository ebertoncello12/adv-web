import { memo, useLayoutEffect, useState } from 'react';
import { Router } from 'react-router-dom';

export const CustomRouter = memo((props) => {
  const { history, ...restProps } = props;
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...restProps}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
});
