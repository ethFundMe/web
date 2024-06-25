import { userStore } from '@/store';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { socket as webSocket } from '../socketConfig';
import { Comment, CommentsAndDonations, SocketResponse } from '../types';

export const useSocket = (campaignId: number) => {
  const [comments, setComments] = useState<CommentsAndDonations[]>([]);
  const { user } = userStore();
  const socketRef = useRef<Socket>(null);

  const updateList = useCallback((newList: CommentsAndDonations[]) => {
    setComments(newList.reverse());
  }, []);

  useEffect(() => {
    let socket = socketRef.current;

    const joinData = {
      campaignId: Number(campaignId),
      userID: user?.id,
      limit: 24,
    };

    console.log({ ...joinData, campaignId });

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
        commentsAndDonations: CommentsAndDonations[];
        total: number;
      }>
    ) {
      if (response.status === 'OK' && response.data) {
        setComments(response.data.commentsAndDonations.reverse());
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

      // setComments((prev) => [data, ...prev.reverse()].reverse());
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
  }, [user, campaignId]);

  return { socket: webSocket, comments, updateList };
};
