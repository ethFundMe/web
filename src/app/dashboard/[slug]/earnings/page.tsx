import EarningsCard from '@/components/EarningsCard';

export default async function EarningsPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  // Fetch user earnings

  return (
    <div className='flex w-full p-4'>
      <div className='hidden'>{slug}</div>
      <EarningsCard />
    </div>
  );
}
