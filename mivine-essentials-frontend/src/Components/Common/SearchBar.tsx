import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoEnterOutline } from "react-icons/io5";
import { TbShoppingCartSearch } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProductsByFilters, setFilters } from "../../Redux/Slices/productsSlice";
import type { AppDispatch } from "../../Redux/Store";

type SearchBarProps = {
  onSearch?: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = () => {
  const [searchSection, setSearchSection] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setOpenSearch(!openSearch);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      dispatch(setFilters({ search: searchSection }));
      dispatch(fetchProductsByFilters({ search: searchSection }));
      navigate(`/collections/all?search=${searchSection}`);
      setOpenSearch(false);
    };
    
  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        openSearch
          ? "absolute top-0 left-0 w-full bg-white h-24 z-50"
          : "w-auto"
      }`}
    >
      {openSearch ? (
        <form
          onSubmit={handleSearch}
          className="relative flex items-center justify-center w-full"
        >
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search"
              value={searchSection}
              onChange={(e) => setSearchSection(e.target.value)}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg text-gray-700 focus:outline-none w-full"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
            >
              <TbShoppingCartSearch className="h-6 w-6" />
            </button>
          </div>
          <button
            type="button"
            onClick={handleSearchToggle}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-blue-700"
          >
            <IoEnterOutline className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <FaSearch className="h-5 w-5 text-gray-600" />
        </button>
      )}
    </div>
  );
};
export default SearchBar;
