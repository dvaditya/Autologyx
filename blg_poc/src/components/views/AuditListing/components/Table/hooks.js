import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

export const useTable = () => {
  const history = useHistory();

  const redirectToId = useCallback(
    id => {
      history.push({
        search: `?auditId=${id}`,
      });
    },
    []
  );

  return {
    redirectToId
  }
}
