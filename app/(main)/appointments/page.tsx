"use client";

import { hasPermission, Permission, Role } from "@/lib/rbac";
import { getSession } from "@/lib/client/auth-client";
import AccessDeniedPage from "@/components/access-denied";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import AppointmentsContent from './_components/appointments-content';

function usePermissionCheck() {
  const router = useRouter();
  const [permissions, setPermissions] = useState<{
    canView: boolean | null;
    canManage: boolean;
  }>({ canView: null, canManage: false });

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const { data: session } = await getSession();

        if (!session?.user) {
          router.replace("/login");
          return;
        }

        const role = session.user.role as Role;
        // We check for VIEW_PROPERTIES because this page lists properties to book
        const canView = hasPermission(role, Permission.VIEW_PROPERTIES);
        const canManage = hasPermission(role, Permission.MANAGE_PROPERTIES);

        setPermissions({ canView, canManage });
      } catch (error) {
        console.error("Permission check failed:", error);
        setPermissions({ canView: false, canManage: false });
      }
    };

    checkPermissions();
  }, [router]);

  return permissions;
}

export default function AppointmentsMainPage() {
  const { canView, canManage } = usePermissionCheck();

  if (canView === null) {
    return <Loading />;
  }

  if (!canView) {
    return <AccessDeniedPage />;
  }

  return <AppointmentsContent canManage={canManage} />;
}













// "use client";

// import React, { useState, useMemo } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { 
//   Search, 
//   MapPin, 
//   Building2, 
//   ChevronLeft, 
//   ChevronRight,
//   Banknote, // Added for the price icon
// } from "lucide-react";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";

// import { useProperties } from "@/lib/client/queries/properties.queries";
// import Loading from "@/components/loading";

// // 12 items total: 3 columns x 4 rows
// const ITEMS_PER_PAGE = 12;

// export default function AppointmentsPage() {
//   const router = useRouter();
//   const { data: properties = [], isLoading } = useProperties();

//   const [searchQuery, setSearchQuery] = useState("");
//   const [locationFilter, setLocationFilter] = useState("all");
//   const [typeFilter, setTypeFilter] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);

//   const filteredProperties = useMemo(() => {
//     return properties.filter((property: any) => {
//       const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesLocation = locationFilter === "all" || property.location.toLowerCase().includes(locationFilter.toLowerCase());
//       const matchesType = typeFilter === "all" || property.category?.toLowerCase() === typeFilter.toLowerCase();
//       return matchesSearch && matchesLocation && matchesType;
//     });
//   }, [properties, searchQuery, locationFilter, typeFilter]);

//   const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
//   const currentData = filteredProperties.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   const getStatusColor = (status: string) => {
//     switch (status?.toLowerCase()) {
//       case "sold": return "bg-red-50 text-red-700 border-red-200";
//       case "booked": return "bg-amber-50 text-amber-700 border-amber-200";
//       default: return "bg-emerald-50 text-emerald-700 border-emerald-200";
//     }
//   };

//   if (isLoading) return <Loading />;

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-6 space-y-4 min-h-screen font-sans antialiased">
      
//       {/* SEARCH & FILTERS */}
//       <div className="flex flex-col md:flex-row gap-3 items-center bg-background p-2 rounded-xl border shadow-sm">
//         <div className="relative flex-1 w-full">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
//           <Input 
//             placeholder="Search properties..." 
//             className="pl-9 h-10 border-none bg-muted/40 focus-visible:ring-1 rounded-lg text-sm"
//             value={searchQuery}
//             onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
//           />
//         </div>

//         <div className="flex gap-2 w-full md:w-auto">
//           <Select onValueChange={(v) => { setLocationFilter(v); setCurrentPage(1); }}>
//             <SelectTrigger className="w-full md:w-45 h-10 rounded-lg text-xs font-bold">
//               <MapPin className="mr-2 h-3.5 w-3.5 text-primary" />
//               <SelectValue placeholder="Location" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Locations</SelectItem>
//               <SelectItem value="Kathmandu">Kathmandu</SelectItem>
//               <SelectItem value="Bhaktapur">Bhaktapur</SelectItem>
//               <SelectItem value="Lalitpur">Lalitpur</SelectItem>
//             </SelectContent>
//           </Select>

//           <Select onValueChange={(v) => { setTypeFilter(v); setCurrentPage(1); }}>
//             <SelectTrigger className="w-full md:w-45 h-10 rounded-lg text-xs font-bold">
//               <Building2 className="mr-2 h-3.5 w-3.5 text-primary" />
//               <SelectValue placeholder="Property Type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Types</SelectItem>
//               <SelectItem value="House">House</SelectItem>
//               <SelectItem value="Apartment">Apartment</SelectItem>
//               <SelectItem value="Land">Land</SelectItem>
//               <SelectItem value="Colony">Colony</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* PROPERTY GRID: 3 Columns per row */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {currentData.map((property: any) => (
//           <Card key={property._id} className="group overflow-hidden rounded-2xl border-border/50 shadow-sm hover:shadow-md transition-all duration-300 bg-card">
            
//             {/* PHOTO */}
//             <div 
//               className="relative aspect-16/10 cursor-pointer overflow-hidden"
//               onClick={() => router.push(`/properties/${property._id}`)}
//             >
//               <Image
//                 src={property.images?.[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa"}
//                 alt={property.title}
//                 fill
//                 className="object-cover transition-transform duration-500 group-hover:scale-105"
//               />
//               <div className="absolute top-3 left-3">
//                 <Badge variant="secondary" className="bg-black/60 text-white text-[10px] py-0.5 px-2 backdrop-blur-md border-none shadow-sm font-bold">
//                   ID: {property._id.slice(-5).toUpperCase()}
//                 </Badge>
//               </div>
//             </div>

//             <CardContent className="p-3.5 space-y-2">
//               {/* BOX 1: TITLE */}
//               <div className="bg-muted/30 p-2 rounded-lg border border-border/40">
//                 <h3 className="font-bold text-xs tracking-wide line-clamp-1 text-foreground uppercase">
//                   {property.title}
//                 </h3>
//               </div>

//               {/* BOX 2: LOCATION */}
//               <div className="bg-muted/30 p-2 rounded-lg border border-border/40 flex items-center">
//                 <MapPin size={14} className="mr-2 text-destructive shrink-0" />
//                 <span className="text-[11px] font-bold truncate uppercase text-muted-foreground">{property.location}</span>
//               </div>

//               {/* BOX 3: PRICE (New separate box) */}
//               <div className="bg-muted/30 p-2 rounded-lg border border-border/40 flex items-center">
//                 <Banknote size={14} className="mr-2 text-primary shrink-0" />
//                 <span className="text-[11px] font-black text-primary uppercase">
//                   NPR. {new Intl.NumberFormat("en-IN").format(property.price)}
//                 </span>
//               </div>

//               {/* ACTIONS & STATUS ROW */}
//               <div className="flex gap-2 pt-1">
//                 <Button 
//                   size="sm"
//                   className="flex-2 h-9 rounded-lg font-black text-[10px] uppercase tracking-widest"
//                   onClick={() => router.push(`/appointments/new?propertyId=${property._id}`)}
//                 >
//                   Buy Now
//                 </Button>
                
//                 <div className={cn(
//                   "flex-1 flex items-center justify-center h-9 rounded-lg border text-[10px] font-black uppercase tracking-tighter",
//                   getStatusColor(property.status)
//                 )}>
//                   {property.status || "Available"}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* PAGINATION */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center gap-3 pt-6 pb-8">
//           <Button
//             variant="outline"
//             size="sm"
//             className="h-9 px-4 rounded-lg font-bold"
//             disabled={currentPage === 1}
//             onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo(0,0); }}
//           >
//             <ChevronLeft size={16} className="mr-1" /> Previous
//           </Button>
          
//           <div className="flex items-center gap-2 px-4 text-xs font-black bg-muted/50 h-9 rounded-lg border">
//             <span className="text-primary">{currentPage}</span>
//             <span className="text-muted-foreground">/</span>
//             <span>{totalPages}</span>
//           </div>

//           <Button
//             variant="outline"
//             size="sm"
//             className="h-9 px-4 rounded-lg font-bold"
//             disabled={currentPage === totalPages}
//             onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo(0,0); }}
//           >
//             Next <ChevronRight size={16} className="ml-1" />
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }




































// export default function AppointmentsPage({}) {
//   return <div>Appointments Page</div>;
// }



