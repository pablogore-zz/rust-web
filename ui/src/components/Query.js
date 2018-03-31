import React from 'react';
import { Query } from 'react-apollo';
import { Loader, ErrorBox } from './index';

export default ({ query, children }) => (
  <Query query={query}>
    {({ data, loading, error, refetch }) => {
      if (loading) {
        return <Loader />;
      }
      if (error) {
        return <ErrorBox error={error} retry={refetch} />;
      }
      return children(data);
    }}
  </Query>
);
