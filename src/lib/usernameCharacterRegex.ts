export function checkUsernameRegex(username: string): boolean {
  const usernameRegex = /^[A-Za-z0-9_]{1,16}$/;
  return usernameRegex.test(username);
}
