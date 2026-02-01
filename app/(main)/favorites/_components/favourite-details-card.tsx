"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin, Banknote, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FavouriteDetailsCardProps {
  property: any;
  onRemove: (id: string) => void;
}

export default function FavouriteDetailsCard({ property, onRemove }: FavouriteDetailsCardProps) {
  const router = useRouter();

  return (
    <Card className="group overflow-hidden rounded-2xl border-border/50 shadow-sm bg-card transition-all">
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={property.images?.[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa"}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        <div className="absolute top-3 right-3">
          <Button 
            variant="destructive" 
            size="icon" 
            className="h-8 w-8 rounded-full shadow-lg"
            onClick={() => onRemove(property._id)}
          >
            <Heart size={14} className="fill-current" />
          </Button>
        </div>
        
        {/* ID BADGE: WHITE BG, BLACK TEXT */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-white text-black hover:bg-white/90 border-none text-[10px] font-black shadow-md">
            ID: {property._id.toString().slice(-5).toUpperCase()}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <h3 className="font-bold text-xs uppercase line-clamp-1 truncate bg-muted/30 p-2 rounded-lg">
          {property.title}
        </h3>

        <div className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground uppercase">
          <MapPin size={14} className="text-destructive" /> {property.location}
        </div>

        <div className="flex items-center gap-2 text-[11px] font-black text-primary uppercase">
          <Banknote size={14} /> NPR. {new Intl.NumberFormat("en-IN").format(property.price)}
        </div>

        <div className="flex gap-2 pt-1">
          <Button 
            className="flex-1 h-9 rounded-lg font-bold text-[10px] uppercase tracking-widest"
            onClick={() => router.push(`/properties/${property._id}`)}
          >
            View
          </Button>
          <Button 
            variant="outline"
            className="flex-1 h-9 rounded-lg font-bold text-[10px] uppercase tracking-widest border-2"
            onClick={() => onRemove(property._id)}
          >
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}