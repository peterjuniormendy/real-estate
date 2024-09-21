const CreateListing = () => {
  const handleSubmit = () => {
    console.log("Form submitted");
  };

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Create a new Listing
      </h1>
      <form
        className="flex flex-col sm:flex-row p-4 gap-4 bg-white rounded-md shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="w-full sm:w-1/2 space-y-3">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 w-full rounded-lg"
            name="name"
            maxLength={120}
            minLength={5}
          />
          <textarea
            placeholder="Description"
            className="border p-3 rounded-lg w-full"
            name="description"
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 w-full rounded-lg"
            name="address"
          />
          <div className="flex gap-4 flex-wrap">
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="sell" id="sell" />
              <label htmlFor="sell" className="cursor-pointer">
                Sell
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="rent" id="rent" />
              <label htmlFor="rent" className="cursor-pointer">
                Rent
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="parking" id="parking" />
              <label htmlFor="parking" className="cursor-pointer">
                Parking spot
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="furnished" id="furnished" />
              <label htmlFor="furnished" className="cursor-pointer">
                Furnished
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="offer" id="offer" />
              <label htmlFor="offer" className="cursor-pointer">
                Offer
              </label>
            </div>
          </div>
          <div className="flex items-center gap-6 flex-wrap">
            <div
              className="flex items-center gap-2
            "
            >
              <input
                type="number"
                id="bedroom"
                min={1}
                className="p-3 border border-gray-300 rounded-lg max-w-32 min-w-12"
              />
              <p>Bedrooms</p>
            </div>
            <div
              className="flex items-center gap-2
            "
            >
              <input
                type="number"
                id="bathroom"
                min={1}
                className="p-3 border border-gray-300 rounded-lg max-w-32 min-w-12"
              />
              <p>Bathrooms</p>
            </div>
            <div
              className="flex items-center gap-2
            "
            >
              <input
                type="number"
                id="regularPrice"
                min={1}
                className="p-3 border border-gray-300 rounded-lg max-w-32 min-w-12"
              />
              <div className="flex gap-2 flex-wrap items-center">
                <p>Regular Price</p>
                <span>($/month)</span>
              </div>
            </div>
            <div
              className="flex items-center gap-2
            "
            >
              <input
                type="number"
                id="discountPrice"
                min={1}
                className="p-3 border border-gray-300 rounded-lg max-w-32 min-w-12"
              />
              <div className="flex gap-2 flex-wrap items-center">
                <p>Discount price</p>
                <span>($/month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 space-y-6">
          <div>
            <p className="font-semibold mb-1">
              Images:
              <span className="font-normal text-gray-600 ml-2">
                The first image will be the cover (max 6)
              </span>
            </p>
            <div className="flex items-center gap-4">
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                className="p-3 border border-gray-300 rounded w-full"
              />
              <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg active:shadow-none disabled:opacity-80">
                Upload
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-slate-700 text-white text-center rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
          >
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
