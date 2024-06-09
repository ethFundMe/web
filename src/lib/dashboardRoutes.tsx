import { CheckCircle, PercentCircle } from 'lucide-react';
import { BiUser } from 'react-icons/bi';
import { FaEthereum } from 'react-icons/fa';
import { IoPencilOutline, IoTrashBin } from 'react-icons/io5';

export function getDashboardRoutes(address: `0x${string}`, verified: boolean) {
  const allLinks = [
    {
      link: `/dashboard/${address}`,
      title: 'My profile',
      icon: <BiUser />,
    },
    {
      link: `/dashboard/${address}/update-profile`,
      title: 'Update profile',
      icon: <IoPencilOutline />,
    },
    {
      link: `/dashboard/${address}/earnings`,
      title: 'Earnings',
      icon: <FaEthereum />,
    },
    {
      link: `/dashboard/${address}/creator-fee`,
      title: 'Creator fee',
      icon: <PercentCircle size={16} />,
    },
  ];

  const deleteAccount = {
    link: `/dashboard/${address}/delete-account`,
    title: 'Delete account',
    icon: <IoTrashBin />,
  };

  const verifyAccount = {
    link: `/dashboard/${address}/verify`,
    title: 'Get verified',
    icon: <CheckCircle size={16} />,
  };

  return verified
    ? [...allLinks, deleteAccount]
    : [...allLinks, verifyAccount, deleteAccount];
}
