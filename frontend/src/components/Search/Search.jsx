import React, { useState, useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const { clothing_list, url, currency } = useContext(StoreContext);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim()) {
      const results = clothing_list.filter((item) =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for products..."
        className="w-full md:w-96 lg:w-[32rem] border border-gray-800 rounded-lg py-2 px-4 outline-none focus:ring-2 focus:ring-gray-600 transition duration-200 ease-in-out"
      />
      {searchTerm && (
        <div className="absolute z-10 bg-white border border-gray-800 rounded-lg mt-1 w-full md:w-96 lg:w-[32rem] shadow-lg max-h-64 overflow-y-auto">
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <Link
                key={item._id}
                to={`/clothing/${item._id}`}
                className="flex items-center px-4 py-2 hover:bg-gray-100 transition duration-150 ease-in-out"
                onClick={() => setSearchTerm("")}
              >
                <img
                  src={`${url}/images/${item.image}`}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded mr-4"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">Rs. {item.price}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No results found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
