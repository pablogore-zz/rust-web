import React from 'react';
import { Query } from 'react-apollo';
import { Loader, ErrorBox } from 'components';

export default ({ query, children }) => (
  <Query query={query}>
    {({ data, loading, error }) => {
      if (loading) {
        return <Loader />;
      }
      if (error) {
        return <ErrorBox error={error} />;
      }
      return children(data);
    }}
  </Query>
);
