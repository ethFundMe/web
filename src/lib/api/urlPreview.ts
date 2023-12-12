import parse from 'node-html-parser';

export async function urlPreview(url: string) {
  const res = await fetch(url);

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

  return { image, title, description };
}
