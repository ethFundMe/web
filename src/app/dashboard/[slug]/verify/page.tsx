import { Container } from '@/components/Container';
import VerificationForm from '@/components/forms/VerificationForm';
import { TextSizeStyles } from '@/lib/styles';

export default function VerifyPage() {
  return (
    <div className='min-h-[calc(100dvh-269px)]'>
      <Container>
        <div className='pb-3 text-center sm:py-5'>
          <h1 className={TextSizeStyles.h1}>Apply For Verification</h1>
        </div>

        <VerificationForm />
      </Container>
    </div>
  );
}
