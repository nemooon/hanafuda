import { User } from '@/store/Auth/types'

export type ChatState = {
  messages: Message[],
  typing: Sender[],
}

export type Sender = {
  user: User | null,
  name: string,
}

export type Message = {
  id: string,
  date: Date,
  sender: Sender,
  body: string,
}
