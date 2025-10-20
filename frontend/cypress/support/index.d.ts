declare namespace Cypress {
  interface Chainable {
    login(
      email: string,
      password: string,
      options?: { checkSignIn?: boolean }
    ): Chainable<void>
  }
}
