import { Collapse, CollapseProps, Row } from "antd";
import { ChatListTabs } from "./chat-list-tabs";

export function ChatListContainer(){
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Mensagens',
            children:  
                <Row>
                    <ChatListTabs />
                </Row>
        }
    ];

    return(
        <Collapse
            style={{
                width: '400px',
                maxHeight: '50vh',
            }}
            items={items}
            className="chat-list"
        />
    )
}