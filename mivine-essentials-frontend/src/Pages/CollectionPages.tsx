import { useState, useEffect, useRef, useMemo } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSideBar from "../Components/Products/FilterSideBar";
import ProductGrid from "../Components/Products/ProductGrid";
import SortOptions from "../Components/Products/SortOptions";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../Redux/Store";

import { useSelector } from "react-redux";
import { fetchProductsByFilters } from "../Redux/Slices/productsSlice";

const CollectionPages = () => {
  const {collection} = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);
  const queryParams = useMemo(() => Object.fromEntries([...searchParams]), [searchParams]);
  console.log("Query Params:", queryParams);
  console.log("Collection Param:", collection);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilters({
      ...queryParams,
      collection
    }));
  }, [dispatch, collection, searchParams]);

  const toggleSidebar = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.stopPropagation();
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isSidebarOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSidebarOpen]);

  
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter /> Filter
      </button>

      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && <div className="fixed inset-0 z-40 lg:hidden" />}

      {/* Desktop Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 z-50 lg:translate-x-0 lg:static`}
      >
        <FilterSideBar />
      </div>

      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collections</h2>

        {/* Sort Options */}
        <SortOptions />

        {/* ProductGrid */}
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPages;
