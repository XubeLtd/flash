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
    if (this.tokens) {
      return this.tokens.token;
    }

    const spinner = ora("Logging in...").start();

    this.tokens = await this.login();

    spinner.succeed("Login successful.");

    return this.tokens.token;
  };

  async login(): Promise<TXubeLogInResponse> {
    return await xubeSdk["Log in"](this.creds);
  }
}
