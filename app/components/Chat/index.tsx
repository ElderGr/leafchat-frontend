import { Collapse, CollapseProps, Space } from "antd";
import { ChatItemList } from "./components/ChatItemList";
import Chat from "./components/Chat";

export function ChatContainer(){
    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    const items: CollapseProps['items'] = [
    {
        key: '1',
        label: 'Mensagens',
        children:  
        <div>
            <ChatItemList />
            <ChatItemList />
            <ChatItemList />
            <ChatItemList />
            <ChatItemList />
            <ChatItemList />
        </div>
    }];

    const chatMessages: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Ednaldo Pereira',
            children:  
            <div>
                <Chat />
            </div>
        }];

    return(
        <div style={{
            position: 'fixed',
            right: '20px',
            bottom: '0px',
        }}>
            <Space align="end">
                <Collapse
                    style={{
                        width: '400px'
                    }}
                    items={chatMessages}
                    onChange={onChange}
                />
                <Collapse
                    style={{
                        width: '400px'
                    }}
                    items={items}
                    onChange={onChange}
                />
            </Space>
            
        </div>
    )
}