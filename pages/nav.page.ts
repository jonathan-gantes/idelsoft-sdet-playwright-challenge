import { type Locator, type Page } from '@playwright/test';

export class NavPage {
  readonly page: Page;
  readonly shoppingCartButton: Locator;
  readonly loginButton: Locator;
  readonly bookCartButton: Locator;
  readonly accountDropdownButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartButton = page.locator('button[aria-label*="cart"][mat-icon-button], button.mat-mdc-icon-button').filter({ hasText: /^shopping_cart\d*$/ });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.bookCartButton = page.getByRole('button', { name: 'Book Cart' });
    this.accountDropdownButton =   page.getByText('account_circlearrow_drop_down');
  }

}
