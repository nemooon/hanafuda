export type ChatState = {
  messages: Message[],
  typing: Sender[],
}

export type Sender = string

export type Message = {
  id: string,
  date: Date,
  sender: Sender,
  body: string,
}
