import { hotelFacilities } from "../config/hotel-options-config";

type Props = {
  selectedfacility: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({ onChange, selectedfacility }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Facilities</h4>
      {hotelFacilities.map((facility) => (
        <label htmlFor="" className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={facility}
            checked={selectedfacility.includes(facility)}
            onChange={onChange}
          />
          <span>{facility}</span>
        </label>
      ))}
    </div>
  );
};

export default FacilitiesFilter;
