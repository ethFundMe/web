import { AccountForm } from '@/components/forms';
import { TextSizeStyles } from '@/lib/styles';

export default function Account() {
  return (
    <main>
      <div className='my-4 py-5 text-center md:py-0'>
        <h1 className={TextSizeStyles.h1}>Welcome to EthFundMe</h1>
        <p className='font-edium text-sm md:text-base'>
          Get started by creating an account.
        </p>
      </div>
      <AccountForm />
    </main>
  );
}
