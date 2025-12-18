import { type Locator, type Page } from "@playwright/test";
import { NavPage } from "./nav.page";
import { baseURL } from "../testData/secrets";

export class CartPage extends NavPage {
  readonly shoppingCartButton: Locator;
  readonly favoriteButton: Locator;
  readonly accountMenuButton: Locator;
  readonly overlayBackdrop: Locator;
  readonly bookCartButton: Locator;
  readonly myOrdersMenuItem: Locator;
  readonly continueShoppingButton: Locator;
  readonly clearCartButton: Locator;
  readonly emptyCartMessage: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.shoppingCartButton = page.locator('button[aria-label*="cart"][mat-icon-button], button.mat-mdc-icon-button').filter({ hasText: /^shopping_cart\d*$/ });
    this.favoriteButton = page.getByRole("button").filter({ hasText: "favorite" });
    this.accountMenuButton = page.getByText("account_circlearrow_drop_down");
    this.overlayBackdrop = page.locator(".cdk-overlay-backdrop");
    this.bookCartButton = page.getByRole("button", { name: "Book Cart" });
    this.myOrdersMenuItem = page.getByRole("menuitem", { name: "My Orders" });
    this.continueShoppingButton = page.getByRole("button", { name: "Continue shopping" });
    this.clearCartButton = page.getByRole("button", { name: "Clear cart" });
    this.emptyCartMessage = page.getByText("Your shopping cart is empty.");
    this.checkoutButton = page.getByRole("button", { name: "CheckOut" });
  }

  async goto() {
    await this.page.goto(baseURL + "/shopping-cart");
  }

  // Locator methods for books by title
  getBookRowByTitle(bookTitle: string): Locator {
    return this.page.locator('tr.mat-mdc-row').filter({ has: this.page.locator(`td a:has-text("${bookTitle}")`) });
  }

  getBookTitleCell(bookTitle: string): Locator {
    return this.getBookRowByTitle(bookTitle).locator('td.cdk-column-title a');
  }

  getBookQuantityText(bookTitle: string): Locator {
    return this.getBookRowByTitle(bookTitle).locator('td.cdk-column-quantity div.d-flex > div').nth(1);
  }

  async getBookQuantity(bookTitle: string): Promise<number> {
    const quantityText = await this.getBookQuantityText(bookTitle).textContent();
    return parseInt(quantityText?.trim() || '0');
  }

  getIncreaseQuantityButton(bookTitle: string): Locator {
    return this.getBookRowByTitle(bookTitle).locator('button mat-icon:has-text("add_circle")').locator('..');
  }

  getDecreaseQuantityButton(bookTitle: string): Locator {
    return this.getBookRowByTitle(bookTitle).locator('button mat-icon:has-text("remove_circle")').locator('..');
  }

  getDeleteBookButton(bookTitle: string): Locator {
    return this.getBookRowByTitle(bookTitle).locator('button mat-icon:has-text("delete")').locator('..');
  }

  // Action methods
  async increaseBookQuantity(bookTitle: string): Promise<void> {
    await this.getIncreaseQuantityButton(bookTitle).click();
  }

  async decreaseBookQuantity(bookTitle: string): Promise<void> {
    await this.getDecreaseQuantityButton(bookTitle).click();
  }

  async removeBookByTitle(bookTitle: string): Promise<void> {
    await this.getDeleteBookButton(bookTitle).click();
  }

}