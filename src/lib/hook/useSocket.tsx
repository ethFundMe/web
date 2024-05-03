import { userStore } from '@/store';
import { useEffect, useState } from 'react';
import { socket } from '../socketConfig';
import { Comment } from '../types';

export const useSocket = (campaignID: string) => {
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

    const onJoin = (response: {
      comments: Comment[];
      totalComments: number;
    }) => {
      console.log('Joined room', response);
      if (response.comments) {
        setComments(response.comments);
      }
    };

    function onConnect() {
      setIsConnected(true);
      console.log('Connected 🔥');
      console.log(joinData);
      socket.emit('comment:join', joinData, onJoin);
    }

    function onComment(response: {
      events: string;
      data: Comment;
      status: string;
      totalComments: number;
    }) {
      if (!response.data) return;
      console.log({ response });
      setComments((prev) => [...prev, response.data]);
    }

    function onError(res: unknown) {
      console.log(res);
    }

    function onDisonnect() {
      console.log('Disconnected ❌');
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('comment:join', onJoin);
    socket.on('campaign:comment', onComment);
    socket.on('disconnect', onDisonnect);
    socket.on('error', onError);

    return () => {
      socket.off('connect', onConnect);
      socket.off('comment:join', onJoin);
      socket.on('campaign:comment', onComment);
      socket.off('disconnect', onDisonnect);
      socket.on('error', onError);
      socket.disconnect();
    };
  }, [user, campaignID]);

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
