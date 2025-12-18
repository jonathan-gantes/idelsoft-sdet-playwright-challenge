import { test, expect } from "../../fixtures/fixture";
import { books } from "../../testData/books";

test(
  "filter books by Category displays correct books",
  { tag: ["@regression", "@ui", "@smoke"] },
  async ({ mockBooksApi, homePage }) => {
    await mockBooksApi();
    await homePage.goto();
    expect(homePage.searchCombobox).toBeVisible();
    expect(homePage.getBookByTitle(books[1].title)).toBeVisible({ timeout: 15000 });
    await homePage.selectCategory(books[1].category);
    expect(homePage.getBookByTitle(books[1].title)).toBeVisible({ timeout: 15000 });
    await homePage.selectCategory(books[7].category);
    expect(homePage.getBookByTitle(books[7].title)).toBeVisible({ timeout: 15000 });
    await homePage.selectCategory(books[12].category);
    expect(homePage.getBookByTitle(books[12].title)).toBeVisible({ timeout: 15000 });
    await homePage.selectCategory(books[17].category);
    expect(homePage.getBookByTitle(books[17].title)).toBeVisible({ timeout: 15000 });
  }
);
