import MobileNotificationLink from '@/components/MobileNotificationLink';
import Navbar from '@/components/Navbar';
import { getNotfications } from '@/lib/queries';

const NotificationsPage = async ({
  params: { slug },
}: {
  params: { slug: `0x${string}` };
}) => {
  const data = await getNotfications(slug);

  const notifications = data.notification;
  return (
    <>
      <Navbar />
      <div>
        <div
          className={`${
            notifications.length === 0
              ? 'flex flex-col items-center justify-center'
              : ''
          } w-full overflow-y-auto rounded-md border px-0 py-2 text-sm`}
        >
          <>
            <div className='w-full border-b p-2 px-5'>
              <p className='w-full text-xl font-semibold text-primary-default'>
                Notifications
              </p>
            </div>
            {notifications?.map((item, index) => (
              <div
                key={index}
                className={`block w-full border-b p-0 ${
                  item.viewed === true ? 'bg-primary-default/10' : ''
                }`}
              >
                <MobileNotificationLink item={item} />
              </div>
            ))}
          </>
        </div>
      </div>
    </>
  );
};

export default NotificationsPage;
