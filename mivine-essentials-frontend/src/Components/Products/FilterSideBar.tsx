import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSideBar = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<{
    category: string;
    gender: string;
    color: string;
    size: string[];
    material: string[];
    brand: string[];
    minPrice: number;
    maxPrice: number;
  }& { [key: string]: unknown }>({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 1000,
  });

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 1000,
  });

  const categories = ["TopWear", "Bottom Wear", "Two-piece-wear"]; //what categories to add later ["Footwear", "Accessories", "UnderWear", "Sportswear", "WinterWear"]

  const colors = [
    "Red",
    "Blue",
    "Green",
    "Black",
    "White",
    "Yellow",
    "Pink",
    "Purple",
    "Orange",
    "Gray",
    "Brown",
  ];

  const sizes = ["S", "M", "L", "XL", "XXL"];

  const materials = [
    "Cotton",
    "Polyester",
    "Wool",
    "Silk",
    "Denim",
    "Leather",
    "Linen",
    "Viscose",
    "Fleece",
  ];

  const brands = [
    "Mivine Essentials",
    "ComfyFit",
    "UrbanStyle",
    "SHEIN",
  ];
  //conside adding this brands later ["Nike",
    // "Adidas",
    // "Puma",
    // "Reebok",
    // "Under Armour",
    // "New Balance",
    // "Asics",
    // "Skechers",
    // "Fila",
    // "Converse",]

  const gender = ["Men", "Women"]; //consider adding "Unisex", "Kids" later

  useEffect(() => {
    const params = Object.fromEntries([...searchParam]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: Number(params.minPrice) || 0,
      maxPrice: Number(params.maxPrice) || 100000,
    });
    setPriceRange({
      min: Number(params.minPrice) || 0,
      max: Number(params.maxPrice) || 100000,
    });
  }, [searchParam]);

  interface FilterChangeEventTarget {
    name: string;
    value: string;
    type: string;
    checked: boolean;
  }

  interface FilterChangeEvent {
    target: FilterChangeEventTarget;
  }

  const handleFiltersChange = (e: FilterChangeEvent): void => {
    const { name, value, type, checked } = e.target;
    const newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(Array.isArray(filters[name]) ? filters[name] : []), value];
      } else {
        newFilters[name] = Array.isArray(filters[name])
          ? (filters[name] as string[]).filter((item: string) => item !== value)
          : [];
      }
    } else {
      newFilters[name] = value;
    }
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  interface Filters {
    category: string;
    gender: string;
    color: string;
    size: string[];
    material: string[];
    brand: string[];
    minPrice: number;
    maxPrice: number;
    [key: string]: unknown;
  }

  interface UpdateURLParams {
    (newFilters: Filters): void;
  }

  const updateURLParams: UpdateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && (newFilters[key] as unknown[]).length > 0) {
        params.append(key, (newFilters[key] as string[]).join(","));
      } else if (newFilters[key]) {
        params.append(key, String(newFilters[key]));
      }
    });
    setSearchParam(params);
    navigate(`?${params.toString()}`);
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPriceRange = Number(e.target.value);
    setPriceRange({ min: 0, max: newPriceRange });
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPriceRange };
    setFilters(newFilters);
    updateURLParams(newFilters);
  }

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Filter</h3>

      {/* Category Filter */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2 block">Category</h4>
        {categories.map((category) => (
          <div key={category}>
            <label className="flex items-center mb-1">
              <input
                type="radio"
                name="category"
                value={category}
                onChange={handleFiltersChange}
                checked={filters.category === category}
                className="mr-2 h-4 w-4 text-blue-600 border-gray-200 focus:ring-blue-400"
              />
              <span className="ml-2 text-gray-700">{category}</span>
            </label>
          </div>
        ))}
      </div>

      {/* Gender Filter */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2 block">Gender</h4>
        {gender.map((gender) => (
          <div key={gender}>
            <label className="flex items-center mb-1">
              <input
                type="radio"
                name="gender"
                value={gender}
                onChange={handleFiltersChange}
                checked={filters.gender === gender}
                className="mr-2 h-4 w-4 text-blue-600 border-gray-200 focus:ring-blue-400"
              />
              <span className="ml-2 text-gray-700">{gender}</span>
            </label>
          </div>
        ))}
      </div>

      {/* color filter */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2 block">Color</h4>
        {colors.map((color) => (
          <div key={color}>
            <label className="flex items-center mb-1">
              <input
                type="radio"
                name="color"
                value={color}
                onChange={handleFiltersChange}
                checked={filters.color === color}
                className="mr-2 h-4 w-4 text-blue-600 border-gray-200 focus:ring-blue-400"
              />
              <button
                className="w-4 h-4 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105"
                style={{ backgroundColor: color.toLowerCase() }}
              ></button>
              <span className="ml-2 text-gray-700">{color}</span>
            </label>
          </div>
        ))}
      </div>

      {/* size filter */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2 block">Size</h4>
        {sizes.map((size) => (
          <div key={size}>
            <label className="flex items-center mb-1">
              <input
                type="checkbox"
                name="size"
                value={size}
                className="mr-2 h-4 w-4 text-blue-600 border-gray-200 focus:ring-blue-400"
                onChange={handleFiltersChange}
                checked={filters.size.includes(size)}
              />
              <span className="ml-2 text-gray-700">{size}</span>
            </label>
          </div>
        ))}
      </div>

      {/* material filter */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2 block">Material</h4>
        {materials.map((material) => (
          <div key={material}>
            <label className="flex items-center mb-1">
              <input
                type="checkbox"
                name="material"
                value={material}
                className="mr-2 h-4 w-4 text-blue-600 border-gray-200 focus:ring-blue-400"
                onChange={handleFiltersChange}
                checked={filters.material.includes(material)}
              />
              <span className="ml-2 text-gray-700">{material}</span>
            </label>
          </div>
        ))}
      </div>

      {/* brand filter */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2 block">Brand</h4>
        {brands.map((brand) => (
          <div key={brand}>
            <label className="flex items-center mb-1">
              <input
                type="checkbox"
                name="brand"
                value={brand}
                className="mr-2 h-4 w-4 text-blue-600 border-gray-200 focus:ring-blue-400"
                onChange={handleFiltersChange}
                checked={filters.brand.includes(brand)}
              />
              <span className="ml-2 text-gray-700">{brand}</span>
            </label>
          </div>
        ))}
      </div>

      {/* price range filter */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-600 mb-2 block">Price Range</h4>
        <input
          type="range"
          name="priceRange"
          min="0"
          max="100000"
          step="10"
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          value={priceRange.max}
          onChange={handlePriceRangeChange}
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>₦0</span>
          <span>₦{priceRange.max}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
