import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Filter, ChevronDown, ArrowUpDown, Search } from 'lucide-react';
import { vehicles } from '../data/vehicles';
import { CurrencyDisplayCompact } from '../components/CurrencyDisplay';
import type { Vehicle } from '../types';

gsap.registerPlugin(ScrollTrigger);

type SortOption = 'price-asc' | 'price-desc' | 'newest';
type FilterModel = 'all' | 'model-3' | 'model-y' | 'model-s' | 'model-x' | 'cybertruck';

export default function Inventory() {
 const [sortBy, setSortBy] = useState<SortOption>('price-asc');
 const [filterModel, setFilterModel] = useState<FilterModel>('all');
 const [filterYear, setFilterYear] = useState<string>('all');
 const [filterMileage, setFilterMileage] = useState<string>('all');
 const [showFilters, setShowFilters] = useState(false);
 const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(vehicles);

 const headerRef = useRef<HTMLDivElement>(null);
 const gridRef = useRef<HTMLDivElement>(null);

 // Apply filters and sorting
 useEffect(() => {
  let result = [...vehicles];

  // Filter by model
  if (filterModel !== 'all') {
   result = result.filter((v) => v.id === filterModel);
  }

  // Filter by year
  if (filterYear !== 'all') {
   const year = parseInt(filterYear);
   result = result.filter((v) => {
    const yearStart = parseInt(v.yearRange.split('–')[0] || '0');
    const yearEnd = parseInt(v.yearRange.split('–')[1] || String(yearStart));
    return year >= yearStart && year <= yearEnd;
   });
  }

  // Filter by mileage
  if (filterMileage !== 'all') {
   result = result.filter((v) => {
    const mileageNum = parseInt(v.mileageRange.replace(/[^0-9]/g, ''));
    if (filterMileage === 'under-30k') return mileageNum <= 30;
    if (filterMileage === 'under-50k') return mileageNum <= 50;
    if (filterMileage === 'under-100k') return mileageNum <= 100;
    return true;
   });
  }

  // Sort
  result.sort((a, b) => {
   if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
   if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
   if (sortBy === 'newest') {
    const yearA = parseInt(a.yearRange.split('–')[1] || a.yearRange.split('–')[0]);
    const yearB = parseInt(b.yearRange.split('–')[1] || b.yearRange.split('–')[0]);
    return yearB - yearA;
   }
   return 0;
  });

  setFilteredVehicles(result);
 }, [sortBy, filterModel, filterYear, filterMileage]);

 // Animations
 useEffect(() => {
  const ctx = gsap.context(() => {
   gsap.fromTo(
    headerRef.current,
    { y: 30, opacity: 0 },
    {
     y: 0,
     opacity: 1,
     duration: 0.8,
     ease: 'power2.out',
     scrollTrigger: {
      trigger: headerRef.current,
      start: 'top 85%',
     },
    }
   );

   gsap.fromTo(
    '.inventory-card',
    { y: 40, opacity: 0 },
    {
     y: 0,
     opacity: 1,
     stagger: 0.08,
     duration: 0.6,
     ease: 'power2.out',
     scrollTrigger: {
      trigger: gridRef.current,
      start: 'top 85%',
     },
    }
   );
  });

  return () => ctx.revert();
 }, [filteredVehicles]);

 return (
  <div className="min-h-screen bg-[#F6F7F9] pt-24 md:pt-32 pb-20">
   <div className="velore-container">
    {/* Header */}
    <div ref={headerRef} className="mb-8">
     <span className="velore-micro text-[#6B7280] mb-3 block">
      Current Inventory
     </span>
     <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <h1 className="velore-heading-lg text-[#111111]">
       Available Vehicles
      </h1>
      <p className="text-sm text-[#6B7280]">
       {filteredVehicles.length} vehicle{filteredVehicles.length !== 1 ? 's' : ''} available
      </p>
     </div>
    </div>

    {/* Filters & Sort */}
    <div className="mb-8">
     <div className="flex flex-wrap items-center gap-3">
      {/* Filter Toggle */}
      <button
       onClick={() => setShowFilters(!showFilters)}
       className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
        showFilters
         ? 'bg-[#111111] text-white'
         : 'bg-white text-[#111111] border border-[#EAEAEA] hover:border-[#111111]'
       }`}
      >
       <Filter className="w-4 h-4" strokeWidth={1.5} />
       Filters
      </button>

      {/* Sort Dropdown */}
      <div className="relative">
       <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as SortOption)}
        className="appearance-none px-4 py-2.5 pr-10 bg-white border border-[#EAEAEA] text-sm font-medium text-[#111111] hover:border-[#111111] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2F8E92]/20"
       >
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="newest">Recently Added</option>
       </select>
       <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
      </div>

      {/* Clear Filters */}
      {(filterModel !== 'all' || filterYear !== 'all' || filterMileage !== 'all') && (
       <button
        onClick={() => {
         setFilterModel('all');
         setFilterYear('all');
         setFilterMileage('all');
        }}
        className="text-sm text-[#2F8E92] hover:text-[#267a7d] transition-colors"
       >
        Clear filters
       </button>
      )}
     </div>

     {/* Filter Panel */}
     {showFilters && (
      <div className="mt-4 p-6 bg-white border border-[#EAEAEA] animate-fade-in">
       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Model Filter */}
        <div>
         <label className="block text-xs font-medium text-[#6B7280] mb-2">
          Model
         </label>
         <select
          value={filterModel}
          onChange={(e) => setFilterModel(e.target.value as FilterModel)}
          className="w-full px-4 py-2.5 bg-[#F6F7F9] border border-[#EAEAEA] text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#2F8E92]/20"
         >
          <option value="all">All Models</option>
          <option value="model-3">Model 3</option>
          <option value="model-y">Model Y</option>
          <option value="model-s">Model S</option>
          <option value="model-x">Model X</option>
          <option value="cybertruck">Cybertruck</option>
         </select>
        </div>

        {/* Year Filter */}
        <div>
         <label className="block text-xs font-medium text-[#6B7280] mb-2">
          Year
         </label>
         <select
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="w-full px-4 py-2.5 bg-[#F6F7F9] border border-[#EAEAEA] text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#2F8E92]/20"
         >
          <option value="all">All Years</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
         </select>
        </div>

        {/* Mileage Filter */}
        <div>
         <label className="block text-xs font-medium text-[#6B7280] mb-2">
          Mileage
         </label>
         <select
          value={filterMileage}
          onChange={(e) => setFilterMileage(e.target.value)}
          className="w-full px-4 py-2.5 bg-[#F6F7F9] border border-[#EAEAEA] text-sm text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#2F8E92]/20"
         >
          <option value="all">All Mileage</option>
          <option value="under-30k">Under 30,000 km</option>
          <option value="under-50k">Under 50,000 km</option>
          <option value="under-100k">Under 100,000 km</option>
         </select>
        </div>
       </div>
      </div>
     )}
    </div>

    {/* Vehicles Grid */}
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     {filteredVehicles.map((vehicle) => (
      <Link
       key={vehicle.id}
       to={`/inventory/${vehicle.id}`}
       className="inventory-card group velore-card overflow-hidden"
      >
       {/* Image */}
       <div className="relative aspect-[4/3] overflow-hidden">
        <img
         src={vehicle.image}
         alt={vehicle.model}
         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <div className="absolute top-3 left-3">
         <span
          className={`px-3 py-1 text-xs font-medium ${
           vehicle.status === 'available'
            ? 'bg-[#2F8E92] text-white'
            : vehicle.status === 'limited'
            ? 'bg-amber-500 text-white'
            : 'bg-[#6B7280] text-white'
          }`}
         >
          {vehicle.status === 'available'
           ? 'Available Now'
           : vehicle.status === 'limited'
           ? 'Limited Allocation'
           : 'Reserved'}
         </span>
        </div>
       </div>

       {/* Content */}
       <div className="p-5">
        <h3 className="text-base font-semibold text-[#111111] mb-1">
         {vehicle.model}
        </h3>
        <p className="text-xs text-[#6B7280] mb-3">{vehicle.variant}</p>

        <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-4">
         <span>{vehicle.yearRange}</span>
         <span className="w-1 h-1 bg-[#6B7280]" />
         <span>{vehicle.mileageRange}</span>
        </div>

        <CurrencyDisplayCompact usdPrice={vehicle.startingPrice} />

        <p className="mt-4 text-xs text-[#6B7280] italic">
         Verified through our sourcing network. Reservation required.
        </p>

        <div className="mt-4 pt-4 border-t border-[#EAEAEA]">
         <span className="inline-flex items-center text-sm font-medium text-[#2F8E92] group-hover:text-[#267a7d] transition-colors">
          View Details
          <ArrowUpDown className="w-4 h-4 ml-1" strokeWidth={1.5} />
         </span>
        </div>
       </div>
      </Link>
     ))}
    </div>

    {/* Empty State */}
    {filteredVehicles.length === 0 && (
     <div className="text-center py-20">
      <Search className="w-12 h-12 text-[#EAEAEA] mx-auto mb-4" strokeWidth={1.5} />
      <h3 className="text-lg font-semibold text-[#111111] mb-2">
       No vehicles found
      </h3>
      <p className="text-sm text-[#6B7280] mb-4">
       Try adjusting your filters to see more results.
      </p>
      <button
       onClick={() => {
        setFilterModel('all');
        setFilterYear('all');
        setFilterMileage('all');
       }}
       className="velore-btn-secondary"
      >
       Clear all filters
      </button>
     </div>
    )}
   </div>
  </div>
 );
}
