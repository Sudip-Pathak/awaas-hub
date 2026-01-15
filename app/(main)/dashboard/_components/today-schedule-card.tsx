import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";

type ScheduleItem = {
    id: number;
    title: string;
    time: string;
    type: string;
};

export default function TodayScheduleCard({
    schedule,
}: {
    schedule: ScheduleItem[];
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Today’s Schedule</CardTitle>
                <CardDescription>
                    {schedule.length} appointments
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                {schedule.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-start gap-3 rounded-lg border p-3"
                    >
                        <div className="h-9 w-9 rounded-full bg-muted" />
                        <div className="flex-1">
                            <p className="font-medium text-foreground">
                                {item.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {item.time} · {item.type}
                            </p>
                        </div>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
