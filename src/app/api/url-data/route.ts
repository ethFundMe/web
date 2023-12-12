export type UrlData = {
  image: string;
  title: string;
  description: string;
};

export type ResponseData = {
  message: string;
  error: boolean;
  urlData: UrlData | null;
};

import parse from 'node-html-parser';

export async function GET(req: Request): Promise<Response> {
  const fullUrl = new URL(req.url);
  const url = fullUrl.searchParams.get('url');

  try {
    console.log({ fetchedUrl: url });

    const res = await fetch(url as string);

    if (!res.ok) throw Error();

    const data = await res.text();
    const doc = parse(data);

    const title = doc.querySelector('title')?.textContent ?? '';
    const description =
      doc.querySelector('meta[name="description"]')?.getAttribute('content') ??
      '';
    const image =
      doc.querySelector('meta[property="og:image"]')?.getAttribute('content') ??
      '';

    return Response.json({
      message: 'Fetched URL data',
      error: false,
      urlData: { image, title, description },
    });
  } catch (error) {
    console.error('Failed to fetch URL data');
    return Response.json(
      { error: true, message: 'Failed to fetch URL data', urlData: null },
      { status: 500 }
    );
  }
}
