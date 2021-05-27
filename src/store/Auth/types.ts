import { UserInfo } from "@firebase/auth"

export type AuthState = {
  init: boolean,
  me: User | null,
}

export type User = {
  name: string,
  uid: string,
  twitter: UserInfo,
}
