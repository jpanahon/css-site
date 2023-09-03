import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import MarkDownView from "../MarkDownView";
import { formatDateRange, getEventRelativeTime } from "@/lib/utils";
import { Event } from "@prisma/client";

interface EventCardProps {
    event: Event;
    currentPage: number;
}

function EventCard({ event, currentPage }: EventCardProps) {
    return (
        <Card className="hover:bg-gray-200 dark:hover:bg-card/50 transition-colors duration-300">
            <Link key={event.id} href={`/events/${event.slug}?page=${currentPage}`} >
                <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription className="font-semibold">{formatDateRange(event.startDate, event.endDate)} ({getEventRelativeTime(event.startDate, event.endDate)
                    })</CardDescription>
                    <CardContent className="p-0 text-muted-foreground">
                        <MarkDownView
                            className="prose dark:prose-invert max-w-none w-full break-words"
                            markdown={event.description!} />
                    </CardContent>
                </CardHeader>
            </Link>
        </Card >
    )
}

export default EventCard