import React from 'react';
import { Mutation } from 'react-apollo';
import { Loader, ErrorBox } from 'components';

export default ({ query, children }) => (
  <Mutation>
    {(mutate, { data, loading, error }) => {
      if (loading) {
        return <Loader />;
      }
      if (error) {
        return <ErrorBox error={error} />;
      }
      return children(mutate, data);
    }}
  </Mutation>
);
