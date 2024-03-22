export {};

declare global {
  interface CustomJwtSessionClaims {
    firstName?: string;
    primaryEmail?: string;
    userId?: ObjectId;
  }
}
