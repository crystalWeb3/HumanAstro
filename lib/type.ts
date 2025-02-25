export type MessageType = {
    type: number;
    content: string;
    [key: string]: unknown;
}

export type TypingStateType = {
    type: number,
    isTyping: boolean
}