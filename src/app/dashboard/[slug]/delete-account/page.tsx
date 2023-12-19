import { DeleteAccountForm } from '@/components/DeleteAccountForm';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';

export default function DeleteAccountPage() {
  return (
    <div className='flex w-full flex-col gap-4 p-4'>
      <h1 className={cn(TextSizeStyles.h4, 'text-red-500')}>
        Delete your EthFundMe account?
      </h1>
      <p>This action is not reversible</p>

      <DeleteAccountForm />
    </div>
  );
}
