import { cookies } from 'next/headers';

export async function POST(
  request: Request,
  { params }: { params: { address: string } }
) {
  const body = (await request.json()) as {
    message: string;
    nonce: string;
    signature: string;
  };

  try {
    const address = params.address;
    const res = await fetch(
      `${process.env.ETH_FUND_ENDPOINT}/api/verify/${address}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const err: { error: Error } = await res.json();
      throw err;
    }

    const verify_data = (await res.json()) as {
      ok: boolean;
      jwt: string;
      message: string;
      user: {
        id: string;
        ethAddress: string;
        fullName: string;
        email: string;
        role: 'beneficiary' | 'creator' | 'admin';
        isBanned: boolean;
        isVerified: boolean;
        creatorFee: number;
        profileUrl: string | null;
        bannerUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
      };
    };

    if (verify_data.jwt) {
      cookies().set('efmToken', verify_data.jwt, {
        expires: Date.now() + 14 * 24 * 60 * 60 * 1000, // 14 days
      });
    }

    return Response.json(verify_data.user, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(error, { status: 500 });
  }
}
