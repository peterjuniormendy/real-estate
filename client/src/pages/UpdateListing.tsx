import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getListing, updateListing } from "../controllers/listingController";

const UpdateListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const firebaseUser = auth.currentUser;
  const { user } = useAppSelector((state) => state.user);
  const { currentListing } = useAppSelector((state) => state.listings);
  const [files, setFiles] = useState<FileList | null>(null);
  const [formData, setFormData] = useState({
    imageUrls: [] as string[],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
    userRef: user._id,
  });
  const [uploadError, setUploadError] = useState<string>("");
  const [isUploading, setIsUpLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload atleast one image.");
      if (+formData?.regularPrice < +formData?.discountPrice)
        return setError("Discount price must be lower than regular price");

      setLoading(true);
      setError("");
      const data = await updateListing(formData, id, dispatch);
      console.log("Data", data);
      setLoading(false);
      if (data?.success) {
        navigate(`/listing/${data?.data._id}`);
      } else {
        setError("");
      }
    } catch (error) {
      setLoading(false);
      setError("Failed to update listing");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      if (name === "rent" || name === "sale") {
        setFormData((prev) => ({ ...prev, type: name }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async () => {
    setUploadError("");
    if (
      files !== null &&
      files.length > 0 &&
      files.length + formData.imageUrls.length < 7
    ) {
      try {
        setIsUpLoading(true);
        const images = [];
        for (let i = 0; i < files.length; i++) {
          images.push(storeImage(files[i]));
        }

        const urls = await Promise.all(images);
        setFormData((prev) => ({
          ...prev,
          imageUrls: prev.imageUrls.concat(urls),
        }));
      } catch (error) {
        setUploadError("Image upload failed");
        console.error("Error uploading images:", error);
      }
    } else {
      if (formData.imageUrls.length === 0) {
        setUploadError("Please select at least one image");
      } else if (formData.imageUrls.length === 6) {
        setUploadError("You can not upload more than 6 images per listing");
      } else {
        setUploadError("");
      }
    }
    setIsUpLoading(false);
  };

  const storeImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = async (index: number) => {
    // Capture the image URL before state update
    const imageUrlToDelete = formData.imageUrls[index];

    // remove image from formData imageUrl in index
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));

    // remove image from storage
    if (firebaseUser) {
      const storage = getStorage(app);
      const storageRef = ref(storage, imageUrlToDelete);
      deleteObject(storageRef)
        .then(() => {
          setUploadError("Image deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting image:", error);
          setUploadError("Error deleting image");
        });
    } else {
      navigate("/login");
    }
  };

  const fetchListing = async () => {
    try {
      await getListing(id, dispatch);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("current lisiting", currentListing);

  useEffect(() => {
    fetchListing();
  }, []);

  useEffect(() => {
    if (currentListing) {
      setFormData({
        ...currentListing,
        imageUrls: [...currentListing.imageUrls],
      });
    }
  }, [currentListing]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUploadError("");
      setError("");
    }, 6000);
    return () => clearTimeout(timer);
  }, [uploadError, error]);

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Update Listing
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
            value={formData.name}
            onChange={handleInputChange}
          />
          <textarea
            placeholder="Description"
            className="border p-3 rounded-lg w-full"
            name="description"
            value={formData.description}
            onChange={handleTextAreaChange}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 w-full rounded-lg"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <div className="flex gap-4 flex-wrap">
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="sale"
                id="sale"
                checked={formData.type === "sale"}
                onChange={handleInputChange}
              />
              <label htmlFor="sale" className="cursor-pointer">
                Sale
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="rent"
                id="rent"
                checked={formData.type === "rent"}
                onChange={handleInputChange}
              />
              <label htmlFor="rent" className="cursor-pointer">
                Rent
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                checked={formData.parking}
                onChange={handleInputChange}
              />
              <label htmlFor="parking" className="cursor-pointer">
                Parking spot
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                checked={formData.furnished}
                onChange={handleInputChange}
              />
              <label htmlFor="furnished" className="cursor-pointer">
                Furnished
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="offer"
                id="offer"
                checked={formData.offer}
                onChange={handleInputChange}
              />
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
                id="bedrooms"
                name="bedrooms"
                min={1}
                value={formData.bedrooms}
                onChange={handleInputChange}
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
                id="bathrooms"
                name="bathrooms"
                min={1}
                value={formData.bathrooms}
                onChange={handleInputChange}
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
                name="regularPrice"
                min={1}
                value={formData.regularPrice}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-lg max-w-32 min-w-12"
              />
              <div className="flex gap-2 flex-wrap items-center">
                <p>Regular Price</p>
                <span>($/month)</span>
              </div>
            </div>
            {formData.offer && (
              <div
                className="flex items-center gap-2
              "
              >
                <input
                  type="number"
                  id="discountPrice"
                  name="discountPrice"
                  min={0}
                  value={formData.discountPrice}
                  onChange={handleInputChange}
                  className="p-3 border border-gray-300 rounded-lg max-w-32 min-w-12"
                />
                <div className="flex gap-2 flex-wrap items-center">
                  <p>Discount price</p>
                  <span>($/month)</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full sm:w-1/2 space-y-6">
          {uploadError && (
            <div className="w-full bg-red-200 text-red-400 py-2 text-center">
              <p>{uploadError}</p>
            </div>
          )}
          <div>
            <p className="font-semibold mb-1">
              Images:
              <span className="font-normal text-gray-600 ml-2">
                The first image will be the cover (max 6)
              </span>
            </p>
            <div className="flex items-center gap-4">
              <input
                onChange={(e) => setFiles(e.target.files)}
                type="file"
                name="files"
                accept="image/*"
                multiple
                className="p-3 border border-gray-300 rounded w-full"
              />
              <button
                type="button"
                disabled={isUploading || loading}
                onClick={handleImageUpload}
                className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg active:shadow-none disabled:opacity-80"
              >
                {isUploading ? "Uploading" : "Upload"}
              </button>
            </div>
          </div>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between items-center shadow p-3"
              >
                <img
                  src={url}
                  alt="list property image"
                  className="w-32 h-20 object-contain rounded-lg "
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-4 bg-red-300 rounded-sm shadow-lg active:shadow-none"
                >
                  <FaTrash className="text-red-600" />
                </button>
              </div>
            ))}

          {error && (
            <div className="w-full bg-red-200 text-red-400 py-2 text-center">
              <p>{error}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={loading || isUploading}
            className="w-full bg-slate-700 text-white text-center rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Create Listing"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default UpdateListing;
