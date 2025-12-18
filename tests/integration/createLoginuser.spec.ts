import { test, expect } from "../../fixtures/fixture";
import { generateRandomUser } from "../../utils/generate";

test(
  "user can lbe created via api and login with valid username and password",
  { tag: ["@integration", "@smoke"] },
  async ({ mockBooksApi, homePage, loginPage, booksService }) => {
    await mockBooksApi();
    const user = generateRandomUser();
    const response = await booksService.registerUser(user);
    expect(response.status()).toBe(200);
    await homePage.goto();
    expect(homePage.searchCombobox).toBeVisible();
    await loginPage.login(user.username, user.password);
    await expect(homePage.accountDropdownButton).toBeVisible({
      timeout: 15000,
    });
  }
);
