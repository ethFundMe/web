import { Heading, PGroup } from '@/components/PrivacyPageComponents';
import Link from 'next/link';

export default function TermsAndConditionsPage() {
  return (
    <div className='container max-w-screen-lg space-y-8 pb-20'>
      <div className='my-16'>
        <h1 className='text-center text-[clamp(2rem,10vw,3.75rem)] font-bold leading-[1] md:text-6xl'>
          Terms and Conditions
        </h1>
      </div>

      <PGroup>
        <Heading>1. ACCEPTANCE OF TERMS</Heading>
        <p>
          By accessing or using the EthFundMe, you agree to be bound by these
          Terms. If you do not agree to these Terms, please do not use the App.
        </p>
      </PGroup>

      <PGroup>
        <Heading>2. DESCRIPTION OF APP</Heading>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis
          praesentium nobis doloribus quam eaque, repudiandae asperiores
          possimus nesciunt, a iure accusantium distinctio quis commodi
          voluptatem et reiciendis quas. Repellendus, iste!
        </p>
      </PGroup>

      <PGroup>
        <Heading>3. ELIGIBILITY</Heading>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo
          dolore corrupti tempora consectetur, dolorum ipsam, nihil molestiae,
          labore laboriosam accusantium vel repudiandae repellat saepe aut.
        </p>
      </PGroup>

      <PGroup>
        <Heading>4. REGISTRATION</Heading>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam eum
          officiis necessitatibus atque fugiat, expedita molestiae voluptas
          reiciendis doloribus, veniam illo quas repudiandae facere cumque
          libero tempora magni. Eligendi, quidem!
        </p>
      </PGroup>

      <PGroup>
        <Heading>5. USE OF APP</Heading>

        <ol className='ml-4 list-[lower-alpha] space-y-4'>
          <li>
            <span>Aque delectus? Nobis, consequatur doloremque.</span>
            <ol className='ml-4 mt-2 list-[lower-roman] space-y-2'>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolorem, aspernatur.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis enim optio amet corporis deleniti fugit omnis eum
                quae porro consequuntur ex, maiores doloremque, labore dolor quo
                rerum rem veritatis voluptatibus!
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Suscipit provident dignissimos obcaecati necessitatibus sed
              </li>
            </ol>
          </li>

          <li>
            <span>
              Employers using the App must adhere to the following code of
              conduct
            </span>
            <ol className='ml-4 mt-2 list-[lower-roman] space-y-2'>
              <li>Daddy Zaddy or orem ipsum dolor sit amet consectetur.</li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error.
              </li>
              <li>
                Consectetur adipisicing elit. Eveniet, unde! Lorem ipsum dolor
                sit amet
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error.
              </li>
            </ol>
          </li>
        </ol>
      </PGroup>

      <PGroup>
        <Heading>6. USE OF CONTENT</Heading>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non optio,
          aperiam ratione nostrum velit explicabo ex illum omnis alias expedita
          ipsam ipsa assumenda similique laudantium fuga porro? Esse, magni
          amet!
        </p>
      </PGroup>

      <PGroup>
        <Heading>7. PRIVACY</Heading>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde!
          <Link href='/legal/privacy-policy' className='text-primary-default'>
            Privacy Policy page.{' '}
          </Link>
          By using the App, you consent to the collection, use, and sharing of
          your information as described in the Privacy Policy.
        </p>
      </PGroup>

      <PGroup>
        <Heading>13. CONTACT US</Heading>
        <p>
          If you have any questions or concerns about these Terms, please
          contact us at{' '}
          <Link
            href='mailto:contact@ethfundme.com'
            className='text-primary-default'
          >
            contact@ethfundme.com
          </Link>
        </p>
      </PGroup>

      <PGroup>
        By using the EthFundMe, you acknowledge that you have read, understood,
        and agree to be bound by these Terms and Conditions.
      </PGroup>

      <PGroup>Thank you for using EthFundMe!</PGroup>
    </div>
  );
}
