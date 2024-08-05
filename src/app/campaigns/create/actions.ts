'use server';

const api = process.env.ETH_FUND_ENDPOINT ?? '';

interface LivePeerResponse {
  url: string;
  tusEndpoint: string;
  asset: {
    id: string;
    playbackId: string;
    userId: string;
    source: {
      type: 'directUpload';
    };
    status: {
      phase: 'uploading';
      updatedAt: number;
    };
    name: string;
    projectId: string;
    createdAt: number;
    createdByTokenName: string;
  };
  task: {
    id: string;
  };
}

export async function livepeer(fileName: string) {
  try {
    const res = await fetch(`${api}/api/livepeer/file`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileName }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error(err);
      throw new Error(`Livepeer Error: ${err}`);
    }

    const { data } = (await res.json()) as { data: LivePeerResponse };
    return data;
  } catch (error) {
    throw new Error('Livepeer Error: An unknown error occurred');
  }
}
