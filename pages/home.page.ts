import { expect, type Locator, type Page } from "@playwright/test";
import { NavPage } from "./nav.page";
import { baseURL } from "../testData/secrets";

export class HomePage extends NavPage {
  readonly searchCombobox: Locator;
  readonly allCategoriesSpan: Locator;
  readonly biographyOption: Locator;
  readonly fictionSpan: Locator;
  readonly mysterySpan: Locator;
  readonly fantasySpan: Locator;
  readonly romanceSpan: Locator;

  constructor(page: Page) {
    super(page);
    this.searchCombobox = page.getByRole("combobox", { name: "search" });
    this.allCategoriesSpan = page
      .locator("span")
      .filter({ hasText: "All Categories" })
      .first();
    this.biographyOption = page.getByText("Biography");
    this.fictionSpan = page
      .locator("span")
      .filter({ hasText: "Fiction" })
      .first();
    this.mysterySpan = page
      .locator("span")
      .filter({ hasText: "Mystery" })
      .first();
    this.fantasySpan = page
      .locator("span")
      .filter({ hasText: "Fantasy" })
      .first();
    this.romanceSpan = page
      .locator("span")
      .filter({ hasText: "Romance" })
      .first();
  }

  async goto() {
    await this.page.goto(baseURL);
    await expect(this.searchCombobox).toBeVisible({ timeout: 15000 });
  }

  async selectCategory(category: string) {
    switch (category) {
      case "All":
        await this.allCategoriesSpan.click();
        break;
      case "Biography":
        await this.biographyOption.click();
        break;
      case "Fiction":
        await this.fictionSpan.click();
        break;
      case "Mystery":
        await this.mysterySpan.click();
        break;
      case "Fantasy":
        await this.fantasySpan.click();
        break;
      case "Romance":
        await this.romanceSpan.click();
        break;
      default:
        throw new Error(`Category ${category} not recognized`);
    }
  }

  getBookByTitle(bookTitle: string): Locator {
    return this.page
      .locator("app-book-card")
      .filter({ hasText: bookTitle });
  }

  async openBookByTitle(bookTitle: string) {
    const bookCard = this.page
      .locator("app-book-card")
      .filter({ hasText: bookTitle });
    await bookCard.click();
  }

  async addBookToCartByTitle(bookTitle: string) {
    const bookCard = this.page
      .locator("app-book-card")
      .filter({ hasText: bookTitle });
    const addToCartButton = bookCard.getByRole("button", {
      name: "Add to Cart",
    });
    await addToCartButton.click();
  }

  getAutocompleteOptionByTitle(title: string) {
    return this.page.locator("mat-option span.mdc-list-item__primary-text", {
      hasText: title,
    });
  }

}
