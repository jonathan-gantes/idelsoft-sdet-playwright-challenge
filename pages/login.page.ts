import { expect, type Locator, type Page } from "@playwright/test";
import { NavPage } from "./nav.page";

export class LoginPage extends NavPage {
  readonly registerButton: Locator;
  readonly firstNameTextbox: Locator;
  readonly lastNameTextbox: Locator;
  readonly usernameTextbox: Locator;
  readonly passwordTextbox: Locator;
  readonly confirmPasswordTextbox: Locator;
  readonly maleRadioButton: Locator;
  readonly femaleRadioButton: Locator;
  readonly loginActionButton: Locator;

  constructor(page: Page) {
    super(page);
    this.registerButton = page.getByRole("button", { name: "Register" });
    this.firstNameTextbox = page.getByRole("textbox", { name: "First name" });
    this.lastNameTextbox = page.getByRole("textbox", { name: "Last name" });
    this.usernameTextbox = page.getByRole("textbox", { name: "Username" });
    this.passwordTextbox = page.getByRole("textbox", { name: "Password", exact: true });
    this.confirmPasswordTextbox = page.getByRole("textbox", { name: "Confirm Password" });
    this.maleRadioButton = page.getByRole("radio", { name: "Male", exact: true });
    this.femaleRadioButton = page.getByRole("radio", { name: "Female", exact: true });
    this.loginActionButton = page.locator("mat-card-actions").getByRole("button", { name: "Login" });
  }

  async login(username: string, password: string) {
    await this.loginButton.click();
    await expect( this.loginActionButton).toBeVisible({ timeout: 15000 });
    await this.usernameTextbox.fill(username);
    await this.passwordTextbox.fill(password);
    await this.loginActionButton.click();
  }

  async register(
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    gender: "Male" | "Female"
  ) {
    await this.registerButton.click();
    await this.firstNameTextbox.fill(firstName);
    await this.lastNameTextbox.fill(lastName);
    await this.usernameTextbox.fill(username);
    await this.passwordTextbox.fill(password);
    await this.confirmPasswordTextbox.fill(password);
    if (gender === "Male") {
      await this.maleRadioButton.check();
    } else {
      await this.femaleRadioButton.check();
    }
    await this.registerButton.click();
    await this.loginButton.waitFor({ state: 'visible', timeout: 15000 });
  }

}