import { test, expect } from "../../fixtures/fixture";
import { loginUser } from "../../testData/users";

test(
  "user can login with valid username and password",
  { tag: ["@regression", "@ui", "@smoke"] },
  async ({ mockBooksApi, homePage, loginPage }) => {
    await mockBooksApi();
    await homePage.goto();
    expect(homePage.searchCombobox).toBeVisible();
    await loginPage.login(loginUser.username, loginUser.password);
    await expect(homePage.accountDropdownButton).toBeVisible({
      timeout: 15000,
    });
  }
);
