import { DeleteAccountForm } from '@/components/DeleteAccountForm';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';

export default function DeleteAccountPage() {
  return (
    <div className='flex w-full flex-col gap-6 p-4 lg:gap-8'>
      <h1 className={cn(TextSizeStyles.h4, 'text-center text-red-500')}>
        Delete your EthFundMe account?
      </h1>

      <div className='space-y-1'>
        <p>This action is not reversible.</p>
        <p>All your campaigns will be discontinued immediately.</p>
      </div>

      <DeleteAccountForm />
    </div>
  );
}
