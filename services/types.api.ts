// Auth response typing
export interface AuthUserDetails {
  userId: number;
  username: string;
  userTypeName: string;
}

export interface AuthResponse {
  token: string;
  userDetails: AuthUserDetails;
}
// Types generated from Swagger for BookCart API

export interface Book {
  bookId: number;
  title?: string | null;
  author?: string | null;
  category?: string | null;
  price: number;
  coverFileName?: string | null;
}

export interface CartItemDto {
  book: Book;
  quantity: number;
}

export interface Categories {
  categoryId: number;
  categoryName?: string | null;
}

export interface Checkout {
  orderDetails?: CartItemDto[] | null;
  cartTotal: number;
}

export interface OrdersDto {
  orderId?: string | null;
  orderDetails?: CartItemDto[] | null;
  cartTotal: number;
  orderDate: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserRegistration {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
}
