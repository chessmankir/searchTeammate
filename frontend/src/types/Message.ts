export interface Message {
    id: number,
    conversation_id: number,
    sender_id: number,
    created_at: string,
    time?: string
}