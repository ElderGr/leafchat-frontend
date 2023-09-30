import './index.styles.css'
import ChatProvider from "@/app/context/chat";
import { ChatContainer } from "./chat-container";

export function ChatComponent(){
    return(
        <ChatProvider>
            <ChatContainer />
        </ChatProvider>
    )
}