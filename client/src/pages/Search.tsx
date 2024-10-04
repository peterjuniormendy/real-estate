const Search = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="space-y-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <label
                className="font-semibold whitespace-nowrap"
                htmlFor="search"
              >
                Search Property
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search..."
                className="border rounded-lg p-3 w-full"
              />
            </div>
            <div className="flex gap-2 items-center flex-wrap">
              <label htmlFor="" className="font-semibold">
                Type:
              </label>
              <div>
                <input type="checkbox" id="all" name="all" className="w-5" />
                <span>Rent & Sale</span>
              </div>
              <div>
                <input type="checkbox" id="rent" name="rent" className="w-5" />
                <span>Rent</span>
              </div>
              <div>
                <input type="checkbox" id="sale" name="sale" className="w-5" />
                <span>Sale</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="offer"
                  name="offer"
                  className="w-5"
                />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex gap-2 items-center flex-wrap">
              <label htmlFor="" className="font-semibold">
                Armenities:
              </label>
              <div>
                <input
                  type="checkbox"
                  id="parking"
                  name="parking"
                  className="w-5"
                />
                <span>Parking</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="furnished"
                  name="furnished"
                  className="w-5"
                />
                <span>Furnished</span>
              </div>
            </div>
            <div className="flex gap-2 items-center flex-wrap">
              <label className="font-semibold">Sort: </label>
              <select
                id="sort_order"
                className="border rounded-lg p-3 flex-1 bg-slate-200"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="price-asc">Price low to high</option>
                <option value="price-desc">Price high to low</option>
              </select>
            </div>
          </div>
          <button className="bg-slate-700 text-white p-3 uppercase hover:opacity-95 w-full rounded-lg ">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <div className="w-full border-b p-2">
          <h1 className="text-3xl font-semibold p-3 text-slate-700">
            Listing results
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Search;
