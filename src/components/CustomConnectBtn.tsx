'use client';

import {
  useAccountModal,
  useChainModal,
  useConnectModal,
} from '@rainbow-me/rainbowkit';
import { Button } from './ui/button';

export default function CustomConnectBtn() {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();

  // const ready = mounted && authenticationStatus !== 'loading';
  // const connected =
  //   ready &&
  //   account &&
  //   chain &&
  //   (!authenticationStatus || authenticationStatus === 'authenticated');

  return (
    <>
      <Button onClick={openConnectModal}>Connect Wallet</Button>
      <Button onClick={openAccountModal}>Open Account</Button>
      <Button onClick={openChainModal}>Open Chain</Button>
    </>
  );
}
