import { test, expect } from "../../fixtures/fixture";
import { generateRandomUser } from "../../utils/generate";

test(
  "should return 401 on user login with invalid credentials",
  { tag: ["@api"] },
  async ({ booksService }) => {
    const user = generateRandomUser();
    const response = await booksService.login(user);
    expect(response.status()).toBe(401);
  }
);
