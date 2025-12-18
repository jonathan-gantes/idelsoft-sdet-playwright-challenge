import { expect, type Locator, type Page } from "@playwright/test";
import { NavPage } from "./nav.page";

export class CheckoutPage extends NavPage {
  readonly nameTextbox: Locator;
  readonly addressLine1Textbox: Locator;
  readonly addressLine2Textbox: Locator;
  readonly pincodeTextbox: Locator;
  readonly stateTextbox: Locator;
  readonly placeOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.nameTextbox = page.getByRole("textbox", { name: "Name" });
    this.addressLine1Textbox = page.getByRole("textbox", {
      name: "Address Line 1",
    });
    this.addressLine2Textbox = page.getByRole("textbox", {
      name: "Address Line 2",
    });
    this.pincodeTextbox = page.getByRole("textbox", { name: "Pincode" });
    this.stateTextbox = page.getByRole("textbox", { name: "State" });
    this.placeOrderButton = page.getByRole("button", { name: "Place Order" });
  }

  async fillAndPlaceOrder(
    name: string,
    addressLine1: string,
    addressLine2: string,
    pincode: string,
    state: string
  ) {
    await this.nameTextbox.fill(name);
    await this.addressLine1Textbox.fill(addressLine1);
    await this.addressLine2Textbox.fill(addressLine2);
    await this.pincodeTextbox.fill(pincode);
    await this.stateTextbox.fill(state);
    await this.placeOrderButton.click();
  }
}
