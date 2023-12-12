import { CampaignCard } from '@/components/CampaignCard';
import { Container } from '@/components/Container';
import DonateXShareButtons from '@/components/DonateXShareButtons';
import { GET_CAMPAIGNS } from '@/lib/queries';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { DonationObjectiveIndicator } from '../DonationObjectiveIndicator';

export default async function CampaignPage() {
  const campaigns = await GET_CAMPAIGNS();

  return (
    <>
      <Container className='relative grid grid-cols-1 gap-4 sm:gap-8 lg:grid-cols-3 lg:items-start'>
        <div className='space-y-4 md:col-span-2'>
          <h2 className={cn(TextSizeStyles.h4, 'leading-tight')}>
            Save Somali Refugees From Abject Poverty
          </h2>

          <Image
            className='h-80 w-full object-cover sm:h-96 lg:h-[450px]'
            src='/images/homepage-header1.jpg'
            width={500}
            height={400}
            alt='...'
          />

          <div className='space-y-7 pb-5'>
            <div className='flex flex-col items-center gap-4 sm:flex-row'>
              <DonationObjectiveIndicator
                seekingAmount={20}
                currentAmount={20}
              />

              <button className='w-full flex-1 rounded-md bg-primary px-4 py-2 text-white hover:bg-opacity-90 md:w-fit md:px-5 md:py-3'>
                Donate
              </button>
            </div>

            <div className='flex flex-col-reverse justify-between gap-2 sm:flex-row sm:items-center md:gap-4'>
              <Link
                href='/campaigns/organizers/1'
                className='mt-2 flex w-full cursor-pointer items-center gap-4 rounded-md bg-slate-100 p-3 hover:bg-slate-200 sm:w-fit'
              >
                <Image
                  src='/images/Logo-Virgin.png'
                  className='flex-shrink-0 rounded-full bg-white'
                  width={50}
                  height={50}
                  alt='...'
                />

                <div>
                  <p className={TextSizeStyles.caption}>Campaign Organizer</p>
                  <p className='font-semibold'>CLET For Africa Foundation</p>
                </div>
              </Link>

              <div>
                <p className={TextSizeStyles.caption}>Organized On:</p>
                <p className='font-semibold'>29th October, 2023</p>
              </div>
            </div>

            <div className='space-y-4'>
              <div>
                <h3 className='font-bold'>Our goal</h3>
                <p className=''>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Vitae maiores nemo necessitatibus laboriosam doloremque rerum
                  repellat esse deserunt illum, accusamus, atque neque voluptate
                  dolor ab, aut ipsa quaerat nisi sapiente. Amet consectetur
                  adipisicing elit. Odit quod, quibusdam velit voluptas non
                  minima a nihil, ex, accusamus exercitationem est consectetur
                  doloribus. Error magni explicabo incidunt officiis dolorem!
                  Nesciunt?
                </p>
              </div>

              <div>
                <h3 className='font-bold'>Why we care</h3>
                <p className=''>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Expedita cumque voluptatum asperiores facilis atque error id?
                  Facere laudantium nihil impedit culpa molestias, voluptate,
                  repudiandae officiis sed earum possimus ea fuga mollitia
                  nostrum sit non? Nemo ut molestiae sint id optio dolores
                  voluptatum accusantium?
                </p>

                <p>
                  Sit commodi ut architecto vel labore nobis vero in assumenda
                  rem nulla! Dicta, voluptatibus enim amet doloremque rerum
                  laudantium officiis omnis, nulla voluptatem delectus
                  distinctio! Voluptate animi quam consequuntur, enim laborum
                  doloremque, molestias nemo nulla vel dignissimos maxime. Sed
                  temporibus commodi expedita veritatis esse sit, similique
                  facilis illo, necessitatibus ab dolores ipsa. Eum quae
                  exercitationem facere quas!
                </p>
              </div>

              <div>
                <h3 className='font-bold'>Impact Statement</h3>
                <p className=''>
                  amet consectetur adipisicing elit. Odit quod, quibusdam velit
                  voluptas non minima a nihil, ex, accusamus exercitationem est
                  consectetur doloribus. Error magni explicabo incidunt officiis
                  dolorem! Nesciunt?
                </p>
              </div>
            </div>

            <DonateXShareButtons />
          </div>
        </div>

        <aside className='space-y-4 pb-4'>
          <h2 className={TextSizeStyles.h6}>Close to their goal</h2>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1'>
            {campaigns.slice(0, 3).map((_, idx) => (
              <CampaignCard campaign={_} key={idx} />
            ))}
          </div>
        </aside>
      </Container>
    </>
  );
}
