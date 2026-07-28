import ora from "ora";
import { xubeSdk, type TXubeLogInResponse } from "./constants";

export interface IAuthentication {
  getToken: () => Promise<string>;
}

export class Authentication implements IAuthentication {
  tokens?: TXubeLogInResponse;

  constructor(private readonly creds: { email: string; password: string }) {}

  get email() {
    return this.creds.email;
  }

  getToken: () => Promise<string> = async (): Promise<string> => {
    const spinner = ora("Logging in...");
    try {
      if (this.tokens) {
        return this.tokens.token;
      }

      spinner.start();

      this.tokens = await this.login();

      spinner.succeed("Login successful.");

      return this.tokens.token;
    } catch (error) {
      spinner.fail("Login failed.");
      const status =
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof error.response === "object" &&
        error.response !== null &&
        "status" in error.response &&
        typeof error.response.status === "number"
          ? error.response.status
          : undefined;
      throw new Error(
        status
          ? `Xube platform login failed (HTTP ${status}). Check the configured environment and credentials.`
          : "Xube platform login failed. Check the configured environment and credentials.",
      );
    }
  };

  async login(): Promise<TXubeLogInResponse> {
    return await xubeSdk["Log in"](this.creds);
  }
}
