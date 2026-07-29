export interface Credentials {
  email: string;
  password: string;
}

export const resolveCredentials = (
  configured: Credentials,
  environment: NodeJS.ProcessEnv = process.env,
): Credentials => {
  const email = environment.XUBE_EMAIL?.trim();
  const password = environment.XUBE_PASSWORD;

  if (Boolean(email) !== Boolean(password)) {
    throw new Error(
      "Set both XUBE_EMAIL and XUBE_PASSWORD, or neither to use config.ts.",
    );
  }

  return email && password ? { email, password } : configured;
};
