'use client';

import { EthFundMe } from '@/lib/abi';
import { ethChainId, ethFundMeContractAddress } from '@/lib/constant';
import { REGEX_CODES } from '@/lib/constants';
import { CampaignTags } from '@/lib/types';
import { GET_EDIT_CAMPAIGN_FORM_SCHEMA } from '@/lib/utils';
import { Campaign } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';
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
  const { address } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!address) redirect('/');
  }, [address]);

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
      banner: campaign.media_links[0],
      description: campaign.description,
      title: campaign.title,
      goal: parseFloat(formatEther(BigInt(campaign.goal))),
      tag: CampaignTags['Arts and Culture'],
      ytLink:
        campaign.media_links.filter((link) =>
          REGEX_CODES.ytLink.test(link)
        )[0] ?? undefined,
    },
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (campaign.media_links.length) {
      setBannerPreview(campaign.media_links[0]);
    }
    const otherMedia = campaign.media_links.slice(1);
    const mediaWithoutYTLink = otherMedia.filter(
      (media) => !REGEX_CODES.ytLink.test(media)
    );
    if (otherMedia.length) {
      setOtherImgsPrepared(mediaWithoutYTLink);
    }
  }, [campaign]);

  const editMade =
    form.watch('title') !== campaign.title ||
    form.watch('description') !== campaign.description ||
    form.watch('beneficiaryAddress') !== campaign.beneficiary ||
    form.watch('goal') !== parseFloat(formatEther(BigInt(campaign.goal))) ||
    form.watch('banner') !== campaign.media_links[0];

  console.log(form.watch());

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    console.log(data);
    const { description, goal, title, beneficiaryAddress } = data;
    const { campaign_id } = campaign;

    return writeContract({
      abi: EthFundMe,
      address: ethFundMeContractAddress,
      functionName: 'updateCampaign',
      chainId: ethChainId,
      args: [
        BigInt(campaign_id),
        title,
        description,
        parseEther(goal.toString()),
        [
          'https://images.unsplash.com/photo-1527788263495-3518a5c1c42d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnVuZHJhaXNpbmd8ZW58MHx8MHx8fDA%3D',
        ],
        beneficiaryAddress as `0x${string}`,
      ],
    });
  };

  useEffect(() => {
    if (isError && error) {
      toast.error((error as BaseError).shortMessage || error.message);
      return;
    }

    if (isConfirmedTxn) {
      toast.success('Campaign updated');
      return router.push(`/campaigns/${campaign.id}`);
    }
  }, [campaign.id, error, isConfirmedTxn, isError, router]);

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
                  step={0.00001}
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
                    {Object.entries(CampaignTags).map(([key, value]) => (
                      <>
                        <SelectItem value={key}>{value}</SelectItem>
                      </>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='tag'
        />

        {form.watch('type') === 'others' && (
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
                            <span>Creator fees (ETH)</span>
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
                      // value={User.creatorFee}
                      value={0.02}
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
          className='col-span-2 disabled:cursor-not-allowed'
          disabled={!editMade}
        >
          {isPending || isConfirmingTxn ? 'Loading...' : 'Update campaign'}
        </Button>
      </form>
    </Form>
  );
}
