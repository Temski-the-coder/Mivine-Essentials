import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  interface SortChangeEvent {
    target: {
      value: string;
    };
  }

  const handleSortChange = (e: SortChangeEvent) => {
    const sortBy: string = e.target.value;
    searchParam.set("sortBy", sortBy);
    setSearchParam(searchParam);
  };
  return (
    <div className="flex items-center justify-between p-2 bg-gray-100 rounded-lg gap-10">
      <div className="text-gray-700 text-md hero-text">Sort by:</div>
      <select
        id="sort"
        onChange={handleSortChange}
        value={searchParam.get("sortBy") || ""}
        className="border border-gray-500 border-solid rounded px-2 py-1"
      >
        <option value="default">Default</option>
        <option value="price-low-to-high">Price: Low to High</option>
        <option value="price-high-to-low">Price: High to Low</option>
        <option value="newest">Newest Arrivals</option>
      </select>
    </div>
  );
};

export default SortOptions;
