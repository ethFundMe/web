'use client';

import { handleIPFSPush } from '@/actions';
import { EthFundMe } from '@/lib/abi';
import { ethChainId, ethFundMeContractAddress } from '@/lib/constant';
import { REGEX_CODES, TagsWithIds } from '@/lib/constants';
import { fetchCampaignTags } from '@/lib/queries';
import { CampaignTags } from '@/lib/types';
import { GET_EDIT_CAMPAIGN_FORM_SCHEMA } from '@/lib/utils';
import { userStore } from '@/store';
import { Campaign } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { formatEther, parseEther } from 'viem';
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
  type BaseError,
} from 'wagmi';
import * as z from 'zod';
import { DiscontinueCampaignBtn } from './DiscontinueCampaignBtn';
import { LinkPreview } from './LinkPreview';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

export default function EditCampaignForm({ campaign }: { campaign: Campaign }) {
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
  const [isUploadingMetadata, setIsUploadingMetadata] = useState(false);
  const { address } = useAccount();
  const router = useRouter();
  const { user } = userStore();

  // useEffect(() => {
  //   const isWalletConnected = address;

  //   const isActualCreator = user?.ethAddress === address;

  //   if (!user) redirect('/');
  // }, [user]);

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

  const formSchema = GET_EDIT_CAMPAIGN_FORM_SCHEMA(user?.isVerified);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      type: campaign.beneficiary === campaign.creator ? 'personal' : 'others',
      beneficiaryAddress: campaign.beneficiary,
      banner: campaign.banner_url,
      description: campaign.description,
      title: campaign.title,
      goal: parseFloat(formatEther(BigInt(campaign.goal))),
      tag: campaign.tag as CampaignTags,
      ytLink: campaign.youtube_link ?? undefined,
    },
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const editMade =
    form.watch('title') !== campaign.title ||
    form.watch('description') !== campaign.description ||
    form.watch('beneficiaryAddress') !== campaign.beneficiary ||
    form.watch('goal') !== parseFloat(formatEther(BigInt(campaign.goal))) ||
    form.watch('banner') !== campaign.banner_url ||
    form.watch('tag') !== campaign.tag;

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    const { goal, beneficiaryAddress, tag, title, description } = data;
    const { campaign_id } = campaign;

    // Handle push data to backend

    const filterTag = tags.filter((_) => _.name === tag)[0];
    const preparedTag = TagsWithIds.filter(
      (i) => i.name === (filterTag.name || CampaignTags.Others)
    )[0].id;

    setIsUploadingMetadata(true);
    handleIPFSPush({
      title,
      description,
      bannerUrl: campaign.banner_url,
      youtubeLink: campaign.youtube_link || undefined,
      mediaLinks: campaign.media_links,
      tag: preparedTag,
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
            BigInt(campaign_id),
            parseEther(goal.toString()),
            form.watch('type') === 'personal'
              ? campaign.creator
              : (beneficiaryAddress as `0x${string}`),
          ],
        });
        setIsUploadingMetadata(false);
      })
      .catch(() => {
        toast.error('Failed to update campaign');
        setIsUploadingMetadata(false);
      });
  };

  useEffect(() => {
    fetchCampaignTags().then((res) => {
      setTags(res);
    });
  }, []);

  useEffect(() => {
    if (isError && error) {
      let errorMsg = (error as BaseError).shortMessage || error.message;

      if (errorMsg === 'User rejected the request.') {
        errorMsg = 'Request rejected';
      } else {
        errorMsg = 'Failed to update campaign';
      }

      toast.error(errorMsg);
    } else if (isConfirmedTxn) {
      toast.success('Campaign updated');
      router.push(`/campaigns/${campaign.campaign_id}`);
    }
  }, [campaign.campaign_id, error, isConfirmedTxn, isError, router]);

  function goalReached() {
    if (campaign.total_accrued >= campaign.goal) {
      return true;
    }
    return false;
  }

  return (
    <Form {...form}>
      <form
        className='mx-auto grid w-full grid-cols-2 gap-5 rounded-md border border-neutral-300 p-3 sm:max-w-2xl sm:gap-8 sm:p-5'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel>Campaign title</FormLabel>
              <FormControl>
                <Input placeholder='Enter campaign title' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='title'
        />
        <FormField
          control={form.control}
          render={({ field }) => (
            <FormItem className=''>
              <FormLabel>Campaign type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder='Choose a campaign type'
                      defaultValue={form.getValues('type')}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='personal'>Personal</SelectItem>
                    <SelectItem value='others'>For others</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='type'
        />
        <FormField
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal (ETH)</FormLabel>
              <FormControl>
                <Input
                  disabled={goalReached()}
                  type='number'
                  step='any'
                  defaultValue={field.value}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='goal'
        />
        <FormField
          control={form.control}
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel>Campaign tag</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Choose a campaign tag' />
                  </SelectTrigger>
                  <SelectContent>
                    {tags.map((_, idx) => (
                      <SelectItem key={idx} value={_.name}>
                        {_.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='tag'
        />
        {form.watch('type') === 'others' &&
          campaign.beneficiary !== campaign.creator && (
            <>
              <FormField
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beneficiary address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name='beneficiaryAddress'
              />

              <FormField
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className='hidden items-center gap-2 pb-2 md:flex'>
                              <span>Creator fees (%)</span>
                              <AiOutlineExclamationCircle />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Visit your{' '}
                                <Link
                                  className='italic text-primary-default'
                                  href={`/dashboard/${address}/update-profile`}
                                >
                                  dashboard
                                </Link>{' '}
                                if you wish to change your creator fee
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <Popover>
                          <PopoverTrigger className='flex items-center gap-2 pb-2 md:hidden'>
                            <span>Creator fees (%)</span>
                            <AiOutlineExclamationCircle />
                          </PopoverTrigger>
                          <PopoverContent>
                            <p>
                              Visit your{' '}
                              <Link
                                className='italic text-primary-default'
                                href={`/dashboard/${address}/creator-fee`}
                              >
                                dashboard
                              </Link>{' '}
                              if you wish to change your creator fee
                            </p>
                          </PopoverContent>
                        </Popover>
                      </>
                    </FormLabel>

                    <FormControl>
                      <Input
                        type='number'
                        step={0.00001}
                        disabled
                        value={user?.creatorFee}
                        // value={0.02}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name='creatorFee'
              />
            </>
          )}
        <FormField
          name='description'
          control={form.control}
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel>Campaign description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder='Enter campaign description' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='col-span-2 space-y-4'>
          {!!REGEX_CODES.ytLink.test(form.watch('ytLink') as string) && (
            <LinkPreview url={form.watch('ytLink') as string} />
          )}

          <FormField
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link to Youtube video</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Paste youtube video link' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name='ytLink'
          />
        </div>

        <div className='col-span-2 grid grid-cols-2 gap-4'>
          <Button
            type='submit'
            size='default'
            className='disabled:pointer-events-auto disabled:cursor-not-allowed'
            disabled={
              !editMade || isConfirmingTxn || isPending || isUploadingMetadata
            }
          >
            {isPending || isConfirmingTxn || isUploadingMetadata
              ? 'Loading...'
              : 'Update campaign'}
          </Button>

          <DiscontinueCampaignBtn campaign={campaign} />
        </div>
      </form>
    </Form>
  );
}
