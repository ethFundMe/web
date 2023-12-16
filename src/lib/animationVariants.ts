import { Variants } from 'framer-motion';

export const CarouselVariants: Variants = {
  hiddenRight: {
    x: '100%',
    opacity: 0.8,
  },
  hiddenLeft: {
    x: '-100%',
    opacity: 0.8,
  },
  visible: {
    x: '0',
    opacity: 1,
    transition: {
      duration: 0.35,
    },
  },
  exitLeft: {
    opacity: 0.8,
    x: '-100%',
    position: 'absolute',
    transition: {
      duration: 0.3,
    },
  },
  exitRight: {
    x: '100%',
    opacity: 0,
    position: 'absolute',
    transition: {
      duration: 0.3,
    },
  },
};
