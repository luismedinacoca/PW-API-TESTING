import { RequestHandler } from "../utils/request-handler";
import { request } from "@playwright/test";
import { APILogger } from "../utils/logger";
import { config } from "../api-test.config";

type LoginResponse = {
  user: {
    token: string;
  };
};

export async function createToken(email: string, password: string): Promise<string> {
  if (!email) {
    throw new Error("createToken: 'email' is required");
  }

  if (!password) {
    throw new Error("createToken: 'password' is required");
  }

  const context = await request.newContext();
  const logger = new APILogger();
  const api = new RequestHandler(context, config.apiUrl, logger);

  try {
    const tokenResponse = (await api
      .path("/users/login")
      .body({ user: { email: email, password: password } })
      .postRequest(200)) as LoginResponse;

    if (!tokenResponse?.user?.token) {
      throw new Error("createToken: missing token in login response");
    }

    return "Token " + tokenResponse.user.token;
  } catch (error) {
    const safeError = error instanceof Error ? error : new Error(String(error));
    Error.captureStackTrace(safeError, createToken);
    throw safeError;
  } finally {
    await context.dispose();
  }
}
