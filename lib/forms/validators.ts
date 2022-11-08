export const isPasswordLongEnouph = (password: string) => password.length >= 6;

export const isPasswordContainSpecialChar = (password: string) =>
  /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password);

export const isValidEmail = (email: string): boolean =>
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

export const isValidPassword = (password: string): boolean =>
  isPasswordContainSpecialChar(password) && isPasswordLongEnouph(password);
