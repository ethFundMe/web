'use client';

import { handleIPFSPush } from '@/actions';
import { EthFundMe } from '@/lib/abi';
import { ethChainId, ethFundMeContractAddress } from '@/lib/constant';
import { TagsWithIds } from '@/lib/constants';
import { CampaignTags } from '@/lib/types';
import {
  createUrl,
  deleteFromCloudinary,
  uploadToCloudinary,
} from '@/lib/utils';
import { Campaign } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaMinusCircle } from 'react-icons/fa';
import useRefs from 'react-use-refs';
import { BaseError } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';

export default function UpdateCampaignMediaForm({
  campaign,
}: {
  campaign: Campaign;
}) {
  const { push } = useRouter();

  const [updating, setUpdating] = useState(false);

  const [bannerPreview, setBannerPreview] = useState(campaign.banner_url);
  const [otherPreview, setOtherPreview] = useState(campaign.media_links);

  const [preparedBanner, setPreparedBanner] = useState<FileList | null>(null);
  const [preparedOtherImages, setPreparedOtherImages] =
    useState<FileList | null>(null);
  const [closeRef, triggerRef] = useRefs<HTMLButtonElement>(null);

  const isPreview = (url: string) => {
    return /\b(blob)\b/.test(url);
  };

  const {
    data: hash,
    error,
    isError,
    isPending,
    writeContract,
  } = useWriteContract({
    mutation: {
      onSettled(data, error) {
        console.log('Settled updateCampaign', { data, error });
      },
    },
  });

  const { isLoading: isConfirmingTxn, isSuccess: isConfirmedTxn } =
    useWaitForTransactionReceipt({ hash });

  function handleUpdateMedia() {
    setUpdating(true);
    handleCloudinaryUpload()
      .then((res) => {
        const campaignLinksMinusDeleted = campaign.media_links.filter((img) => {
          if (otherPreview.indexOf(img) === -1) return false;
          return true;
        });

        const mediaLinks =
          res.otherImagesURL.length > 0
            ? [...campaignLinksMinusDeleted, ...res.otherImagesURL]
            : campaignLinksMinusDeleted;

        handleIPFSPush({
          bannerUrl: res.bannerURL || campaign.banner_url,
          title: campaign.title,
          tag: TagsWithIds.filter(
            (i) => i.name === (campaign.tag as CampaignTags)
          )[0].id,
          youtubeLink: campaign.youtube_link || undefined,
          description: campaign.description,
          mediaLinks,
        })
          .then((res) => {
            if (!res?.hash) throw new Error();

            writeContract({
              abi: EthFundMe,
              address: ethFundMeContractAddress,
              functionName: 'updateCampaign',
              chainId: ethChainId,
              args: [
                res.hash,
                BigInt(campaign.campaign_id),
                campaign.goal,
                campaign.beneficiary,
              ],
            });

            // push(`/campaigns/${campaign.campaign_id}`);
          })
          .catch(() => {
            toast.error('Failed to upload campaign media');
            setUpdating(false);
          });
      })
      .catch(() => {
        toast.error('Failed to update campaign media');
        setUpdating(false);
      });
  }

  async function uploadBanner() {
    if (!preparedBanner) return [];
    await deleteFromCloudinary(campaign.banner_url);
    const bannerUploadUrl = await uploadToCloudinary(preparedBanner);

    return bannerUploadUrl;
  }

  async function uploadOtherImages() {
    if (!preparedOtherImages) return [];
    const otherImagesUrl = await uploadToCloudinary(preparedOtherImages);

    return otherImagesUrl;
  }

  async function handleCloudinaryUpload() {
    const bannerURL = await uploadBanner();
    const otherImagesURL = await uploadOtherImages();

    return { bannerURL: bannerURL[0], otherImagesURL };
  }

  function handlePreviewDelete(item: string) {
    if (isPreview(item)) {
      setOtherPreview((prev) => prev.filter((_) => _ !== item));
    } else {
      deleteFromCloudinary(item)
        .then(() => {
          toast.success('Image deleted');
          setOtherPreview((prev) => prev.filter((_) => _ !== item));
        })
        .catch(() => toast.error('Failed to delete image'));
    }
  }

  useEffect(() => {
    if (isError && error) {
      let errorMsg = (error as BaseError).shortMessage || error.message;

      if (errorMsg === 'User rejected the request.') {
        errorMsg = 'Request rejected';
      } else {
        errorMsg = 'Failed to update campaign media';
      }

      toast.error(errorMsg);
      setUpdating(false);
    } else if (isConfirmedTxn) {
      toast.success('Campaign updated');
      setUpdating(false);
      push(`/campaigns/${campaign.campaign_id}`);
    }
  }, [campaign.campaign_id, push, error, isConfirmedTxn, isError]);

  return (
    <div className='w-full sm:max-w-2xl'>
      <div className='w-full space-y-5 rounded-md border border-neutral-300 p-3 sm:gap-8 sm:p-5'>
        <h2 className='text-xl'>Banner</h2>

        <Image
          className='mx-auto h-[300px] w-auto object-contain'
          width={400}
          height={400}
          src={bannerPreview}
          alt='campaign-banner'
        />
        <div className='relative'>
          <Input
            type='file'
            onChange={(e) => {
              if (!e.target.files) {
                setPreparedBanner(null);
                return;
              }
              setBannerPreview(createUrl(e.target.files[0]));
              setPreparedBanner(e.target.files);
            }}
            accept='image/*'
          />

          {isPreview(bannerPreview) && (
            <div className='pointer-events-none absolute bottom-0 top-0 w-full rounded-md border border-slate-300 bg-white p-1'>
              <button
                className='pointer-events-auto flex h-full w-full items-center justify-center gap-2 bg-neutral-100'
                onClick={() => {
                  setBannerPreview(campaign.banner_url);
                  setPreparedBanner(null);
                }}
              >
                <Trash size={16} />
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      <div className='mx-auto my-4 w-full space-y-5 rounded-md border border-neutral-300 p-3 sm:gap-8 sm:p-5'>
        <h2 className='text-xl'>Other Images</h2>

        <p className='text-sm text-slate-400'>
          {6 - otherPreview.length} remaining
        </p>
        {otherPreview.length > 0 && (
          <>
            <ScrollArea className='max-h-40'>
              <div className='grid grid-cols-3 gap-2'>
                <AnimatePresence>
                  {otherPreview.map((item, idx) => (
                    <motion.div
                      animate={{
                        scale: ['0%', '100%'],
                      }}
                      transition={{ type: 'spring', damping: 20 }}
                      exit={{ scale: 0 }}
                      key={idx}
                      className='relative'
                    >
                      <Image
                        className='h-20 w-full object-cover'
                        // src={createUrl(item as File)}
                        src={item}
                        width={300}
                        height={300}
                        alt='image-preview'
                      />

                      <Dialog>
                        <DialogTrigger
                          ref={triggerRef}
                          title='Remove image'
                          className='absolute left-0 top-0 grid h-full w-full cursor-pointer place-content-center bg-black/50 opacity-0 transition-all duration-150 ease-in-out hover:opacity-100'
                        >
                          <FaMinusCircle color='tomato' />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Sure to remove image?</DialogTitle>
                          </DialogHeader>

                          <div className='grid grid-cols-2 gap-4'>
                            <Button
                              variant='destructive'
                              onClick={() => handlePreviewDelete(item)}
                            >
                              Delete
                            </Button>
                            <DialogClose ref={closeRef}>Close</DialogClose>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </>
        )}

        <div className='relative'>
          <Input
            type='file'
            multiple
            max={6 - otherPreview.length}
            onChange={(e) => {
              const images: FileList | null = e.target.files;

              const getFiles = () => {
                if (images) {
                  return [...Array.from(images).map((_) => createUrl(_))].slice(
                    0,
                    6 - otherPreview.length
                  );
                } else {
                  return [];
                }
              };

              const files = getFiles();

              setOtherPreview((prev) => {
                if (prev && prev.length > 6 && files && files.length) {
                  toast('Cannot upload more than 6 images');
                  return prev;
                }
                if (files && prev) return [...prev, ...files];
                if (files && !prev) return files;
                return prev;
              });

              setPreparedOtherImages(images);
            }}
            accept='image/*'
          />

          {otherPreview.some((_) => isPreview(_)) && (
            <div className='pointer-events-none absolute bottom-0 top-0 grid w-full grid-cols-2 gap-1 rounded-md border border-slate-300 bg-white p-1'>
              <button
                disabled={6 - otherPreview.length === 0}
                className='flex items-center justify-center gap-2 bg-neutral-100 disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-50'
                onClick={(e) => {
                  if (6 - otherPreview.length === 0) {
                    e.stopPropagation();
                  }
                }}
              >
                <ImagePlus size={16} /> Add image
              </button>

              <button
                className='pointer-events-auto flex w-full items-center justify-center gap-2 bg-neutral-100'
                onClick={() => setOtherPreview(campaign.media_links)}
              >
                <Trash size={16} />
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      <Button
        disabled={
          (bannerPreview === campaign.banner_url &&
            otherPreview.length === campaign.media_links.length) ||
          updating ||
          isPending ||
          isConfirmingTxn
        }
        className='w-full border border-slate-300 p-3'
        onClick={handleUpdateMedia}
      >
        {updating ? 'Updating...' : 'Save media'}
      </Button>
    </div>
  );
}
