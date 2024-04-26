'use client';

import { fetchCampaignTags, handleIPFSUpdate } from '@/actions';
import { EthFundMe } from '@/lib/abi';
import { ethChainId, ethFundMeContractAddress } from '@/lib/constant';
import { REGEX_CODES } from '@/lib/constants';
import { CampaignTags } from '@/lib/types';
import { GET_EDIT_CAMPAIGN_FORM_SCHEMA } from '@/lib/utils';
import { userStore } from '@/store';
import { Campaign, CampaignTag } from '@/types';
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
  const [tags, setTags] = useState<CampaignTag[]>([]);
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

  const formSchema = GET_EDIT_CAMPAIGN_FORM_SCHEMA();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      type: campaign.beneficiary === campaign.creator ? 'personal' : 'others',
      beneficiaryAddress: campaign.beneficiary,
      banner: campaign.metadata.banner_url,
      description: campaign.metadata.description,
      title: campaign.metadata.title,
      goal: parseFloat(formatEther(BigInt(campaign.goal))),
      tag: campaign.metadata.tags[0].name,
      ytLink: campaign.metadata.youtube_link ?? undefined,
    },
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const editMade =
    form.watch('title') !== campaign.metadata.title ||
    form.watch('description') !== campaign.metadata.description ||
    form.watch('beneficiaryAddress') !== campaign.beneficiary ||
    form.watch('goal') !== parseFloat(formatEther(BigInt(campaign.goal))) ||
    form.watch('banner') !== campaign.metadata.banner_url;
  // ||
  // form.watch('tag') !== campaign.metadata.tags[0].id;

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    const { goal, beneficiaryAddress, tag, title, description } = data;
    const { campaign_id } = campaign;

    // Handle push data to backend

    const filterTag = tags.filter((_) => _.name === tag)[0];
    const preparedTag = filterTag || { id: 9, name: CampaignTags.Others };

    setIsUploadingMetadata(true);
    handleIPFSUpdate({
      metaId: campaign.metadata.id,
      title,
      description,
      bannerUrl: campaign.metadata.banner_url,
      youtubeLink: campaign.metadata.youtube_link || undefined,
      mediaLinks: campaign.metadata.media_links,
      tag: preparedTag,
    })
      .then(() => {
        writeContract({
          abi: EthFundMe,
          address: ethFundMeContractAddress,
          functionName: 'updateCampaign',
          chainId: ethChainId,
          args: [
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
      toast.error((error as BaseError).shortMessage || error.message);
    } else if (isConfirmedTxn) {
      toast.success('Campaign updated');
      router.push(`/campaigns/${campaign.campaign_id}`);
    }
  }, [campaign.campaign_id, error, isConfirmedTxn, isError, router]);

  // goal: {formatEther(BigInt(campaign.goal))}
  // goal: {campaign.goal}
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
                  type='number'
                  step={0.01}
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
                            <TooltipTrigger className='flex items-center gap-2 pb-2'>
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
        <Button
          type='submit'
          size='default'
          className='col-span-2 disabled:pointer-events-auto disabled:cursor-not-allowed'
          disabled={!editMade || isConfirmingTxn || isPending}
        >
          {isPending || isConfirmingTxn || isUploadingMetadata
            ? 'Loading...'
            : 'Update campaign'}
        </Button>
      </form>
    </Form>
  );
}
