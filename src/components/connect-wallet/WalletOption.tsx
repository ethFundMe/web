import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function WalletOption({
  icon,
  title,
  isLoading,
  disabled = false,
  handleConnect,
}: {
  icon: string;
  title: string;
  isLoading?: boolean;
  disabled?: boolean;
  handleConnect: () => void;
}) {
  return (
    <button
      disabled={disabled}
      className={cn(
        'flex w-full items-center gap-2 rounded-md p-2 hover:bg-slate-200',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      )}
      onClick={handleConnect}
    >
      <div className='grid h-12 w-12 place-content-center rounded-full bg-white'>
        <Image
          src={icon}
          className='h-8 w-8 object-cover'
          width={50}
          height={50}
          alt={title}
        />
      </div>

      <p className='text-lg font-semibold'>
        {isLoading ? 'Connecting...' : title}
      </p>
    </button>
  );
}
