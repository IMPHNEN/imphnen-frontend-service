'use client';

import events from '@/data/events.json';
import { buttonVariants } from '@components';
import { cn } from '@utils';
import Image from 'next/image';
import { HiCalendar, HiClock, HiLocationMarker } from 'react-icons/hi';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta',
  });
};

const getEventStatus = (endDate: string) => {
  const now = new Date();
  const end = new Date(endDate);
  return end > now ? 'upcoming' : 'past';
};

export default function EventsPage() {
  const sortedEvents = [...events].sort(
    (a, b) =>
      new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
  );

  return (
    <div className="min-h-screen bg-background container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Featured Card */}
        <div className="col-span-full">
          <div className="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden bg-card">
            <div className="grid md:grid-cols-2">
              <div className="min-h-96 bg-muted relative">
                <Image
                  src={sortedEvents[0].thumbnail}
                  alt={sortedEvents[0].name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  unoptimized
                />
              </div>
              <div className="p-8 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-primary/20 text-primary text-xs px-2.5 py-1 rounded-full">
                    Event Terbaru
                  </span>
                  <span
                    className={cn(
                      'px-2 py-1 rounded-full text-xs',
                      getEventStatus(sortedEvents[0].end_date) === 'upcoming'
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {getEventStatus(sortedEvents[0].end_date) === 'upcoming'
                      ? 'Upcoming'
                      : 'Selesai'}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  {sortedEvents[0].name}
                </h2>
                <div className="space-y-3 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <HiCalendar className="w-4 h-4" />
                    <span>{formatDate(sortedEvents[0].start_date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiClock className="w-4 h-4" />
                    <span>
                      {formatTime(sortedEvents[0].start_date)} -{' '}
                      {formatTime(sortedEvents[0].end_date)} WIB
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiLocationMarker className="w-4 h-4" />
                    <span>
                      {sortedEvents[0].type === 'online'
                        ? 'Online'
                        : sortedEvents[0].location}
                    </span>
                  </div>
                  {sortedEvents[0].price > 0 && (
                    <div className="mt-1 font-medium">
                      Rp {sortedEvents[0].price.toLocaleString('id-ID')}
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground mb-6 line-clamp-4">
                  {sortedEvents[0].description}
                </p>
                <a
                  href={sortedEvents[0].detail_link}
                  target="_blank"
                  className={cn(
                    buttonVariants({ variant: 'bordered' }),
                    'mt-auto w-full md:w-fit'
                  )}
                >
                  Lihat Detail
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Regular Cards */}
        {sortedEvents.slice(1).map((event) => (
          <div
            key={event.name}
            className="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 bg-card"
          >
            <div className="h-48 bg-muted relative">
              <Image
                src={event.thumbnail}
                alt={event.name}
                fill
                className="object-cover object-top rounded-t-xl"
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span
                  className={cn(
                    'px-2 py-1 rounded-full text-xs',
                    getEventStatus(event.end_date) === 'upcoming'
                      ? 'bg-primary/20 text-primary'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {getEventStatus(event.end_date) === 'upcoming'
                    ? 'Upcoming'
                    : 'Selesai'}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                {event.name}
              </h3>
              <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <HiCalendar className="w-4 h-4" />
                  <span>{formatDate(event.start_date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiLocationMarker className="w-4 h-4" />
                  <span>
                    {event.type === 'online' ? 'Online' : event.location}
                  </span>
                </div>
                {event.price > 0 && (
                  <div className="font-medium">
                    Rp {event.price.toLocaleString('id-ID')}
                  </div>
                )}
              </div>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {event.description}
              </p>
              <a
                href={event.detail_link}
                target="_blank"
                className={cn(
                  buttonVariants({ variant: 'bordered' }),
                  'w-full text-sm'
                )}
              >
                Lihat Detail
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
