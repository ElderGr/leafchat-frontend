export function ChatListTabs(){
    const tabItems: TabsProps['items'] = [
        {
            key: '1',
            label: (
                <label>
                    <MessageFilled />
                    Conversas
                </label>
            ),
            children: chats.map((chat, index) => (
                <ChatItemList
                    key={index}
                    data={chat}
                    active={selectedChat?.id === chat.id}
                    handleSelectChat={() => setSelectedChat({
                        type: 'existend',
                        id: chat.id
                    })} 
                />
            )),
        },
        {
            key: '2',
            label: (
                <label>
                    <PlusOutlined />
                    Nova conversa
                </label>
            ),
            children: <NewChatItemList openChat={(id) => {
                setSelectedChat({
                    type: 'inexistend',
                    receiver: id,
                    id: ''
                })
            }} />,
        },
    ];
    return (
        <Tabs 
            style={{width: '100%'}} 
            defaultActiveKey="1" 
            items={tabItems} 
            // onChange={onChange} 
        />
    )
}