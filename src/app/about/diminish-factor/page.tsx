import { Heading, PGroup } from '@/components/PrivacyPageComponents';

export default function DiminishFactorPage() {
  return (
    <div className='container max-w-screen-lg space-y-8 pb-20'>
      <div className='my-16'>
        <h1 className='text-center text-[clamp(2rem,10vw,3.75rem)] font-bold leading-[1] md:text-6xl'>
          Diminish Factor (DF){' '}
        </h1>
      </div>

      <PGroup>
        <Heading>Introduction</Heading>

        <p>
          The Diminish Factor (DF) is a critical component of the EthFundMe
          platform, designed to dynamically adjust rewards and token
          distributions over time. EthFundMe is a decentralized crowdfunding
          platform built on blockchain technology, aiming to empower creators
          and funders alike. The DF mechanism ensures a fair and sustainable
          distribution of rewards to platform participants.
        </p>
      </PGroup>

      <PGroup>
        <Heading>Purpose</Heading>

        <div className='space-y-2'>
          <p>
            The primary purpose of the Diminish Factor (DF) is to regulate the
            rate at which rewards diminish over time within the EthFundMe
            ecosystem. It serves to gradually reduce the value of rewards and
            token distributions, reflecting the diminishing value of the FUNDME
            tokens on the platform. By implementing the DF mechanism, EthFundMe
            aims to achieve the following objective:
          </p>

          <p>
            Economic Sustainability: DF promotes economic sustainability by
            adjusting rewards in line with the changing dynamics of the
            platform. By gradually reducing rewards, EthFundMe can manage token
            inflation and maintain a healthy token economy, fostering long-term
            viability.
          </p>
        </div>
      </PGroup>

      <PGroup>
        <Heading>Implementation</Heading>
        <Heading>DF Parameters</Heading>

        <ul className='space-y-2'>
          <li>
            <b>DIMINISH_FACTOR: </b>
            The base diminish factor value, initialized to 100.
          </li>

          <li>
            <b>DF_NEXT_UPDATE:</b>
            Timestamp indicating the next scheduled update for the diminish
            factor.
          </li>

          <li>
            <b>DF_INTERVAL: </b>
            Time interval between successive updates of the diminish factor,
            initially set to 100 days.
          </li>
        </ul>
      </PGroup>

      <PGroup>
        <Heading>DF Update Mechanism</Heading>
        <p>The DF mechanism operates based on a scheduled update mechanism:</p>

        <ul className='space-y-2'>
          <li>
            <b>Initialization: </b>
            The DF mechanism initializes with a base value (DIMINISH_FACTOR) and
            sets the next update time (DF_NEXT_UPDATE) based on the defined
            interval (DF_INTERVAL).
          </li>

          <li>
            <b>Update Trigger: </b>
            Upon calling the diminish() function, the contract checks whether
            it&rsquo;s time for a DF update. If the current timestamp exceeds
            the next update time, the DF is updated, and rewards are adjusted
            accordingly. The caller of this function is rewarded before halving.
          </li>

          <li>
            <b>Diminishing Effect: </b>
            The DF diminishes over time by halving its value with each update.
            This gradual reduction ensures a smooth transition in reward
            distributions and token allocations.
          </li>
        </ul>
      </PGroup>

      <PGroup>
        <Heading>Usage in Calculations</Heading>

        <p>
          The DF is used in various calculations throughout the EthFundMe
          platform:
        </p>

        <ul className='space-y-2'>
          <li>
            <b>Reward Calculation: </b>
            When determining rewards for platform activities, such as funding
            campaigns or creating campaigns, the DF is applied to adjust the
            reward amount. The reward calculation typically involves multiplying
            the base reward by the current diminish factor.
          </li>

          <li>
            <b>Token Distribution: </b>
            Rewards calculated using the diminish factor are distributed to
            platform participants in the form of FUNDME tokens. The number of
            tokens received by users is directly influenced by the current DF
            value.
          </li>
        </ul>
      </PGroup>

      <PGroup>
        <Heading>Administrative Functions</Heading>

        <p>
          EthFundMe provides administrative functions to manage the DF
          mechanism:
        </p>

        <p>
          updateDFInterval(uint256 _seconds): This function allows authorized
          administrators to update the interval at which the diminish factor is
          adjusted. By specifying a new time interval in seconds, administrators
          can dynamically control the frequency of DF updates, adapting to
          changing platform dynamics.
        </p>
      </PGroup>
    </div>
  );
}
