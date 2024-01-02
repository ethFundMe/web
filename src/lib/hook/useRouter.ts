// useRouter.ts

import { useRouter as useBaseRouter } from 'next/navigation';
import NProgress from 'nprogress';

export function usePRouter() {
  const router = useBaseRouter();

  const { push } = router;

  router.push = async (...args: Parameters<typeof push>) => {
    NProgress.start();
    return push(...args);
  };

  return router;
}
