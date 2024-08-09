import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

const redis = Redis.fromEnv();
export const config = {
  runtime: 'edge',
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (req.method !== 'POST') {
    return new NextResponse('use POST', { status: 405 });
  }
  if (req.headers.get('Content-Type') !== 'application/json') {
    return new NextResponse('must be json', { status: 400 });
  }

  const body = await req.json();
  let slug: string | undefined = undefined;
  if ('slug' in body) {
    slug = body.slug;
  }
  if (!slug) {
    console.log('slug not found');

    return new NextResponse('Slug not found', { status: 400 });
  }
  const ip = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
  if (ip) {
    // Hash the IP in order to not store it directly in your db.
    const buf = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(ip)
    );
    const hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    // deduplicate the ip for each slug
    const isNew = await redis.set(['deduplicate', hash, slug].join(':'), true, {
      nx: true,
      ex: 24 * 60 * 60,
    });
    const test = {
      test: 'we passed 1',
      ip,
    };
    if (!isNew) {
      return new NextResponse(JSON.stringify(test), { status: 202 });
    }
  }
  const test = {
    test: 'we passed',
    ip,
  };
  await redis.incr(['pageviews', 'projects', slug].join(':'));
  return new NextResponse(JSON.stringify(test), { status: 202 });

  // const body = await req.json();
  // const reqType = {
  //   tet: req.method
  // };
  // return NextResponse.json({
  //   body,
  //   reqType,
  // });
}
