
// Using appointments-details-card.tsx without dome data
// "use client";

// import React, { useState, useMemo } from "react";
// import { Search, MapPin, Building2, ChevronLeft, ChevronRight } from "lucide-react";
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
// import AppointmentDetailsCard from "./appointment-details-card";

// const ITEMS_PER_PAGE = 12;

// export default function AppointmentsContent({ canManage }: { canManage: boolean }) {
//   const { data: properties = [], isLoading, error } = useProperties();

//   const [searchQuery, setSearchQuery] = useState("");
//   const [locationFilter, setLocationFilter] = useState("all");
//   const [typeFilter, setTypeFilter] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);

//   const filteredProperties = useMemo(() => {
//     return properties.filter((p: any) => {
//       const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesLoc = locationFilter === "all" || p.location.toLowerCase().includes(locationFilter.toLowerCase());
//       const matchesType = typeFilter === "all" || p.category?.toLowerCase() === typeFilter.toLowerCase();
//       return matchesSearch && matchesLoc && matchesType;
//     });
//   }, [properties, searchQuery, locationFilter, typeFilter]);

//   const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
//   const currentData = filteredProperties.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   if (isLoading) return <Loading />;
//   if (error) return <div className="p-10 text-center text-red-500 font-bold">Failed to load data.</div>;

//   return (
//     <div className="max-w-350 mx-auto px-6 py-6 space-y-4">
//       {/* FILTER BAR */}
//       <div className="flex flex-col md:flex-row gap-3 items-center bg-background p-2 rounded-xl border shadow-sm">
//         <div className="relative flex-1 w-full">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
//           <Input 
//             placeholder="Search properties..." 
//             className="pl-9 h-10 border-none bg-muted/40 rounded-lg text-sm"
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
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* 3-COLUMN GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {currentData.map((property: any) => (
//           <AppointmentDetailsCard key={property._id} canManage={canManage} />
//         ))}
//       </div>

//       {/* PAGINATION */}
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center gap-3 pt-6 pb-8">
//           <Button variant="outline" size="sm" className="h-9 px-4 rounded-lg font-bold" disabled={currentPage === 1} onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo(0,0); }}>
//             <ChevronLeft size={16} className="mr-1" /> Previous
//           </Button>
//           <div className="flex items-center gap-2 px-4 text-xs font-black bg-muted/50 h-9 rounded-lg border">
//             <span className="text-primary">{currentPage}</span> / <span>{totalPages}</span>
//           </div>
//           <Button variant="outline" size="sm" className="h-9 px-4 rounded-lg font-bold" disabled={currentPage === totalPages} onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo(0,0); }}>
//             Next <ChevronRight size={16} className="ml-1" />
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }


