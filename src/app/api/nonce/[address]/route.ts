export async function GET(
  request: Request,
  { params }: { params: { address: string } }
) {
  try {
    const address = params.address;
    const res = await fetch(
      `${process.env.ETH_FUND_ENDPOINT}/api/nonce/${address}`
    );

    if (!res.ok) {
      const err: { error: Error } = await res.json();
      throw err;
    }

    const nonce = await res.text();
    return new Response(nonce, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return Response.json(error, {
      status: 500,
    });
  }
}
