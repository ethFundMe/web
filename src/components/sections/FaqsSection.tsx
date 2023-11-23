import { FAQS } from '@/lib/constants';
import { TextSizeStyles } from '@/lib/styles';
import { Container } from '../Container';

export const FaqsSection = () => {
  return (
    <section>
      <Container className='space-y-5 py-10'>
        <div className='py-5 text-center'>
          <h2 className={TextSizeStyles.h2}>Frequently Asked Questions</h2>
          <p className='font-edium text-lg'>
            You may share the following concerns on using EthFundMe
          </p>
        </div>

        <section className='accordion accordion--radio mx-auto max-w-3xl'>
          {FAQS.map((item, idx) => (
            <FaqTab key={idx} {...item} checked={!!(idx === 0)} />
          ))}

          <div className='tab'>
            <input type='radio' name='accordion-2' id='close' />
            <label htmlFor='close' className='tab__close'>
              Close open tab &times;
            </label>
          </div>
        </section>
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
  <div className='tab'>
    <input
      type='radio'
      name='accordion-2'
      defaultChecked={checked}
      id={question}
    />
    <label htmlFor={question} className='tab__label'>
      {question}
    </label>
    <div className='tab__content'>
      <p>{answer}</p>
    </div>
  </div>
);
