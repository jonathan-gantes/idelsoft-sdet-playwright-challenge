import { test, expect } from "../../fixtures/fixture";
import { generateRandomUser } from "../../utils/generate";

test(
  "should return 200 on user registration",
  { tag: ["@api"] },
  async ({ booksService }) => {
    const user = generateRandomUser();
    const response = await booksService.registerUser(user);
    expect(response.status()).toBe(200);
  }
);
