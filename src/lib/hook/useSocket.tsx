import { userStore } from '@/store';
import { useEffect, useState } from 'react';
import { socket } from '../socketConfig';
import { Comment, SocketResponse } from '../types';

export const useSocket = (campaignUUID?: string) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [comments, setComments] = useState<Comment[]>([]);
  const { user } = userStore();

  useEffect(() => {
    socket.connect();

    const joinData = {
      campaignUUID,
      userID: user?.id,
      limit: 24,
    };

    const onJoin = (
      response: SocketResponse<{
        comments: Comment[];
        totalComments: number;
      }>
    ) => {
      if (response.status === 'OK' && response.data) {
        console.log(response.data);
        setComments(response.data.comments);
      } else {
        console.error('Error fetching donations:', response.error);
      }
    };

    function onConnect() {
      setIsConnected(true);
      console.log('Connected 🔥');
      console.log(joinData);
      socket.emit('comment:join', joinData, onJoin);
    }

    // function onComment(response: {
    //   events: string;
    //   data: Comment;
    //   status: string;
    //   totalComments: number;
    // }) {
    function onComment(response: unknown) {
      console.log({ response });
      // if (!response.data) return;
      // setComments((prev) => [...prev, response.data]);
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
      socket.off('campaign:comment', onComment);
      socket.off('disconnect', onDisonnect);
      socket.on('error', onError);
      socket.disconnect();
    };
  }, [user, campaignUUID]);

  const handleAddComment = (comment: string) => {
    console.log('Called add comment');

    socket.emit('add:comment', {
      userID: user?.id,
      campaignUUID,
      comment,
    });
  };

  return { socket, isConnected, comments, handleAddComment };
};
