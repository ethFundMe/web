import { BiUser } from 'react-icons/bi';
import { FaCheckCircle, FaEthereum } from 'react-icons/fa';
import { IoPencilOutline, IoTrashBin } from 'react-icons/io5';
import { RiPercentFill } from 'react-icons/ri';

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
      icon: <RiPercentFill />,
    },
  ];

  const deleteAccount = {
    link: `/dashboard/${address}/delete-account`,
    title: 'Delete account',
    icon: <IoTrashBin className='text-rose-500' />,
  };

  const verifyAccount = {
    link: `/dashboard/${address}/verify`,
    title: 'Get verified',
    icon: <FaCheckCircle className='text-primary-default' />,
  };

  return verified
    ? [...allLinks, deleteAccount]
    : [...allLinks, verifyAccount, deleteAccount];
}
