const processENV = process.env.TEST_ENV;
const env = processENV || "prod";
console.log("🚀 Test environment is: " + env);

const config = {
  apiUrl: "https://conduit-api.bondaracademy.com/api",
  userEmail: "suspiros@test.com",
  userPassword: "Test!001",
};

if (env === "qa") {
  config.userEmail = "suspiros.qa@example.io";
  config.userPassword = "Test!001";
} else if (env === "stg") {
  config.userEmail = "suspiros.stg@example.io";
  config.userPassword = "Test!001";
} else if (env === "prod") {
  config.userEmail = "pierotester@test.com";
  config.userPassword = "12345678";
} else if (env === "dev") {
  config.userEmail = "suspiros.dev@example.io";
  config.userPassword = "Test!001";
} else {
  config.userEmail = "suspiros@test.com";
  config.userPassword = "Test!001";
}

export { config };
