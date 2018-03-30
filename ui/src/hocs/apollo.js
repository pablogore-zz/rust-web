import * as React from 'react';
import * as _ from 'lodash';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { withState, compose } from 'recompose';
import { Loader, ErrorBox } from 'components';

const loadingHoc = withState('loading', 'setLoading', false);

export const withMutation = (query, func) => {
  const parsedQuery = gql(query);
  const name = parsedQuery.definitions[0].name.value;
  const nameLoading = `${name}Loading`;
  const ghoc = graphql(parsedQuery, {
    props: ({ ownProps, mutate }) => ({
      [nameLoading]: ownProps.loading,
      [name]: () => {
        func({
          ...ownProps,
          mutate: async (options) => {
            ownProps.setLoading(true);
            try {
              return await mutate(options);
            } catch (e) {
              throw e;
            } finally {
              ownProps.setLoading(false);
            }
          }
        });
      },
    }),
  });
  return compose(loadingHoc, ghoc);
};

export const withQuery = (query, options) => graphql(gql(query), options);

