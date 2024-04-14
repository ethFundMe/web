import useSWR from 'swr';

export default function useEthPrice() {
  const { data: ethPrice } = useSWR<number>(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
    async (url: string) => {
      const response = await fetch(url);
      const data = await response.json();
      return Number(data.ethereum.usd);
    },
    { refreshInterval: 30 * 1000, dedupingInterval: 30 * 1000 }
  );

  return ethPrice;
}
