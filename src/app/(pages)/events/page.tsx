import dynamic from "next/dynamic";
import { Metadata } from "next";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import EventsFilter from "@/components/events/list-view/EventsFilter";
import EventsFeed from "@/components/events/list-view/EventsFeed";
import CalendarView from "@/components/events/calendar-view/CalendarView";
import EventTabTrigger from "@/components/events/TabTrigger";
import { canEditEvent } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { PlusSquare } from "lucide-react";
import { auth } from "@/auth";
const EventFormDialog = dynamic(() => import("@/components/events/EventFormDialog"));

export const metadata: Metadata = {
  title: "Events",
};

interface EventsProps {
  searchParams: URLSearchParams & { page?: string; view?: string; filter?: string };
}

export default async function EventsPage({ searchParams }: EventsProps) {
  const view = searchParams.view;
  const session = await auth();
  const { page, filter } = searchParams;

  return (
    <>
      <h1 className="text-4xl text-center font-bold">Events</h1>
      <Tabs defaultValue={view ?? "list"} aria-label="Events View" className="w-full max-w-3xl">
        {session && canEditEvent(session) && (
          <EventFormDialog
            triggerButton={
              <Button size="full" className="mb-4">
                <PlusSquare size={18} className="mr-2" />
                Create Event
              </Button>
            }
          />
        )}
        <TabsList className="grid w-full grid-cols-2">
          <EventTabTrigger value="list" label="List View" />
          <EventTabTrigger value="calendar" label="Calendar View" />
        </TabsList>
        <TabsContent
          value="list"
          className="grid grid-cols-1 gap-4 break-words max-w-3xl w-full mx-auto">
          <div className="grid grid-cols-1 gap-6">
            <EventsFilter filter={filter} />
            <Suspense fallback={eventsSkeleton}>
              <EventsFeed page={page} filter={filter} session={session} />
            </Suspense>
          </div>
        </TabsContent>
        <TabsContent value="calendar">
          <Suspense>
            <CalendarView session={session} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </>
  );
}

const eventsSkeleton = Array.from({ length: 3 }, (_, i) => (
  <div key={i} className="w-full h-60 bg-card rounded-md border border-border skeleton-card" />
));
