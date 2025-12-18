import { test, expect } from "../../fixtures/fixture";
import { books } from "../../testData/books";
import { addBooksToCartUser } from "../../testData/users";

test(
  "user can add Books and complete checkout",
  { tag: ["@regression", "@ui", "@smoke"] },
  async ({ clearUserWishListAndCart, signInUser, homePage, cartPage }) => {
    await clearUserWishListAndCart(addBooksToCartUser.username, addBooksToCartUser.password);
    await signInUser(addBooksToCartUser.username, addBooksToCartUser.password);
    await homePage.addBookToCartByTitle(books[1].title);
    await expect(homePage.shoppingCartButton).toContainText("1", {
      timeout: 15000,
    });
    await homePage.addBookToCartByTitle(books[2].title);
    await expect(homePage.shoppingCartButton).toContainText("2", {
      timeout: 15000,
    });
    await homePage.shoppingCartButton.click();
    await expect(cartPage.getBookRowByTitle(books[1].title)).toBeVisible({
      timeout: 15000,
    });
    await expect(cartPage.getBookRowByTitle(books[2].title)).toBeVisible();
  }
);
