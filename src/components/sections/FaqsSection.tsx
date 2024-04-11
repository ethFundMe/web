import { FAQS } from '@/lib/constants';
import { TextSizeStyles } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { Container } from '../Container';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

export const FaqsSection = () => {
  return (
    <section>
      <Container className='space-y-5 py-10 lg:py-20'>
        <div className='py-5 text-center'>
          <h2 className={TextSizeStyles.h2}>Frequently Asked Questions</h2>
          <p className='text-lg'>
            You may share the following concerns about using EthFundMe
          </p>
        </div>

        <Accordion
          type='single'
          collapsible
          className='mx-auto w-full max-w-4xl rounded-md'
        >
          {FAQS.map((item, idx) => (
            <FaqTab key={idx} {...item} checked={!!(idx % 2)} />
          ))}
        </Accordion>
      </Container>
    </section>
  );
};

const FaqTab = ({
  question,
  answer,
  checked = false,
}: {
  question: string;
  answer: string;
  checked?: boolean;
}) => (
  <AccordionItem value={question}>
    <AccordionTrigger className='bg-[var(--theme)] [&:nth-child(even)]:bg-[red]'>
      {question}
    </AccordionTrigger>
    <AccordionContent className={cn(checked && 'bg-blue-300')}>
      {answer}
    </AccordionContent>
  </AccordionItem>
);
