import { Container } from '@/components/Container';
import { HomepageHeader } from '@/components/HomepageHeader';

export default function Home() {
  return (
    <div>
      <HomepageHeader />

      <Container className='space-y-10 py-10'>
        {Array.from({ length: 6 }).map((_, idx) => (
          <p key={idx}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque est
            quibusdam ipsam! Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Culpa enim unde qui quas temporibus hic repudiandae distinctio
            sequi obcaecati, voluptatibus exercitationem veniam minus porro
            totam itaque nihil. Eos, ut sit. Non quas aliquid alias obcaecati
            impedit tenetur ipsam sit assumenda, blanditiis animi vitae unde.
            Quasi placeat doloremque asperiores!
          </p>
        ))}
      </Container>
    </div>
  );
}
