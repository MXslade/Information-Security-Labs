const password =
  "06fc154f0e9ddbda20c38ebeef95f6b230a942bb0d80d9718764dee566ccff431f0e29edbdc46fa407e2b7b4c3ca5f463bdad9e09062846f641d0ec8edb4efc1";

export const getHalfPassword = () => {
  return password.substr(0, Math.floor(password.length / 2));
};
