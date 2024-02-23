import { BiUser } from 'react-icons/bi';
import { FaEthereum } from 'react-icons/fa';
import { IoPencilOutline, IoTrashBin } from 'react-icons/io5';

export function getDashboardRoutes(address: `0x${string}`) {
  return [
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
      link: `/dashboard/${address}/delete-account`,
      title: 'Delete account',
      icon: <IoTrashBin />,
    },
  ];
}
