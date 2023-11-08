import { Container } from '@/components/Container';
import CreateCampaignForm from '@/components/forms/CreateCampaignForm';
import { TextSizeStyles } from '@/lib/styles';

export default function CreateCampaignPage() {
  return (
    <Container className='py-5'>
      <div className='text-center'>
        <h1 className={TextSizeStyles.h1}>Create campaign</h1>
        <p className='text-lg font-medium'>
          Get started by filling out the form below
        </p>
      </div>

      <CreateCampaignForm />
    </Container>
  );
}
