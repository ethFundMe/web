import { MetadataRoute } from 'next';

const webUrl = process.env.NEXT_PUBLIC_WEB_URL || '';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: webUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${webUrl}/campaigns`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.8,
    },
    {
      url: `${webUrl}/how-to-donate`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.65,
    },
    {
      url: `${webUrl}/verify`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
