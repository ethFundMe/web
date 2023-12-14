import { FaSearch } from 'react-icons/fa';

export const CampaignSearchForm = () => {
  return (
    <form className='hidden h-full w-full max-w-xs items-center overflow-hidden rounded-md border border-primary-default sm:flex '>
      <input
        type='text'
        className='flex-1 bg-transparent px-3 py-2 outline-0'
        placeholder='Search for campaigns'
      />

      <button className='h-full bg-primary-default px-2 text-white hover:bg-opacity-80 md:px-4'>
        <FaSearch />
      </button>
    </form>
  );
};
