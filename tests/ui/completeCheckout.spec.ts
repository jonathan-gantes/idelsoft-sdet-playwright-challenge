import { test, expect } from "../../fixtures/fixture";
import { books } from "../../testData/books";
import { checkoutUser } from "../../testData/users";

test(
  "user can add Book to Shopping Cart",
  { tag: ["@regression", "@ui", "@smoke"] },
  async ({ clearUserWishListAndCart, signInUser, homePage, cartPage, checkoutPage, ordersPage }) => {
    await clearUserWishListAndCart(checkoutUser.username, checkoutUser.password);
    await signInUser(checkoutUser.username, checkoutUser.password);
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
    await cartPage.checkoutButton.click();
    expect(checkoutPage.nameTextbox).toBeVisible({ timeout: 15000 });
    await checkoutPage.fillAndPlaceOrder(
      "Jonathan Gantes",
      "Miami",
      "1234 Elm Street",
      "666777",
      "Florida"
    );
    await checkoutPage.placeOrderButton.click();
    await expect(ordersPage.orderIdColumnHeader).toBeVisible({ timeout: 15000 });

  }
);
