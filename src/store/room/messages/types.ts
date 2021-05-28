export type MessagesState = {
  room: string | null,
  unsubscribe: Function | null,
  messages: object[],
  typing: object[],
}
