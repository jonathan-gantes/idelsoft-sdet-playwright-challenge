import { test, expect } from "../../fixtures/fixture";
import { loginUser } from "../../testData/users";

test(
  "should return 200 on user login with valid credentials",
  { tag: ["@api"] },
  async ({ booksService }) => {
    const response = await booksService.login(loginUser);
    expect(response.status()).toBe(200);
    expect(await response.json()).toHaveProperty("token");
  }
);
