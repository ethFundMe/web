import { Heading, PGroup } from '@/components/PrivacyPageComponents';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <div className='container max-w-screen-lg space-y-8 pb-20'>
        <div className='space-y-8'>
          <div className='my-16'>
            <h1 className='text-center text-[clamp(2rem,10vw,3.75rem)] font-bold leading-[1] md:text-6xl'>
              About Us
            </h1>
          </div>

          <div className='space-y-6'>
            <PGroup>
              <p>
                Welcome to{' '}
                <Link
                  className='text-primary-default'
                  href={process.env.NEXT_PUBLIC_WEB_URL}
                >
                  EthFundMe
                </Link>
                , where compassion clicks with blockchain! We&rsquo;re the
                trailblazing crowdfunding platform that blends community spirit
                with the cutting-edge efficiency of web3 technologies. Whether
                you&rsquo;re igniting a personal dream, backing a local project,
                or championing global causes, EthFundMe is your gateway to
                making a real impact. Jump into a world where every donation is
                a building block for a brighter future!
              </p>
            </PGroup>

            <PGroup>
              <Heading>Our Mission</Heading>
              <p>
                Our mission is to democratize the funding process, making it
                accessible to innovators and creators worldwide, regardless of
                their location or background. We harness the power of Ethereum
                to offer a platform that ensures security, transparency, and
                trust between project creators and their supporters.
              </p>
            </PGroup>

            <PGroup>
              <Heading>Our Vision</Heading>
              <p>
                We envision a world where every great idea has the opportunity
                to be realized. Through EthFundMe, we aim to break down the
                barriers to funding and empower individuals and communities to
                contribute to projects that can make a real difference.
              </p>
            </PGroup>

            <PGroup>
              <Heading>Why EthFundMe?</Heading>

              <ul className='space-y-2'>
                <li>
                  <b>Transparency: </b> Every transaction on EthFundMe is
                  recorded on the Ethereum blockchain, ensuring complete
                  transparency and trust in the funding process.
                </li>
                <li>
                  <b>Security: </b> Leveraging blockchain technology, we provide
                  a secure environment for both creators and supporters to
                  engage in funding activities.
                </li>

                <li>
                  <b>Global Access: </b> EthFundMe eliminates geographical
                  barriers, enabling creators from anywhere in the world to
                  connect with supporters globally.
                </li>

                <li>
                  <b>Community-Driven: </b> At the heart of EthFundMe is a
                  strong community of innovators, dreamers, and changemakers
                  committed to supporting each other&rsquo;s success.
                </li>
              </ul>
            </PGroup>

            <PGroup>
              <Heading>Core Values</Heading>

              <ul className='space-y-2'>
                <li>
                  <b>Innovation: </b> We constantly seek new ways to improve our
                  platform and the crowdfunding experience.
                </li>
                <li>
                  <b>Integrity: </b> Transparency and honesty guide all our
                  interactions and transactions.
                </li>
                <li>
                  <b>Community: </b> We believe in the power of community to
                  drive positive change and support meaningful projects.
                </li>
                <li>
                  <b>Empowerment: </b> We are committed to empowering creators
                  and giving them the tools they need to succeed.
                </li>
              </ul>
            </PGroup>

            <PGroup id='creator-fee'>
              <Heading>Creator Fee</Heading>

              <p>
                Creator fees are an integral part of EthFundMe, designed to
                incentivize individuals like you to create impactful campaigns
                that resonate with your audience. Creator fees provide a
                sustainable revenue model for individuals who dedicate their
                time and resources to promoting campaigns on our platform.
              </p>
            </PGroup>

            <PGroup>
              <Heading>Join Us</Heading>

              <div className='space-y-2'>
                <p>
                  Whether you are looking to bring your own project to life or
                  want to support others in their journey, EthFundMe offers a
                  unique opportunity to participate in a global movement of
                  innovation and community support. Join us in making a
                  difference, one project at a time.
                </p>

                <p>
                  For more information, visit our{' '}
                  <Link href='/#faqs' className='text-primary-default'>
                    FAQs
                  </Link>{' '}
                  page or contact us{' '}
                  <Link
                    href={`mailto:${process.env.NEXT_PUBLIC_EFM_EMAIL}`}
                    className='text-primary-default'
                  >
                    here
                  </Link>
                  .
                </p>
              </div>
            </PGroup>

            <div>
              <p>
                Together, we can build a future where every good idea has a
                chance to shine.
              </p>
              <p>
                <b>EthFundMe - Empowering Dreams, Fueling Change.</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
