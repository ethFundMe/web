'use client';

import { useAccountModal, useChainModal } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/navigation';
import { FaEthereum } from 'react-icons/fa';
import { IoPencilOutline } from 'react-icons/io5';
import { LiaUserCogSolid } from 'react-icons/lia';
import { LuUnlink } from 'react-icons/lu';
import { useAccount } from 'wagmi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const AuthNavbarMenu = ({ children }: { children: React.ReactNode }) => {
  const { address } = useAccount();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();

  const router = useRouter();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className='outline-0'>
          {children}
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem
            className='flex items-center gap-2'
            onClick={() => router.push(`/dashboard/${address}`)}
          >
            <LiaUserCogSolid />
            Dashboard
          </DropdownMenuItem>

          <DropdownMenuItem
            className='flex items-center gap-2'
            onClick={() => router.push(`/dashboard/${address}/update-profile`)}
          >
            <IoPencilOutline />
            Update profile
          </DropdownMenuItem>

          <DropdownMenuItem
            className='flex items-center gap-2'
            onClick={openChainModal}
          >
            <FaEthereum />
            Switch network
          </DropdownMenuItem>

          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem
            className='flex items-center gap-2'
            onClick={openAccountModal}
          >
            <LuUnlink />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
