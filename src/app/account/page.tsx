import Navbar from '@/components/Navbar';
import { AccountForm } from '@/components/forms';
import { TextSizeStyles } from '@/lib/styles';

export default function Account() {
  return (
    <div className='flex min-h-[calc(100dvh-269px)] flex-col'>
      <Navbar />

      <main className='flex-1'>
        <div className='my-4 py-5 text-center md:py-0'>
          <h1 className={TextSizeStyles.h1}>Welcome to EthFundMe</h1>
          <p className='font-edium text-sm md:text-base'>
            Get started by creating an account.
          </p>
        </div>
        <AccountForm />
      </main>
    </div>
  );
}
