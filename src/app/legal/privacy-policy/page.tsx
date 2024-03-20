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
        <Heading>WHO ARE WE?</Heading>
        <p>
          EthFundMe is a platform Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. In obcaecati recusandae omnis asperiores cum, qui
          ducimus non nisi deleniti maxime possimus voluptatem illum eveniet
          magnam. Quam laboriosam exercitationem iste deserunt!
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste cumque
          at debitis libero cum earum blanditiis? Ipsam temporibus, expedita
          obcaecati voluptas rerum eos nihil reiciendis delectus illum, maxime
          animi neque?
        </p>
      </PGroup>

      <PGroup>
        <Heading>DATA USAGE</Heading>

        <ol className='space-y-2'>
          <li>
            <b>Verification:</b> To verify user identities and ensure the
            legitimacy of accounts.
          </li>
          <li>
            <b>Credit Checks:</b> In cases where financial transactions or
            credit-related services are involved, we may conduct credit checks
            to assess creditworthiness.
          </li>
          <li>
            <b>Monitor and improve services:</b> Analyzing user data helps us
            understand how our platform is used and allows us to enhance and
            optimize our services.
          </li>
          <li>
            <b>Marketing:</b> With your consent, we may use your data for
            marketing purposes to provide relevant information about our
            services and promotions.
          </li>
          <li>
            <b>Customer Services:</b> To provide effective customer support and
            address any inquiries or issues you may have.
          </li>
          <li>
            <b>Compliances:</b> To comply with legal and regulatory
            requirements, including anti-money laundering (AML) and
            know-your-customer (KYC) regulations.
          </li>
        </ol>
      </PGroup>

      <PGroup>
        <Heading>DATA COLLECTION FOR PROFILING</Heading>
        <p>
          We may collect data for user profiling to enhance your experience on
          our platform. This may include preferences, usage patterns, and
          interactions with our services. Profiling helps us tailor our
          offerings to better meet your needs and interests.
        </p>
      </PGroup>

      <PGroup>
        <Heading>SECURITY MEASURES</Heading>
        <p>
          Ensuring the security of your data is our top priority. We implement
          advanced security measures, including encryption, firewalls, and
          access controls, to safeguard your information against unauthorized
          access or misuse.
        </p>
      </PGroup>

      <PGroup>
        <Heading>BUSINESS VERIFICATION</Heading>
        <p>
          In certain instances, we may collect and verify business information
          to maintain a secure and trustworthy environment for our users.
        </p>
      </PGroup>

      <PGroup>
        <Heading>SUPPORT LINE</Heading>
        <p>
          Our support team is dedicated to assisting you. For security purposes,
          we may request specific information to verify your identity before
          providing assistance.
        </p>
      </PGroup>

      <PGroup>
        <Heading>PERSONAL DATA PROTECTION</Heading>
        <p>
          Your personal data is treated with the utmost confidentiality. We do
          not sell or share your personal information with third parties without
          your explicit consent.
        </p>
      </PGroup>

      <PGroup>
        <Heading>FINANCIAL DATA SECURITY</Heading>
        <p>
          For financial transactions, we employ stringent security measures to
          protect your financial data. This includes encryption and compliance
          with industry standards.
        </p>
      </PGroup>

      <PGroup>
        <Heading>ETHICAL PRACTICES</Heading>
        <p>
          Hustlebean is committed to ethical business practices. We do not
          engage in unethical data collection or usage. Our policies align with
          legal and regulatory requirements.
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
        <Heading>CONTACT INFORMATION</Heading>
        <p>
          If you have any questions or concerns regarding our Privacy Policy,
          please contact us at{' '}
          <Link
            href='mailto:contact@ethfundme.com'
            className='text-primary-default'
          >
            contact@ethfundme.com
          </Link>{' '}
          or visit our website at{' '}
          <Link
            href='http://www.ethfundme.com'
            className='text-primary-default'
          >
            www.ethfundme.com
          </Link>
        </p>
      </PGroup>

      <PGroup>
        Thank you for choosing EthFundMe. We are committed to protecting your
        privacy and ensuring the security of your information. This Privacy
        Policy outlines the principles and practices we follow to safeguard your
        personal and financial data. By using our services, you agree to the
        terms outlined below.
      </PGroup>

      <PGroup>
        We respect your right to privacy; it is very important to us, and we
        take the protection of your privacy and ensuring the security of your
        Personal Data very seriously. We are committed to the fair and
        transparent Processing of your Personal Data. This Privacy Notice
        describes how we Process your Personal Data, explains your rights in
        relation to the Personal Data we Process, and states our commitment when
        Processing your Personal Data in a compliant, ethical, and secure
        manner.
      </PGroup>
    </div>
  );
}
