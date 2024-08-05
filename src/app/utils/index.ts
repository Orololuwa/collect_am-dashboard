export const currencyFormatter = (amount: number, currency?: string) => {
  return amount.toLocaleString("en-NG", {
    style: "currency",
    currency
  });
};

export const passwordValidation = (password: string) => {
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
  return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
    password
  );
};

export const emailValidation = (email: string) => {
  return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );
};
