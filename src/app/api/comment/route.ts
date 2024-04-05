import { io } from 'socket.io-client';

export async function POST(request: Request) {
  const socket = io(process.env.ETH_FUND_ENDPOINT);

  const body = await request.json();
  const { comment, userID, campaignID } = body;

  if (comment && userID && campaignID) {
    const res = await fetch(`${process.env.ETH_FUND_ENDPOINT}/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    const { commentID } = data;
    socket.emit('sendComment', data);

    return Response.json({ commentID });
  }

  return Response.json(null);
}
