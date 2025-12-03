import { expect } from "@playwright/test";
import { test } from "../utils/fixtures";
import { APILogger } from "../utils/logger";

test("Test logger", async () => {
  const logger = new APILogger();
  logger.logRequest("POST", "https://test.com/api", { Authorization: "token" }, { foo: "bar" });
  logger.logResponse(200, { foo: "bar" });
  const logs = logger.getRecentLogs();
  console.log(logs);
});
