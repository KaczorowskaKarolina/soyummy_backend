// AUTH
export { default as register } from './auth/register.js';
export { default as login } from './auth/login.js';
export { default as logout } from './auth/logout.js';
export { default as verifyEmail } from './auth/verify-email.js';
export { default as refreshToken } from './auth/refresh-token.js';
export { default as forgotPassword } from './auth/forgot-password.js';
export { default as sendVerificationCode } from './auth/send-verification-code.js';

// EDIT
export { default as changePassword } from './edit/change-password.js';
export { default as editUser } from './edit/edit-user.js';

// OTHER
export { default as getUser } from './get-user.js';
export { default as deleteUser } from './delete-user.js';

// USERS FUNCTIONALITY
export { default as addProduct } from './add-product.js';
export { default as addRecipe } from './add-recipe.js';
export { default as getShoppingList } from './get-shopping-list.js';
export { default as getUsersRecipes } from './get-users-recipes.js';
export { default as removeProduct } from './remove-product.js';
export { default as removeRecipe } from './remove-recipe.js';
