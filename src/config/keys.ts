export namespace Keys {
  export const jwtKey = 'secret_key_whatthecode';
  export const expiryDateJWT = (Date.now() / 1000) + (60 * 60 * 10);
}
