import { APIRequestContext, APIResponse } from "@playwright/test";
import { baseURL } from "../testData/secrets";
import type {
    AuthResponse,
    Book,
    CartItemDto,
    Categories,
    Checkout,
    OrdersDto,
    UserLogin,
    UserRegistration
} from "./types.api";

export class BookService {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async auth(data: UserLogin): Promise<AuthResponse> {
        const res = await this.request.post(`${baseURL}/api/Login`, { data });
        if (res.status() !== 200) {
            throw new Error(`Expected 200, got ${res.status()}: ${await res.text()}`);
        }
        return res.json();
    }

    async login(data: UserLogin): Promise<APIResponse> {
        const res = await this.request.post(`${baseURL}/api/Login`, { data });
        return res;
    }

    // Book endpoints
    async getBooks(): Promise<Book[]> {
        const res = await this.request.get(`${baseURL}/api/Book`);
        if (res.status() !== 200) {
            throw new Error(`Expected 200, got ${res.status()}: ${await res.text()}`);
        }
        return res.json();
    }

    async getBook(id: number): Promise<Book> {
        const res = await this.request.get(`${baseURL}/api/Book/${id}`);
        if (res.status() !== 200) {
            throw new Error(`Expected 200, got ${res.status()}: ${await res.text()}`);
        }
        return res.json();
    }

    async createBook(book: Book): Promise<number> {
        const res = await this.request.post(`${baseURL}/api/Book`, { data: book });
        if (res.status() !== 200) {
            throw new Error(`Expected 200, got ${res.status()}: ${await res.text()}`);
        }
        return res.json();
    }

    async updateBook(book: Book): Promise<number> {
        const res = await this.request.put(`${baseURL}/api/Book`, { data: book });
        if (res.status() !== 200) {
            throw new Error(`Expected 200, got ${res.status()}: ${await res.text()}`);
        }
        return res.json();
    }

    async deleteBook(id: number): Promise<number> {
        const res = await this.request.delete(`${baseURL}/api/Book/${id}`);
        if (res.status() !== 200) {
            throw new Error(`Expected 200, got ${res.status()}: ${await res.text()}`);
        }
        return res.json();
    }

    async getCategories(): Promise<Categories[]> {
        const res = await this.request.get(`${baseURL}/api/Book/GetCategoriesList`);
        if (res.status() !== 200) {
            throw new Error(`Expected 200, got ${res.status()}: ${await res.text()}`);
        }
        return res.json();
    }

    async getSimilarBooks(bookId: number): Promise<Book[]> {
        const res = await this.request.get(`${baseURL}/api/Book/GetSimilarBooks/${bookId}`);
        if (res.status() !== 200) {
            throw new Error(`Expected 200, got ${res.status()}: ${await res.text()}`);
        }
        return res.json();
    }

    // Checkout
    async checkout(userId: number, checkout: Checkout, accessToken: string) {
        const res = await this.request.post(`${baseURL}/api/CheckOut/${userId}`, {
            data: checkout,
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (res.status() !== 200) {
            throw new Error(`Expected 200, got ${res.status()}: ${await res.text()}`);
        }
        return res.json();
    }

    // Orders
    async getOrders(userId: number, accessToken: string): Promise<OrdersDto[]> {
        const res = await this.request.get(`${baseURL}/api/Order/${userId}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (res.status() !== 200) {
            throw new Error(`Expected 200, got ${res.status()}: ${await res.text()}`);
        }
        return res.json();
    }

    // ShoppingCart
    async setShoppingCart(oldUserId: number, newUserId: number, accessToken: string): Promise<number> {
        const res = await this.request.get(`${baseURL}/api/ShoppingCart/SetShoppingCart/${oldUserId}/${newUserId}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (res.status() !== 200) {
            throw new Error(`Expected 200, got ${res.status()}: ${await res.text()}`);
        }
        return res.json();
    }

    async getShoppingCart(userId: number, accessToken: string): Promise<CartItemDto[]> {
        const res = await this.request.get(`${baseURL}/api/ShoppingCart/${userId}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (res.status() !== 200) {
            throw new Error(`Expected 200, got ${res.status()}: ${await res.text()}`);
        }
        return res.json();
    }

    async clearShoppingCart(userId: number, accessToken: string): Promise<number> {
        const res = await this.request.delete(`${baseURL}/api/ShoppingCart/${userId}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (res.status() !== 200) {
            throw new Error(`Expected 200, got ${res.status()}: ${await res.text()}`);
        }
        return res.json();
    }

    async addToCart(userId: number, bookId: number, accessToken: string): Promise<CartItemDto[]> {
        const res = await this.request.post(`${baseURL}/api/ShoppingCart/AddToCart/${userId}/${bookId}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (res.status() !== 200) {
            throw new Error(`Expected 200, got ${res.status()}: ${await res.text()}`);
        }
        return res.json();
    }

    async updateCartItem(userId: number, bookId: number, accessToken: string): Promise<CartItemDto[]> {
        const res = await this.request.put(`${baseURL}/api/ShoppingCart/${userId}/${bookId}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (res.status() !== 200) {
            throw new Error(`Expected 200, got ${res.status()}: ${await res.text()}`);
        }
        return res.json();
    }

    async deleteCartItem(userId: number, bookId: number, accessToken: string): Promise<CartItemDto[]> {
        const res = await this.request.delete(`${baseURL}/api/ShoppingCart/${userId}/${bookId}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (res.status() !== 200) {
            throw new Error(`Expected 200, got ${res.status()}: ${await res.text()}`);
        }
        return res.json();
    }

    // User
    async getUser(userId: number, accessToken: string): Promise<number> {
        const res = await this.request.get(`${baseURL}/api/User/${userId}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (res.status() !== 200) {
            throw new Error(`Expected 200, got ${res.status()}: ${await res.text()}`);
        }
        return res.json();
    }

    async validateUserName(userName: string): Promise<boolean> {
        const res = await this.request.get(`${baseURL}/api/User/validateUserName/${userName}`);
        if (res.status() !== 200) {
            throw new Error(`Expected 200, got ${res.status()}: ${await res.text()}`);
        }
        return res.json();
    }

    async registerUser(data: UserRegistration): Promise<APIResponse> {
        const res = await this.request.post(`${baseURL}/api/User`, { data });
        return res;
    }

    // Wishlist
    async getWishlist(userId: number, accessToken: string): Promise<Book[]> {
        const res = await this.request.get(`${baseURL}/api/Wishlist/${userId}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (res.status() !== 200) {
            throw new Error(`Expected 200, got ${res.status()}: ${await res.text()}`);
        }
        return res.json();
    }

    async clearWishlist(userId: number, accessToken: string): Promise<number> {
        const res = await this.request.delete(`${baseURL}/api/Wishlist/${userId}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (res.status() !== 200) {
            throw new Error(`Expected 200, got ${res.status()}: ${await res.text()}`);
        }
        return res.json();
    }

    async toggleWishlist(userId: number, bookId: number, accessToken: string): Promise<Book[]> {
        const res = await this.request.post(`${baseURL}/api/Wishlist/ToggleWishlist/${userId}/${bookId}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (res.status() !== 200) {
            throw new Error(`Expected 200, got ${res.status()}: ${await res.text()}`);
        }
        return res.json();
    }

}