"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search, Heart, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProperties } from "@/lib/client/queries/properties.queries";
import Loading from "@/components/loading";
import FavouriteDetailsCard from "./_components/favourite-details-card";

// Set to 9 for a perfect 3x3 grid
const ITEMS_PER_PAGE = 9;

export default function FavouritesPage() {
  const { data: allBackendProperties = [], isLoading } = useProperties();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavoriteIds(saved);
  }, []);

  const filteredRealFavourites = useMemo(() => {
    return allBackendProperties.filter((p: any) => favoriteIds.includes(p._id));
  }, [allBackendProperties, favoriteIds]);

  const finalDisplayData = useMemo(() => {
    return filteredRealFavourites.filter((item: any) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = locationFilter === "all" || item.location.toLowerCase().includes(locationFilter.toLowerCase());
      return matchesSearch && matchesLocation;
    });
  }, [filteredRealFavourites, searchQuery, locationFilter]);

  const totalPages = Math.ceil(finalDisplayData.length / ITEMS_PER_PAGE);
  const currentData = finalDisplayData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleRemove = (id: string) => {
    const updated = favoriteIds.filter(favId => favId !== id);
    setFavoriteIds(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-8 min-h-screen">
      {/* FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-background p-4 rounded-2xl border shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search your saved properties..." 
            className="pl-10 h-12 border-none bg-muted/50 rounded-xl focus-visible:ring-1"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <Select onValueChange={(v) => { setLocationFilter(v); setCurrentPage(1); }}>
          <SelectTrigger className="w-full md:w-56 h-12 rounded-xl font-semibold border-muted">
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="Kathmandu">Kathmandu</SelectItem>
            <SelectItem value="Bhaktapur">Bhaktapur</SelectItem>
            <SelectItem value="Lalitpur">Lalitpur</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 3x3 GRID */}
      {currentData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentData.map((item: any) => (
            <FavouriteDetailsCard key={item._id} property={item} onRemove={handleRemove} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed rounded-[2.5rem] bg-muted/5 space-y-6">
            <div className="p-5 bg-background rounded-full shadow-md">
                <Heart size={48} className="text-muted-foreground/20" />
            </div>
            <div className="text-center space-y-2">
                <p className="text-muted-foreground font-black uppercase text-sm tracking-[0.2em]">
                    No favorites found
                </p>
            </div>
            <Link href="/properties">
                <Button className="rounded-xl px-10 h-12 font-black uppercase text-[11px] tracking-widest gap-3 shadow-xl transition-all hover:scale-105 active:scale-95">
                    Find Properties <ArrowRight size={16} />
                </Button>
            </Link>
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-12">
          <Button 
            variant="outline" 
            className="rounded-xl font-bold uppercase text-[10px] tracking-widest"
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                className={`h-10 w-10 rounded-lg font-black text-xs cursor-pointer transition-colors ${
                  currentPage === idx + 1 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <Button 
            variant="outline" 
            className="rounded-xl font-bold uppercase text-[10px] tracking-widest"
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}









// "use client";

// import React, { useState, useMemo, useEffect } from "react";
// import { Search, MapPin, ChevronLeft, ChevronRight, Heart } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { useProperties } from "@/lib/client/queries/properties.queries";
// import Loading from "@/components/loading";
// import FavouriteDetailsCard from "./_components/favourite-details-card";

// const ITEMS_PER_PAGE = 12;

// export default function FavouritesPage() {
//   const { data: allBackendProperties = [], isLoading } = useProperties();
//   const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  
//   const [searchQuery, setSearchQuery] = useState("");
//   const [locationFilter, setLocationFilter] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);

//   // Load favorites from localStorage on mount
//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
//     setFavoriteIds(saved);
//   }, []);

//   // Filter backend properties: ONLY those whose ID is in the favoriteIds list
//   // DUMMY DATA REMOVED
//   const filteredRealFavourites = useMemo(() => {
//     return allBackendProperties.filter((p: any) => favoriteIds.includes(p._id));
//   }, [allBackendProperties, favoriteIds]);

//   // Final Filter for Search/Location
//   const finalDisplayData = useMemo(() => {
//     return filteredRealFavourites.filter((item: any) => {
//       const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesLocation = locationFilter === "all" || item.location.toLowerCase().includes(locationFilter.toLowerCase());
//       return matchesSearch && matchesLocation;
//     });
//   }, [filteredRealFavourites, searchQuery, locationFilter]);

//   const totalPages = Math.ceil(finalDisplayData.length / ITEMS_PER_PAGE);
//   const currentData = finalDisplayData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

//   const handleRemove = (id: string) => {
//     const updated = favoriteIds.filter(favId => favId !== id);
//     setFavoriteIds(updated);
//     localStorage.setItem("favorites", JSON.stringify(updated));
//   };

//   if (isLoading) return <Loading />;

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-6 space-y-6 min-h-screen">
//       <div className="flex items-center gap-3 pb-2">
//         <div className="p-2 bg-red-50 rounded-lg text-red-500">
//           <Heart size={24} className="fill-current" />
//         </div>
//         <div>
//           <h1 className="text-2xl font-black uppercase tracking-tight">Your Favourites</h1>
//           <p className="text-[10px] font-bold text-muted-foreground uppercase">
//             {filteredRealFavourites.length} Saved Properties
//           </p>
//         </div>
//       </div>

//       {/* FILTER BAR */}
//       <div className="flex flex-col md:flex-row gap-3 items-center bg-background p-3 rounded-2xl border shadow-sm">
//         <div className="relative flex-1 w-full">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
//           <Input 
//             placeholder="Search favorites..." 
//             className="pl-9 h-11 border-none bg-muted/40 rounded-xl"
//             value={searchQuery}
//             onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
//           />
//         </div>
//         <Select onValueChange={(v) => { setLocationFilter(v); setCurrentPage(1); }}>
//           <SelectTrigger className="w-full md:w-48 h-11 rounded-xl font-bold">
//             <SelectValue placeholder="Location" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Locations</SelectItem>
//             <SelectItem value="Kathmandu">Kathmandu</SelectItem>
//             <SelectItem value="Bhaktapur">Bhaktapur</SelectItem>
//             <SelectItem value="Lalitpur">Lalitpur</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* GRID */}
//       {currentData.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {currentData.map((item: any) => (
//             <FavouriteDetailsCard key={item._id} property={item} onRemove={handleRemove} />
//           ))}
//         </div>
//       ) : (
//         <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-3xl">
//             <Heart size={40} className="text-muted-foreground/30 mb-4" />
//             <p className="text-muted-foreground font-bold uppercase text-xs tracking-widest">No favorites found</p>
//         </div>
//       )}

//       {/* PAGINATION */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center gap-4 pt-10">
//           <Button variant="outline" className="rounded-xl" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
//             <ChevronLeft size={18} /> Previous
//           </Button>
//           <div className="flex items-center gap-2 px-4 h-11 bg-muted rounded-xl font-black text-xs">
//             {currentPage} / {totalPages}
//           </div>
//           <Button variant="outline" className="rounded-xl" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
//             Next <ChevronRight size={18} />
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }













// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useSession } from "@/lib/client/auth-client";
// import Link from "next/link";
// import { Role, Permission, hasAnyPermission } from "@/lib/rbac";

// interface Property {
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   location: string;
//   bedrooms: number;
//   bathrooms: number;
//   area: number;
//   images: string[];
// }

// export default function BuyerFavoritesPage() {
//   const router = useRouter();
//   const { data: session, isPending } = useSession();
//   const [favorites, setFavorites] = useState<Property[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [hasAccess, setHasAccess] = useState(true);

//   useEffect(() => {
//     if (!isPending && !session) {
//       router.push("/login");
//     }
//   }, [session, isPending, router]);

//   useEffect(() => {
//     if (session?.user) {
//       const role = session.user.role as Role;

//       // Check if user can view or manage files/favorites
//       const allowed = hasAnyPermission(role, [
//         Permission.VIEW_FAVORITES,
//         Permission.MANAGE_FAVORITES,
//       ]);
//       setHasAccess(allowed);

//       if (allowed) fetchFavorites();
//       else setIsLoading(false); // stop loading if no access
//     }
//   }, [session?.user]);

//   const fetchFavorites = async () => {
//     try {
//       const response = await fetch("/api/favorites");
//       if (!response.ok) {
//         setFavorites([]);
//         return;
//       }
//       const data = await response.json();
//       setFavorites(data || []);
//     } catch (error) {
//       console.error("Error fetching favorites:", error);
//       setFavorites([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const removeFavorite = async (propertyId: string) => {
//     try {
//       await fetch(`/api/properties/${propertyId}/favorites`, {
//         method: "DELETE",
//       });
//       setFavorites(favorites.filter((p) => p._id !== propertyId));
//     } catch (error) {
//       console.error("Error removing favorite:", error);
//     }
//   };

//   if (isPending || !session?.user) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         Loading...
//       </div>
//     );
//   }

//   if (!hasAccess) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-red-500">
//         You do not have permission to view favorites.
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {isLoading ? (
//           <div className="text-center">Loading favorites...</div>
//         ) : favorites.length === 0 ? (
//           <div className="text-center">
//             <p className="text-muted-foreground mb-4">
//               No saved properties yet.
//             </p>
//             <Link
//               href="/properties"
//               className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90"
//             >
//               Browse Properties
//             </Link>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {favorites.map((property) => (
//               <div
//                 key={property._id}
//                 className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-smooth"
//               >
//                 {property.images?.[0] && (
//                   <div className="w-full h-48 bg-muted relative">
//                     <img
//                       src={property.images[0] || "/placeholder.svg"}
//                       alt={property.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 )}
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold text-foreground mb-2">
//                     {property.title}
//                   </h3>
//                   <p className="text-muted-foreground text-sm mb-3">
//                     {property.location}
//                   </p>
//                   <div className="flex justify-between items-center mb-4">
//                     <span className="text-xl font-bold text-primary">
//                       ${property.price}
//                     </span>
//                     <span className="text-sm text-muted-foreground">
//                       {property.area} sqft
//                     </span>
//                   </div>
//                   <div className="flex gap-2 text-sm text-muted-foreground mb-4">
//                     <span>{property.bedrooms} beds</span>
//                     <span>•</span>
//                     <span>{property.bathrooms} baths</span>
//                   </div>
//                   <div className="flex gap-2">
//                     <Link
//                       href={`/properties/${property._id}`}
//                       className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg text-center hover:bg-primary/90 transition-smooth text-sm"
//                     >
//                       View Details
//                     </Link>
//                     <button
//                       onClick={() => removeFavorite(property._id)}
//                       className="flex-1 bg-destructive/10 text-destructive py-2 rounded-lg hover:bg-destructive/20 transition-smooth text-sm"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }
