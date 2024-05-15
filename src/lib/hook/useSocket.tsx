import { userStore } from '@/store';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { socket as webSocket } from '../socketConfig';
import { Comment, SocketResponse } from '../types';

export const useSocket = (campaignUUID: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const { user } = userStore();
  const socketRef = useRef<Socket>(null);

  const updateList = useCallback((newList: Comment[]) => {
    setComments(newList);
  }, []);

  useEffect(() => {
    let socket = socketRef.current;

    const joinData = {
      campaignUUID,
      userID: user?.id,
      limit: 24,
    };

    if (!socket) {
      socket = webSocket;
      socket.connect();
      socket.on('connect', onConnect);
      socket.on('campaign:comment', onComment);
      socket.on('comment:join', onJoin);
      socket.on('disconnect', onDisonnect);
      socket.on('error', onError);
      socket.emit('comment:join', joinData, onJoin);
    }

    function onJoin(
      response: SocketResponse<{
        comments: Comment[];
        totalComments: number;
      }>
    ) {
      if (response.status === 'OK' && response.data) {
        console.log('joined wai');
        setComments(response.data.comments);
      } else {
        console.error('Error fetching donations:', response.error);
      }
    }

    function onConnect() {
      console.log('Connected 🔥');
    }

    function onComment(response: SocketResponse<Comment>) {
      const data = response.data;
      if (!data) return;

      setComments((prev) => [data, ...prev]);
    }

    function onError(res: unknown) {
      console.log(res);
    }

    function onDisonnect() {
      console.log('Disconnected ❌');
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('comment:join', onJoin);
      socket.off('campaign:comment', onComment);
      socket.off('disconnect', onDisonnect);
      socket.off('error', onError);
      socket.disconnect();
    };
  }, [user, campaignUUID]);

  return { socket: webSocket, comments, updateList };
};
