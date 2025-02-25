export type MessageType = {
    type: number;
    content: string;
    [key: string]: any;
}

export type TypingStateType = {
    type: number,
    isTyping: boolean
}