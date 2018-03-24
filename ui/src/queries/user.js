import { gql } from 'apollo-boost';
import { shape, string } from 'prop-types';

export const UserPropType = shape({
  _id: string.isRequired,
  phone: string.isRequired,
});

export const UserFragment = gql`
  fragment UserFragment on User {
    _id
    phone
  }
`;

export const user = gql`
  query user {
    user {
      ...UserFragment
    }
  }
`;

export const login = gql`
  mutation login($params: LoginParams!) {
    login(params: $params)
  }
`;

export const signUp = gql`
  mutation signUp($params: SignUpParams!) {
    signUp(params: $params)
  }
`;

export const verify = gql`
  mutation verify($params: VerifyParams!) {
    verify(params: $params) {
      token
      user {
        ...UserFragment
      }
    }
  }
  ${UserFragment}
`;

export const retryOtp = gql`
  mutation retryOtp($params: RetryParams!) {
    retryOtp(params: $params)
  }
`;
