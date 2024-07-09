import { useEffect, useState } from 'react';
import { IMessageResponse } from '@/types/message.types';
import SocketApi from '@/api/socket-api';

interface IChatMessages {
  [chatId: string]: IMessageResponse[];
}

export const useSocketConnect = (chatIds: string[] | null, initialMessages: IChatMessages) => {
  const [messages, setMessages] = useState<IChatMessages>(initialMessages);
  const connectSocket = () => {
    SocketApi.createConnection();

    if (SocketApi.socket && chatIds) { // Добавляем проверку на chatIds
      SocketApi.socket.emit('joinRooms', { chatIds });

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

      SocketApi.socket.on('new-message', handleNewMessage);
      SocketApi.socket.on('delete-message', handleDeleteMessage);
      SocketApi.socket.on('update-message', handleUpdateMessage);
    }
  };

  useEffect(() => {
    if (chatIds) { 
      connectSocket();
    }

    return () => {
      if (SocketApi.socket) {
        SocketApi.socket.off('new-message');
        SocketApi.socket.off('delete-message');
        SocketApi.socket.off('update-message');
      }
    };
  }, [chatIds]);

  return { messages };
};
