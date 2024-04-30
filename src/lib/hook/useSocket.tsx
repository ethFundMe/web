import { userStore } from '@/store';
import { useEffect, useState } from 'react';
import { socket } from '../socketConfig';
import { Comment } from '../types';

export const useSocket = (campaignID: number) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [comments, setComments] = useState<Comment[]>([]);
  const { user } = userStore();

  useEffect(() => {
    socket.connect();

    const joinData = {
      data: {
        campaignID,
        userID: user?.id,
        limit: 24,
      },
    };

    const onJoin = (response: { data: Comment[]; totalComments: number }) => {
      console.log('Joined room', response);
    };

    function onConnect() {
      setIsConnected(true);
      console.log('Connected');
      console.log(joinData);
      socket.emit('comment:join', joinData, onJoin);
    }

    function onComment(response: { data: Comment; totalComments: number }) {
      if (!response.data) return;
      console.log({ response });
      setComments((prev) => [...prev, response.data]);
    }

    function onDisonnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('comment:join', onJoin);
    socket.on('campaign:comment', onComment);
    socket.on('disconnect', onDisonnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('comment:join', onJoin);
      socket.on('campaign:comment', onComment);
      socket.off('disconnect', onDisonnect);
      socket.disconnect();
    };
  }, [user?.id, campaignID, isConnected]);

  const handleAddComment = (comment: string) => {
    socket.emit('add:comment', {
      data: {
        userID: user?.id,
        campaignID,
        comment,
      },
    });
  };

  return { socket, isConnected, comments, handleAddComment };
};
