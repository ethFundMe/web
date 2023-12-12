import { Container } from '@/components/Container';
import { TextSizeStyles } from '@/lib/styles';

export default function CampaignOrganizerPage() {
  return (
    <Container>
      <h1 className={TextSizeStyles.h2}>Campaign Organizer Page</h1>

      <div className='mt-4 space-y-4'>
        {Array.from({ length: 4 }).map((_, idx) => (
          <p key={idx}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae
            excepturi sequi, distinctio iure aperiam quod corporis unde
            dignissimos fugiat minima tempora! Itaque, repudiandae, veritatis
            voluptate cum ea, et fuga voluptates minus nobis ratione fugit
            aspernatur quibusdam a assumenda minima? Unde nulla beatae,
            cupiditate nemo earum fugiat et exercitationem accusantium facere
            aut, modi enim est aspernatur molestias totam necessitatibus.
            Inventore ad nisi suscipit minus ut consequatur beatae hic, porro,
            laborum error voluptate libero rem in vitae quidem aliquam autem
            eum! Odio iste reiciendis dolorum consequatur quibusdam nulla animi
            dicta provident, ex quae adipisci possimus officia maxime voluptatem
            nemo, nobis in sapiente.
          </p>
        ))}
      </div>
    </Container>
  );
}
