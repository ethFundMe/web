import parse from 'node-html-parser';

export async function urlPreview(url: string) {
  try {
    const res = await fetch(url, {
      mode: 'no-cors',
    });

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

    if (!title) {
      throw new Error();
    }

    return Response.json({
      message: 'Fetched URL data',
      error: false,
      urlData: { image, title, description },
    });
  } catch (error) {
    return Response.json(
      { error: true, message: 'Failed to fetch URL data', urlData: null },
      { status: 500 }
    );
  }
}
