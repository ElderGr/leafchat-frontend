export type MessagesModel = {
    _id: string;
    senderId: string;
    chatId: string;
    content: string;
    contentType: string;
    created_at?: Date;
}