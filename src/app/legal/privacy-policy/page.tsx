import { Heading, PGroup } from '@/components/PrivacyPageComponents';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className='container max-w-screen-lg space-y-8 pb-20'>
      <div className='my-16'>
        <h1 className='text-center text-[clamp(2rem,10vw,3.75rem)] font-bold leading-[1] md:text-6xl'>
          Privacy Policy
        </h1>
      </div>

      <PGroup>
        <Heading>INTRODUCTION</Heading>
        <p>
          EthFundMe (&ldquo;We&rdquo; &ldquo;our&rdquo; or &ldquo;us&rdquo;) is
          committed to protecting the privacy and security of your personal
          information. This Privacy Policy outlines how we collect, use,
          disclose, and protect the information you provide to us through our
          website, mobile application, and related services (collectively, the
          &ldquo;Services&rdquo;).
        </p>
      </PGroup>

      <PGroup>
        <Heading>INFORMATION WE COLLECT</Heading>

        <ol className='space-y-2'>
          <li>
            <b>Personal Information:</b> When you use our Services, we may
            collect personal information such as your name, email address,
            mailing address, and phone number.
          </li>
          <li>
            <b>Transactional Information:</b> We collect information related to
            your transactions on our platform, including donation amounts,
            cryptocurrency wallet addresses, and transaction histories.
          </li>
          <li>
            <b>Device Information:</b> We may collect information about the
            device you use to access our Services, including IP address, browser
            type, operating system, and device identifiers.
          </li>
          <li>
            <b>Usage Information:</b> We may gather data about how you interact
            with our Services, such as the pages you visit, the features you
            use, and the actions you take.
          </li>
        </ol>
      </PGroup>

      <PGroup>
        <Heading>HOW WE USE YOUR INFORMATION</Heading>
        <ol className='space-y-2'>
          <li>
            <b>Provide and Improve Services:</b> We use your information to
            deliver, maintain, and enhance our Services, including processing
            donations, verifying transactions, and improving user experience.
          </li>
          <li>
            <b>Communications:</b> We may send you service-related
            communications, such as transaction confirmations, account
            notifications, and updates about our Services.
          </li>
          <li>
            <b>Marketing:</b> With your consent, we may send you promotional
            communications about our products, services, and features. You can
            opt-out of these communications at any time.
          </li>
          <li>
            <b>Security:</b> We use your information to maintain the security
            and integrity of our platform, detect and prevent fraud, and protect
            against unauthorized access.
          </li>
          <li>
            <b>Tokens:</b> We may collect and process information related to
            $FUNDME tokens distributed to individuals and/or organizations who
            create campaigns on our platform, as well as to
            individuals/organizations who donate. This may include transactional
            data, wallet addresses, and distribution history.
          </li>
        </ol>
      </PGroup>

      <PGroup>
        <Heading>HOW WE SHARE YOUR INFORMATION</Heading>
        <ol className='space-y-2'>
          <li>
            <b>Service Providers:</b> We may share your information with
            third-party service providers who assist us in operating our
            platform, processing payments, and delivering services.
          </li>
          <li>
            <b>Legal Compliance:</b> We may disclose your information to comply
            with applicable laws, regulations, legal processes, or government
            requests.
          </li>
          <li>
            <b>Device Information:</b> If EthFundMe is involved in a merger,
            acquisition, or sale of assets, your information may be transferred
            as part of the transaction.
          </li>
        </ol>
      </PGroup>

      <PGroup>
        <Heading>YOUR CHOICES</Heading>
        <ol className='space-y-2'>
          <li>
            <b>Opt-Out:</b> You can opt-out of receiving promotional
            communications from us by following the instructions provided in the
            communication or contacting us directly.
          </li>
          <li>
            <b>Account Information:</b> You can review and update your account
            information by logging into your EthFundMe account settings.
          </li>
        </ol>
      </PGroup>

      <PGroup>
        <Heading>DATA SECURITY</Heading>
        <p>
          We implement technical and organizational measures to safeguard the
          confidentiality, integrity, and availability of your information.
          However, no method of transmission over the internet or electronic
          storage is 100% secure, and we cannot guarantee absolute security.
        </p>
      </PGroup>

      <PGroup>
        <Heading>INTERNATIONAL TRANSFERS</Heading>
        <p>
          Your information may be transferred to and processed in countries
          other than your own, where data protection laws may differ. By using
          our Services, you consent to the transfer of your information to these
          countries.
        </p>
      </PGroup>

      <PGroup>
        <Heading>CHILDREN&apos;S PRIVACY</Heading>
        <p>
          Our Services are not intended for individuals under the age of 18. We
          do not knowingly collect personal information from children. If you
          believe that we have inadvertently collected information from a child,
          please contact us immediately.
        </p>
      </PGroup>

      <PGroup>
        <Heading>UPDATES TO THIS PRIVACY POLICY</Heading>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or legal requirements. We will notify you of any
          material changes by posting the updated policy on our website or
          through other appropriate channels.
        </p>
      </PGroup>

      <PGroup>
        <Heading>UPDATE TO PRIVACY POLICY</Heading>
        <p>
          This Privacy Policy may be updated to reflect changes in our practices
          or legal requirements. We encourage you to review it periodically.
          Continued use of our services implies acceptance of any changes made.
        </p>
      </PGroup>

      <PGroup>
        <Heading>CONTACT US</Heading>
        <p>
          If you have any questions, concerns, or complaints about this Privacy
          Policy or our data practices, please contact us at{' '}
          <Link
            href={`mailto:${process.env.NEXT_PUBLIC_EFM_EMAIL}`}
            className='text-primary-default'
          >
            ethfundme@gmail.com
          </Link>{' '}
          or via our{' '}
          <Link
            href='https://discord.gg/9kac2FFMWe'
            className='text-primary-default'
          >
            Discord
          </Link>
        </p>
      </PGroup>
    </div>
  );
}
