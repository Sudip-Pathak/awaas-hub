import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { MapPin, Eye, MessageSquare } from "lucide-react";

type Property = {
    id: number;
    title: string;
    location: string;
    price: string;
    views: string;
    messages: number;
    image: string;
};

export default function RecentPropertiesCard({
    properties,
}: {
    properties: Property[];
}) {
    return (
        <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Recent Properties</CardTitle>
                    <CardDescription>Latest listings</CardDescription>
                </div>
                <button className="text-sm font-medium text-primary hover:underline">
                    View all
                </button>
            </CardHeader>

            <CardContent className="space-y-4">
                {properties.map((property) => (
                    <div
                        key={property.id}
                        className="flex items-center gap-4 rounded-lg border p-3 hover:bg-accent/40 transition"
                    >
                        <img
                            src={property.image}
                            alt={property.title}
                            className="h-20 w-20 rounded-lg object-cover"
                        />

                        <div className="flex-1">
                            <p className="font-medium text-foreground">
                                {property.title}
                            </p>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                                <MapPin className="h-4 w-4" />
                                {property.location}
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="font-semibold text-primary">
                                {property.price}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                <span className="flex items-center gap-1">
                                    <Eye className="h-3 w-3" />
                                    {property.views}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MessageSquare className="h-3 w-3" />
                                    {property.messages}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
