'use client';

import { useRouter } from 'next/navigation';
import { FaEthereum } from 'react-icons/fa';
import { IoPencilOutline } from 'react-icons/io5';
import { LiaUserCogSolid } from 'react-icons/lia';
import { LuUnlink } from 'react-icons/lu';
import { useAccount, useDisconnect } from 'wagmi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const AuthNavbarMenu = ({ children }: { children: React.ReactNode }) => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const router = useRouter();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className='outline-0'>
          {children}
        </DropdownMenuTrigger>

        <DropdownMenuContent className='space-y-1.5 md:min-w-[200px]'>
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
            onClick={() => router.push(`/dashboard/${address}/earnings`)}
          >
            <FaEthereum />
            Earnings
          </DropdownMenuItem>

          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem
            className='flex items-center gap-2 text-red-500'
            onClick={() => disconnect()}
          >
            <LuUnlink />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
