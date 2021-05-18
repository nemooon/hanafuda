export type AuthState = {
  me: User | null,
}

export type User = {
  name: string,
  uid: string,
}
