import React, { useState } from 'react';
import './index.styles.css'
import { ChatFooter } from './ChatFooter';
import { ChatMessagesList } from './ChatMessagesList';
import { ChatFooterAudio } from './ChatFooterAudio';

type Props = {
  chat: string | null
}

export function Chat(props: Props){
  const [isRecording, setIsRecording] = useState(false)

  return (
    <div>
      <ChatMessagesList 
        chat={props.chat}
      />
      {!isRecording ? (
        <ChatFooter 
          openAudioChat={() => setIsRecording(true)}
          chat={props.chat}
        />
      ) : (
        <ChatFooterAudio 
          openAudioChat={() => setIsRecording(false)}
          chat={props.chat}
        />
      )}
    </div>
    
  );
};

export default Chat;
