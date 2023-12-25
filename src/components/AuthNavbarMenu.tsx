'use client';

import { useRouter } from 'next/navigation';
import { IoPencilOutline } from 'react-icons/io5';
import { LiaUserCogSolid } from 'react-icons/lia';
import { LuUnlink } from 'react-icons/lu';
import { useAccount, useDisconnect } from 'wagmi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const AuthNavbarMenu = ({ children }: { children: React.ReactNode }) => {
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  const router = useRouter();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className=''>{children}</DropdownMenuTrigger>

        <DropdownMenuContent className=''>
          <DropdownMenuSeparator />
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
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='flex items-center gap-2'
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
