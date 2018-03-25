const emailRegex = new RegExp('[^\\.\\s@:][^\\s@:]*(?!\\.)@[^\\.\\s@]+(?:\\.[^\\.\\s@]+)*');

export default ({
  isEmail: (email) => emailRegex.test(email),
  isPassword: (password) => password.length > 5,
});
