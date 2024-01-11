import { cookies } from 'next/headers';

export async function GET() {
  const efmToken = cookies().get('efmToken');

  if (efmToken) {
    cookies().delete('efmToken');
  } else {
    cookies().set('efmToken', '', { maxAge: 1, httpOnly: true, secure: true });
  }

  return Response.json({ message: 'Successfully terminated the connection.' });
}
