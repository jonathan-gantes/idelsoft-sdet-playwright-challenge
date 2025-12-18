import { test as base, expect } from "@playwright/test";
import {
  LoginPage,
  CartPage,
  CheckoutPage,
  HomePage,
  OrdersPage,
} from "../pages";
import { books } from "../testData/books";
import { BookService } from "../services/books.api";
import { AuthResponse } from "../services/types.api";

// Declare the types of your fixtures.
type MyFixtures = {
  loginPage: LoginPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  homePage: HomePage;
  ordersPage: OrdersPage;
  mockBooksApi: () => Promise<void>;
  mockBookImages: () => Promise<void>;
  signInUser: (username: string, password: string) => Promise<void>;
  booksService: BookService;
  clearUserWishListAndCart: (
    username: string,
    password: string
  ) => Promise<AuthResponse>;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    // Set up the fixture.
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  ordersPage: async ({ page }, use) => {
    const ordersPage = new OrdersPage(page);
    await use(ordersPage);
  },
  mockBooksApi: async ({ page, mockBookImages }, use) => {
    await page.route("**/api/book/", async (route) => {
      await route.fulfill({ json: books });
    });
    await mockBookImages();
    await use(async () => {});
  },
  mockBookImages: async ({ page }, use) => {
    await page.route("**/Upload/image.jpg", async (route) => {
      const randomSeed = Math.floor(Math.random() * 1000); // Generate a random seed
      const picsumUrl = `https://picsum.photos/seed/${randomSeed}/300/451.jpg`;
      await route.fulfill({
        status: 302,
        headers: {
          location: picsumUrl,
        },
      });
    });

    await use(async () => {});
  },
  signInUser: async ({ homePage, loginPage, mockBooksApi }, use) => {
    await use(async (username: string, password: string) => {
      await mockBooksApi();
      await homePage.goto();
      expect(homePage.searchCombobox).toBeVisible();
      await loginPage.login(username, password);
      await expect(homePage.accountDropdownButton).toBeVisible({
        timeout: 15000,
      });
    });
  },
  booksService: async ({ request }, use) => {
    const booksService = new BookService(request);
    await use(booksService);
  },
  clearUserWishListAndCart: async ({ booksService }, use) => {
    await use(async (username: string, password: string) => {
      const res = await booksService.auth({ username, password });
      await booksService.clearWishlist(res.userDetails.userId, res.token);
      await booksService.clearShoppingCart(res.userDetails.userId, res.token);
      return res;
    });
  },
});

export { expect } from "@playwright/test";
