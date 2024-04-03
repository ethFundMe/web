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
        <p>
          Welcome to EthFundMe! These Terms of Service (&ldquo;Terms&rdquo;)
          govern your access to and use of the EthFundMe platform and services
          (the &ldquo;Services&rdquo;). By accessing or using the Services, you
          agree to be bound by these Terms.
        </p>
      </PGroup>

      <PGroup>
        <Heading>1. ACCEPTANCE OF TERMS</Heading>
        <ol className='space-y-2'>
          <li>
            <b>Agreement:</b> By accessing or using the Services, you agree to
            be bound by these Terms and our Privacy Policy. If you do not agree
            to these Terms, you may not access or use the Services.
          </li>
          <li>
            <b>Changes:</b> EthFundMe may update or modify these Terms from time
            to time without prior notice. Your continued use of the Services
            after any changes constitutes your acceptance of the updated Terms.
          </li>
        </ol>
      </PGroup>

      <PGroup>
        <Heading>2. USE OF SERVICES</Heading>
        <ol className='space-y-2'>
          <li>
            <b>Eligibility:</b> You must be at least 18 years old to use the
            Services. By using the Services, you represent and warrant that you
            are of legal age and have the legal capacity to enter into these
            Terms. If you are under the age of majority in your jurisdiction
            (typically 18 or 19 years of age), you may use the Services, with or
            without registering, only with the approval of your parent or
            guardian.
          </li>
          <li>
            <b>User Accounts:</b> You may be required to create/verify an
            account to access certain features of the Services. You are
            responsible for maintaining the confidentiality of your account
            credentials and for any activities that occur under your account.
          </li>
          <li>
            <b>Prohibited Activities:</b> You agree not to engage in any of the
            following activities:
            <ol className='ml-4 mt-2 list-[lower-roman] space-y-2'>
              <li>Violating any laws or regulations;</li>
              <li>
                Impersonating any person or entity, or falsely stating or
                misrepresenting your affiliation with a person or entity;
              </li>
              <li>
                Interfering with or disrupting the operation of the Services;
              </li>
              <li>
                Attempting to gain unauthorized access to any part of the
                Services or bypassing security measures;
              </li>
              <li>
                Engaging in any fraudulent, deceptive, or unlawful conduct.
              </li>
            </ol>
          </li>
        </ol>
      </PGroup>

      <PGroup>
        <Heading>3. DONATIONS</Heading>
        <ol className='space-y-2'>
          <li>
            <b>General:</b> EthFundMe facilitates donations to charitable causes
            and projects. When you make a donation through the Services, you
            agree to the terms and conditions of the specific fundraising
            campaign.
          </li>
          <li>
            <b>Refunds:</b> Donations made through the Services are final and
            non-refundable, except as required by law or as stated in the
            fundraising campaign terms.
          </li>
          <li>
            <b>Payment Processing Fee:</b> When making a donation through our
            platform, please be aware that a payment processing fee of 2.9% may
            be applied. This fee covers the costs associated with payment
            processing services and is deducted from the donated amount before
            distribution to the campaign creator. Additionally, users may be
            required to pay gas fees associated with blockchain transactions,
            such as creating of campaigns, donations to campaigns, and the
            transfer of $FUNDME tokens. Gas fees vary based on network
            congestion and transaction complexity and are determined by the
            underlying blockchain protocol. Users are responsible for paying any
            applicable gas fees associated with their transactions.
          </li>
        </ol>
      </PGroup>

      <PGroup>
        <Heading>4. CONTENT</Heading>
        <ol className='space-y-2'>
          <li>
            <b>User Content:</b> You may submit content, including text, images,
            and other materials, to the Services (&ldquo;User Content&rdquo;).
            By submitting User Content, you grant EthFundMe a worldwide,
            non-exclusive, royalty-free, sublicensable license to use,
            reproduce, modify, adapt, publish, translate, distribute, and
            display the User Content.
          </li>
          <li>
            <b>Prohibited Content:</b> You agree not to submit any User Content
            that is unlawful, offensive, harmful, or violates the rights of
            others
          </li>
        </ol>
      </PGroup>

      <PGroup>
        <Heading>5. INTELLECTUAL PROPERTY</Heading>
        <ol className='space-y-2'>
          <li>
            <b>Ownership:</b> EthFundMe owns all rights, title, and interest in
            and to the Services, including all intellectual property rights.
          </li>
          <li>
            <b>Trademarks:</b> The EthFundMe name, logo, and other trademarks
            and service marks are the property of EthFundMe. You may not use
            these marks without our prior written consent.
          </li>
        </ol>
      </PGroup>

      <PGroup>
        <Heading>6. DISCLAIMER OF WARRANTIES</Heading>
        <p>
          THE SERVICES ARE PROVIDED ON AN &ldquo;AS-IS&rdquo; AND
          &ldquo;AS-AVAILABLE&rdquo; BASIS WITHOUT WARRANTIES OF ANY KIND.
          ETHFUNDME DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED,
          STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
          NON-INFRINGEMENT.
        </p>
      </PGroup>

      <PGroup>
        <Heading>7. LIMITATION OF LIABILITY</Heading>
        <p>
          IN NO EVENT SHALL ETHFUNDME BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
          SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, ARISING OUT OF OR IN
          CONNECTION WITH YOUR USE OF THE SERVICES, WHETHER BASED ON WARRANTY,
          CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY.
        </p>
      </PGroup>

      <PGroup>
        <Heading>8. INDEMNIFICATION</Heading>
        <p>
          You agree to indemnify, defend, and hold harmless EthFundMe and its
          affiliates, officers, directors, employees, and agents from any and
          all claims, liabilities, damages, losses, costs, or expenses,
          including reasonable attorneys&apos; fees, arising out of or in
          connection with your use of the Services or violation of these Terms.
        </p>
      </PGroup>

      <PGroup>
        <Heading>9. GOVERNING LAW</Heading>
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of Ghana, without regard to its conflict of law provisions.
        </p>
      </PGroup>

      <PGroup>
        <Heading>10. 3. MISCELLANEOUS</Heading>
        <ol className='space-y-2'>
          <li>
            <b>Severability:</b> If any provision of these Terms is found to be
            invalid or unenforceable, the remaining provisions shall remain in
            full force and effect.
          </li>
          <li>
            <b>Waiver:</b> The failure of EthFundMe to enforce any right or
            provision of these Terms shall not constitute a waiver of such right
            or provision.
          </li>
          <li>
            <b>Entire Agreement:</b> These Terms constitute the entire agreement
            between you and EthFundMe regarding the Services and supersede all
            prior or contemporaneous agreements and understandings
          </li>
        </ol>
      </PGroup>

      <PGroup>
        <Heading>11. CONTACT US</Heading>
        <p>
          If you have any questions, concerns, or feedback about these Terms,
          please contact us at{' '}
          <Link href='team@ethfund.me' className='text-primary-default'>
            team@ethfund.me
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
