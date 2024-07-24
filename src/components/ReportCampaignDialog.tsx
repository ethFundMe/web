'use client';
import { Textarea } from '@/components/ui/textarea';
import { userStore } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEllipsisV } from 'react-icons/fa';
import { z } from 'zod';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const VALUES = [
  'Violence',
  'Fraud',
  'Harassment',
  'Copyright violation',
  'Money laundering',
  'Duplicate campaign',
  'Privacy violation',
  'Other',
] as const;
const ReportType = z.enum(VALUES);

const ReportCampaignSchema = z.object({
  description: z
    .string({
      required_error: 'Description is required',
    })
    .max(1200, { message: 'Must be 1200 or fewer characters long' }),
  report_type: ReportType,
});
type TCampaignReport = z.infer<typeof ReportCampaignSchema>;

export default function ReportCampaignDialog({
  campaign_id,
}: {
  campaign_id: number;
}) {
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const { user } = userStore();

  return (
    <>
      {user ? (
        <Dialog open={openReportDialog} onOpenChange={setOpenReportDialog}>
          <DropdownMenu>
            <DropdownMenuTrigger className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-100'>
              <FaEllipsisV />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <DialogTrigger>Report Campaign</DialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='text-center'>Report Campaign</DialogTitle>
              <ReportForm
                campaign_id={campaign_id}
                setOpenReportDialog={setOpenReportDialog}
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : (
        <></>
      )}
    </>
  );
}

const ReportForm = ({
  campaign_id,
  setOpenReportDialog,
}: {
  campaign_id: number;
  setOpenReportDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm<TCampaignReport>({
    resolver: zodResolver(ReportCampaignSchema),
  });
  const watcher = form.watch('description');
  const { isSubmitting } = form.formState;
  const { user } = userStore();

  const onSubmit: SubmitHandler<TCampaignReport> = async (details) => {
    try {
      console.log(details);
      console.log(user?.ethAddress);
      console.log(campaign_id);

      const { report_type, description } = details;
      const endpointBody = {
        report_type,
        description,
        campaign_id,
      };
      const baseUrl =
        (process.env.NEXT_PUBLIC_ETH_FUND_ENDPOINT as string) || '';
      const res = await fetch(
        `${baseUrl}/api/campaign/report/${user?.ethAddress}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(endpointBody),
        }
      );
      const reportRes = await res.json();
      console.log(reportRes);
      if (res.status === 201) {
        form.reset();
        setOpenReportDialog(false);
        return toast.success('Report sent successfully!');
      }
    } catch (error) {
      toast.error('Sorry, please try again');
      return console.log('new report error:', error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          <FormField
            control={form.control}
            name='report_type'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='!text-left'>Report Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a report type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='border shadow-md'>
                    {VALUES.map((item, idx) => (
                      <SelectItem key={idx} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='!text-left'>Description</FormLabel>
                <FormControl>
                  <Textarea
                    maxLength={1200}
                    placeholder='Report description...'
                    className='resize-none focus:outline-primary-default'
                    {...field}
                  />
                </FormControl>
                <p className='text-right text-[10px] text-slate-500'>
                  {watcher?.length ?? 0}/1200
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='w-full disabled:bg-primary-default/90'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting' : 'Submit'}{' '}
            {isSubmitting && (
              <svg className='ml-2 h-5 w-5 animate-spin rounded-full border-2 border-t-0 border-white'></svg>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
