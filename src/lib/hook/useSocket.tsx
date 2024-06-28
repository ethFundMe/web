import { userStore } from '@/store';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { socket as webSocket } from '../socketConfig';
import { CommentsAndDonations, SocketResponse } from '../types';

export const useSocket = (campaignId: number) => {
  const [comments, setComments] = useState<CommentsAndDonations[]>([]);
  const [metadata, setMetadata] = useState<{
    limit: number;
    page: number;
    total: number;
    totalPages: number;
    totalComments: number;
    totalDonations: number;
  }>({
    limit: 50,
    page: 1,
    total: 0,
    totalPages: 1,
    totalComments: 0,
    totalDonations: 0,
  });
  const { user } = userStore();
  const socketRef = useRef<Socket>(null);

  const updateList = useCallback((newList: CommentsAndDonations[]) => {
    setComments(newList.reverse());
  }, []);

  useEffect(() => {
    let socket = socketRef.current;

    const joinData = {
      campaignId: Number(campaignId),
      limit: 50,
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
        commentsAndDonations: CommentsAndDonations[];
        totalComments: number;
        totalDonations: number;
        metadata: {
          limit: number;
          page: number;
          total: number;
          totalPages: number;
        };
      }>
    ) {
      if (response.status === 'OK' && response.data) {
        setComments(response.data.commentsAndDonations.reverse());
        setMetadata({
          ...response.data.metadata,
          totalComments: response.data.totalComments,
          totalDonations: response.data.totalDonations,
        });
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error fetching donations:', response.error);
        }
      }
    }

    function onConnect() {
      if (process.env.NODE_ENV === 'development') {
        console.log('Connected 🔥');
      }
    }

    function onComment(response: SocketResponse<CommentsAndDonations>) {
      console.log('commented');
      const data = response.data;
      if (!data) return;

      setComments((prev) => [data, ...prev.reverse()].reverse());
    }

    function onError(res: unknown) {
      if (process.env.NODE_ENV === 'development') {
        console.log(res);
      }
    }

    function onDisonnect() {
      if (process.env.NODE_ENV === 'development') {
        console.log('Disconnected ❌');
      }
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

  return { socket: webSocket, comments, updateList, metadata };
};
