import { expect, type Locator, type Page } from "@playwright/test";
import { NavPage } from "./nav.page";

export class OrdersPage extends NavPage {
  readonly orderIdColumnHeader: Locator;
  readonly myOrdersText: Locator;
  readonly searchTextbox: Locator;

  constructor(page: Page) {
    super(page);
    this.orderIdColumnHeader = page.getByRole("columnheader", { name: "Order Id" });
    this.myOrdersText = page.getByText("My Orders");
    this.searchTextbox = page.getByRole("textbox", { name: "Search" });
  }

  async verifyOrderIdColumnHeaderVisible() {
    await expect(this.orderIdColumnHeader).toBeVisible();
  }

  async verifyMyOrdersTextVisible() {
    await expect(this.myOrdersText).toBeVisible();
  }

  async searchOrder(orderId: string) {
    await this.searchTextbox.click();
    await this.searchTextbox.fill(orderId);
    await this.searchTextbox.press("Enter");
  }

  async clearSearch() {
    await this.searchTextbox.fill("");
  }
}
