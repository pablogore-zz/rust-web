export const SIGN_UP_USER_MUTATION = `
  mutation signUpUser($name: String! $email: String!, $password: String!) {
    signUpUser(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
        isLocked
        isVerified
      }
    }
  }
`;

export const LOGIN_USER_MUTATION = `
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        name
        isLocked
        isVerified
      }
    }
  }
`;

export const FORGOT_PASSWORD_MUTATION = `
  mutation forgotPassword($email: String!) {
    forgotPasswordEmail(email: $email)
  }
`;
