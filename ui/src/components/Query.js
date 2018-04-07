import React from 'react';
import { Query } from 'react-apollo';
import { Loader, ErrorBox } from './index';

export default ({ query, fetchPolicy = "cache-and-network", children }) => (
  <Query query={query} fetchPolicy={fetchPolicy}>
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
