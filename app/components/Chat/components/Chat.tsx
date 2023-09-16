import React, { useState } from 'react';
import './index.styles.css'
import { ChatFooter } from './ChatFooter';
import { ChatMessagesList } from './ChatMessagesList';
import { ChatFooterAudio } from './ChatFooterAudio';

export function Chat(){
  const [isRecording, setIsRecording] = useState(false)

  return (
    <div>
      <ChatMessagesList />
      {!isRecording ? (
        <ChatFooter 
          openAudioChat={() => setIsRecording(true)}
        />
      ) : (
        <ChatFooterAudio 
          openAudioChat={() => setIsRecording(false)}
        />
      )}
    </div>
    
  );
};

export default Chat;
