import { test, expect } from "../../fixtures/fixture";
import { books } from "../../testData/books";

test(
  "search bar displays existent books when searched",
  { tag: ["@regression", "@ui", "@smoke"] },
  async ({ mockBooksApi, homePage }) => {
    await mockBooksApi();
    await homePage.goto();
    expect(homePage.searchCombobox).toBeVisible();
    await homePage.searchCombobox.fill(books[1].title);
    expect(homePage.getAutocompleteOptionByTitle(books[1].title)).toBeVisible({ timeout: 15000 });
    await homePage.getAutocompleteOptionByTitle(books[1].title).click();
  }
);
