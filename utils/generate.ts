import { faker } from '@faker-js/faker';
import { UserRegistration } from '../services/types.api';
import { password } from '../testData/secrets';

export function generateRandomUser(): UserRegistration {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = faker.internet.username({ firstName, lastName });
  return {
    firstName,
    lastName,
    username,
    password,
    confirmPassword: password,
    gender: faker.helpers.arrayElement(['Male', 'Female']),
  };
}