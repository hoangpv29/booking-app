import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";

const Search = () => {
  const search = useSearchContext();

  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");
  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacility,
    maxPrice: selectedPrice?.toString(),
    sortOption: sortOption,
  };
  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );
  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;
    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };
  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelTypes = event.target.value;
    setSelectedHotelTypes((prevhotelTypes) =>
      event.target.checked
        ? [...prevhotelTypes, hotelTypes]
        : prevhotelTypes.filter((hotelType) => hotelType !== hotelTypes)
    );
  };
  const handlefacilitiesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const facilities = event.target.value;
    setSelectedFacility((prevfacilities) =>
      event.target.checked
        ? [...prevfacilities, facilities]
        : prevfacilities.filter((facility) => facility !== facilities)
    );
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          {/* {todo filter} */}
          <StarRatingFilter
            onChange={handleStarsChange}
            selectedStars={selectedStars}
          />
          <HotelTypesFilter
            onChange={handleHotelTypeChange}
            selectedHotelTypes={selectedHotelTypes}
          />
          <FacilitiesFilter
            onChange={handlefacilitiesChange}
            selectedfacility={selectedFacility}
          />
          <PriceFilter
            onChange={(value?: number) => setSelectedPrice(value)}
            selectedPrice={selectedPrice}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 ">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          {/* {todo sort option} */}
          <select
            className="p-2 border rounded-sm"
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (Low to high)
            </option>
            <option value="pricePerNightDesc">
              Price Per Night (High to low)
            </option>
          </select>
        </div>{" "}
        {hotelData?.data.map((hotel) => (
          <SearchResultsCard hotel={hotel} />
        ))}
        <Pagination
          pages={hotelData?.pagination.pages || 1}
          page={hotelData?.pagination.page || 1}
          onPageChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default Search;
