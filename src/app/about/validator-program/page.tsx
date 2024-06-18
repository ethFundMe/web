import { Heading, PGroup } from '@/components/PrivacyPageComponents';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Validator Program | EthFundMe',
  description:
    'Welcome to the EthFundMe Validator Incentive Program, an innovative system designed to engage our community in the essential task of platform monitoring and timely interaction. This high-level overview introduces the core concept of the program and outlines how you can participate and earn rewards through vigilant platform engagement',
};

export default function ValidatorProgramPage() {
  return (
    <div className='container max-w-screen-lg space-y-8 pb-20'>
      <div className='my-16'>
        <h1 className='text-center text-[clamp(2rem,10vw,3.75rem)] font-bold leading-[1] md:text-6xl'>
          Validator Program
        </h1>
      </div>

      <PGroup>
        <Heading>Overview of the Validator Incentive Program</Heading>
        <p>
          Welcome to the{' '}
          <span className='text-primary-default'>
            EthFundMe Validator Incentive Program
          </span>
          , an innovative system designed to engage our community in the
          essential task of platform monitoring and timely interaction. This
          high-level overview introduces the core concept of the program and
          outlines how you can participate and earn rewards through vigilant
          platform engagement.
        </p>
      </PGroup>

      <PGroup>
        <Heading>Program Essence</Heading>
        <p>
          At the heart of the EthFundMe platform is a dynamic system that relies
          on timely updates to maintain optimal functionality. The Validator
          Incentive Program is crafted to encourage and reward community members
          who assist in these critical updates. Participation is straightforward
          yet requires attentiveness and prompt action.
        </p>
      </PGroup>

      <PGroup>
        <Heading>Key Participation Concept</Heading>

        <ul className='space-y-2'>
          <li>
            <b>Timely Interaction: </b>
            The essence of your role as a participant involves monitoring a
            specific timer within our platform. Once this timer reaches zero, an
            opportunity to act is presented.
          </li>

          <li>
            <b>Exclusive Reward: </b>
            The opportunity to earn a reward is exclusive to the first
            participant who successfully interacts with the system immediately
            after the timer expires. This creates a competitive yet rewarding
            environment.
          </li>
        </ul>
      </PGroup>

      <PGroup>
        <Heading>Understanding the Rewards</Heading>
        <Heading>Earning Mechanism</Heading>

        <p>
          <b>First to Act, First to Earn: </b> The program is designed such that
          only the first participant to respond once the timer hits zero is
          rewarded. This incentivizes quick and attentive participation.
        </p>
      </PGroup>

      <PGroup>
        <Heading>Reward Distribution</Heading>
        <p>
          <b>Direct Allocation: </b> Rewards are directly allocated to the
          successful participant&rsquo;s account, ensuring immediate and
          transparent compensation for their contribution.
        </p>
      </PGroup>

      <PGroup>
        <Heading>Participation Benefits</Heading>

        <ul className='space-y-2'>
          <li>
            <b>Direct Impact:</b>
            Your timely actions directly contribute to the platform&rsquo;s
            efficiency and operational integrity.
          </li>
          <li>
            <b>Rewarding Engagement:</b>
            Beyond contributing to the platform&rsquo;s success, you have the
            opportunity to earn rewards, making your engagement not only
            beneficial to the platform but also personally rewarding.
          </li>

          <li>
            <b></b>
          </li>
        </ul>
      </PGroup>

      <PGroup>
        <Heading>Getting Involved</Heading>
        <p>
          Participation requires no technical knowledge or previous experience.
          The program is designed to be accessible to all community members who
          are eager to contribute actively. Keep an eye on the platform for the
          timer, and be ready to act when it reaches zero.
        </p>
      </PGroup>

      <PGroup>
        <Heading>Conclusion</Heading>

        <div className='space-y-2'>
          <p>
            The Validator Incentive Program is a critical component of the
            EthFundMe ecosystem, designed to ensure the platform&rsquo;s smooth
            operation through community engagement. By participating, you not
            only have the chance to earn rewards but also play a pivotal role in
            the platform&rsquo;s ongoing success.
          </p>

          <p>
            We invite all community members to take part in this program,
            contributing to our shared goal of maintaining a robust and
            efficient platform. Your vigilance and quick action are highly
            valued and rewarded here at EthFundMe.
          </p>
        </div>
      </PGroup>
    </div>
  );
}
