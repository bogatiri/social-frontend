import { useEffect, useState } from 'react';
import { IMessageResponse } from '@/types/message.types';
import SocketApi from '@/api/socket-api';

interface IChatMessages {
  [chatId: string]: IMessageResponse[];
}

export const useMessageState = (initialMessages: IChatMessages) => {
  const [messages, setMessages] = useState<IChatMessages>(initialMessages);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    const handleNewMessage = (newMessage: IMessageResponse) => {
      setMessages(prevMessages => {
        const chatId = newMessage.chatId;
        return {
          ...prevMessages,
          [chatId]: [...(prevMessages[chatId] || []), newMessage],
        };
      });
    };

    const handleDeleteMessage = (deletedMessage: IMessageResponse) => {
      setMessages(prevMessages => {
        const chatId = deletedMessage.chatId;
        return {
          ...prevMessages,
          [chatId]: (prevMessages[chatId] || []).filter(message => message.id !== deletedMessage.id),
        };
      });
    };

    const handleUpdateMessage = (updatedMessage: IMessageResponse) => {
      setMessages(prevMessages => {
        const chatId = updatedMessage.chatId;
        return {
          ...prevMessages,
          [chatId]: (prevMessages[chatId] || []).map(message =>
            message.id === updatedMessage.id ? updatedMessage : message
          ),
        };
      });
    };

    if (SocketApi.socket) {
      SocketApi.socket.on('new-message', handleNewMessage);
      SocketApi.socket.on('delete-message', handleDeleteMessage);
      SocketApi.socket.on('update-message', handleUpdateMessage);
    } else {
      console.log('SocketApi.socket is not defined');
    }

    return () => {
      if (SocketApi.socket) {
        SocketApi.socket.off('new-message', handleNewMessage);
        SocketApi.socket.off('delete-message', handleDeleteMessage);
        SocketApi.socket.off('update-message', handleUpdateMessage);
      }
    };
  }, []);

  return { messages };
};
