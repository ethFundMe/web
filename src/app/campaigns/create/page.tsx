import { Container } from '@/components/Container';
import CreateCampaignForm from '@/components/forms/ZodForm';
import { TextSizeStyles } from '@/lib/styles';

export default function CreateCampaignPage() {
  return (
    <>
      <Container className='pb-4 sm:pb-10'>
        <div className='pb-3 text-center sm:py-5'>
          <h1 className={TextSizeStyles.h1}>New Campaign</h1>
          <p className='font-edium text-lg'>
            Get started by filling out the form below
          </p>
        </div>

        {/* <CreateCampaignForm /> */}
        <CreateCampaignForm />
      </Container>
    </>
  );
}
