import axios from "axios";
import ImageField from "./ImageField";
import TagSelector from "./TagSelector";
import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import { message } from "antd";
import { AuthContext } from "../../../../../../sharedPages/Context/AuthProvider";

const AddRoom = () => {
  const {handleLogout} = useContext(AuthContext)
  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    subTitleRoomOneEn: '',
    subTitleRoomOneAr: '',
    maxGuests: 0,
    roomQTY: 0,
    size: 0,
    descriptionEn: '',
    descriptionAR: '',
    price: 0,
    priceHistory: null,
    tags:'Regular',
    images:[]
  });
  const [formErrors, setFormErrors] = useState({});

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Optionally clear errors when user starts correcting them
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  
  const handleTags = (selectedTags) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      tags: selectedTags 
    }));
  };
  
  const handleImagesChange = (newImageUrls) => {
    
    setFormData(prevFormData => ({
      ...prevFormData,
      images: newImageUrls.filter(url => url !== '') 
    }));
  };

  // Validation function
  const validateForm = () => {
    let errors = {};
    if (formData.titleEn.trim() === '') {
      errors.titleEn = 'English title is required.';
    }
    if (formData.titleAr.trim() === '') {
      errors.titleAr = 'Arabic title is required.';
    }
    if (formData.subTitleRoomOneEn.trim() === '') {
      errors.subTitleRoomOneEn = 'Sub title is required.';
    }
    if (formData.subTitleRoomOneAr.trim() === '') {
      errors.subTitleRoomOneAr = 'Arabic sub title is required.';
    }

    if (!formData.maxGuests) {
      errors.maxGuests = 'Max number of guests is required.';
    }
    if (!formData.roomQTY) {
      errors.roomQTY = 'Room quantity is required.';
    }
    if (!formData.size) {
      errors.size = 'Room size is required.';
    }
    if (!formData.price) {
      errors.price = 'Price per night is required.';
    }
    
    if (formData.descriptionEn.trim() === '') {
      errors.descriptionEn = 'Arabic sub title is required.';
    }
    if (formData.descriptionAR.trim() === '') {
      errors.descriptionAR = 'Arabic sub title is required.';
    }
    
    // Add other necessary validations here
    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const processDataForSubmission = (formData) => {
    const processedData = {
      title: {
        en: formData.titleEn.trim(),
        ar: formData.titleAr.trim()
      },
      subTitle: {
        roomOne: {
          en: formData.subTitleRoomOneEn.trim(),
          ar: formData.subTitleRoomOneAr.trim()
        }
      },
      description: {
        en: formData.descriptionEn.trim(),
        ar: formData.descriptionAR.trim()
      },
      maxGuests: parseInt(formData.maxGuests, 10), 
      roomQTY: parseInt(formData.roomQTY, 10), 
      size: parseInt(formData.size, 10), 
      price: parseInt(formData.price, 10), 
      images: formData.images, 
      priceOptions: [
        {
          price: parseInt(formData.price, 10),
          
        }
      ],
      tags: formData.tags, 
      priceHistory: formData.priceHistory ? parseInt(formData.priceHistory, 10) : undefined 
    };

    
    if (processedData.priceHistory === undefined) {
      delete processedData.priceHistory;
    }

    return processedData;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = localStorage.getItem('token');
    if (!token) {
      message.error('No token found, please log in.');
      return;
    }

    let decodedToken;
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {
      console.error('Failed to decode token', error);
      message.error('Invalid token.');
      return;
    }

    // Check token expiration and admin role
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decodedToken.exp < currentTime) {
      
      message.error('Session has expired. Please log in again.');
      handleLogout()
      return;
    }

  
    if (decodedToken.role !== 'admin') {
        message.error('You are not authorized to delete this room.');
        return;
    }
    
    const processedData = processDataForSubmission(formData);
    // const url = 'http://localhost:5000/api/room/create';
    const url = 'https://server.awalivhotel.com/api/room/create';
    // const url = 'https://type-script-server.vercel.app/api/room/create';
    try {
      const response = await axios.post(url, processedData, {
        headers: {
          Authorization: `${token}`
        }
      });
      message.success(`${response.data.message}`);
      // Handle further actions like redirecting or showing a success message
    } catch (error) {
      console.error('Error posting data:', error);
      message.error(`${error.response.data.issues[0].message}`);
      // Handle errors like showing error message to user
    }
  };


  return (
    <section>
      <>
        <form className="space-y-6  p-4 rounded shadow-lg max-w-3xl mx-auto my-8  border-stroke bg-white  dark:border-strokedark dark:bg-boxdark" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-center mb-4">Room Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label htmlFor="titleEn" className="block text-sm font-medium  text-black dark:text-white">
                Title (EN) <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                id="titleEn"
                name="titleEn"
                value={formData.titleEn}
                onChange={handleChange}
                className="mt-1 block py-2 px-2 w-full border  border-gray-300 shadow-sm text-black outline-none transition  dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
              {formErrors.titleEn && <p className="text-red-500 text-xs mt-1">{formErrors.titleEn}</p>}
            </div>

            <div>
              <label htmlFor="titleAr" className="block text-sm font-medium text-black dark:text-white">
                Title (AR) <span className="text-meta-1">*</span>
              </label>
              <input
                dir="rtl"
                type="text"
                id="titleAr"
                name="titleAr"
                value={formData.titleAr}
                onChange={handleChange}
                className="mt-1 block py-2 px-2 w-full  border border-gray-300 shadow-sm text-black outline-none transition    dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
              {formErrors.titleAr && <p className="text-red-500 text-xs mt-1">{formErrors.titleAr}</p>}
            </div>

            {/* SubTitle */}
            <div>
              <label htmlFor="subTitleRoomOneEn" className="block text-sm font-medium text-black dark:text-white">
                SubTitle Room One (EN)<span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                id="subTitleRoomOneEn"
                name="subTitleRoomOneEn"
                value={formData.subTitleRoomOneEn}
                onChange={handleChange}
                className="mt-1 block py-2 px-2 w-full  border border-gray-300 shadow-sm text-black outline-none transition  dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
              {formErrors.subTitleRoomOneEn && <p className="text-red-500 text-xs mt-1">{formErrors.subTitleRoomOneEn}</p>}
            </div>

            <div>
              <label htmlFor="subTitleRoomOneAr" className="block text-sm font-medium text-black dark:text-white">
                SubTitle Room One (AR)<span className="text-meta-1">*</span>
              </label>
              <input
                dir="rtl"
                type="text"
                id="subTitleRoomOneAr"
                name="subTitleRoomOneAr"
                value={formData.subTitleRoomOneAr}
                onChange={handleChange}
                className="mt-1 block py-2 px-2 w-full  border border-gray-300 shadow-sm text-black outline-none transition  dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
              {formErrors.subTitleRoomOneAr && <p className="text-red-500 text-xs mt-1">{formErrors.subTitleRoomOneAr}</p>}
            </div>

            {/* Max Guests */}
            <div>
              <label htmlFor="maxGuests" className="block text-sm font-medium text-black dark:text-white">
                Max Guests <span className="text-meta-1">*</span>
              </label>
              <input
                type="number"
                id="maxGuests"
                name="maxGuests"
                value={formData.maxGuests}
                onChange={handleChange}
                className="mt-1 block py-2 px-2 w-full  border border-gray-300 shadow-sm text-black outline-none transition  dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
             {formErrors.maxGuests && <p className="text-red-500 text-xs mt-1">{formErrors.maxGuests}</p>}

            </div>

            {/* Room Quantity */}
            <div>
              <label htmlFor="roomQTY" className="block text-sm font-medium text-black dark:text-white">
                Room Quantity <span className="text-meta-1">*</span>
              </label>
              <input
                type="number"
                id="roomQTY"
                name="roomQTY"
                value={formData.roomQTY}
                onChange={handleChange}
                className="mt-1 block py-2 px-2 w-full  border border-gray-300 shadow-sm text-black outline-none transition  dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
              {formErrors.roomQTY && <p className="text-red-500 text-xs mt-1">{formErrors.roomQTY}</p>}
            </div>

            {/* Room Size */}
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-black dark:text-white">
                Room Size <span className="text-meta-1">*</span>
              </label>
              <input
                type="number"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="mt-1 block py-2 px-2 w-full  border border-gray-300 shadow-sm text-black outline-none transition  dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
              {formErrors.size && <p className="text-red-500 text-xs mt-1">{formErrors.size}</p>}
            </div>

            {/* Description */}
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="descriptionEn" className="block text-sm font-medium text-black dark:text-white">
                Description (EN) <span className="text-meta-1">*</span>
              </label>
              <textarea
                id="descriptionEn"
                name="descriptionEn"
                rows={3}
                value={formData.descriptionEn}
                onChange={handleChange}
                className="mt-1 block w-full border text-black  border-gray-300 rounded-md shadow-sm px-2 py-2"
              ></textarea>
              {formErrors.descriptionEn && <p className="text-red-500 text-xs mt-1">{formErrors.descriptionEn}</p>}
            </div>

            {/* Description */}
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="descriptionAR" className="block text-sm font-medium text-black dark:text-white">
                Description (AR) <span className="text-meta-1">*</span>
              </label>
              <textarea
                dir="rtl"
                id="descriptionAR"
                name="descriptionAR"
                rows={3}
                value={formData.descriptionAR}
                onChange={handleChange}
                className="mt-1 block w-full border text-black  border-gray-300 rounded-md shadow-sm px-2 py-2"
              ></textarea>
              {formErrors.descriptionAR && <p className="text-red-500 text-xs mt-1">{formErrors.descriptionAR}</p>}
            </div>

            {/* Images */}
            <ImageField  handleImagesChange={handleImagesChange}/>

            {/* Services - Repeat for each service */}
            {/* <div className="col-span-1 md:col-span-2">
      <label htmlFor="service" className="block text-sm font-medium text-black dark:text-white">Services</label>
      <div className="flex items-center space-x-3">
        <input type="text" id="serviceEn" name="serviceEn" placeholder="Service Name (EN)" className="mt-1 block flex-1  border border-gray-300 rounded-md shadow-sm" />
        <input type="text" id="serviceAr" name="serviceAr" placeholder="Service Name (AR)" className="mt-1 block flex-1  border border-gray-300 rounded-md shadow-sm" />
        <input type="text" id="serviceImage" name="serviceImage" placeholder="Image URL" className="mt-1 block flex-1  border border-gray-300 rounded-md shadow-sm" />
      </div>
    </div> */}

            {/* Price Options */}
            <div className="flex justify-center items-center gap-7">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-white">
                  Room Price (Night) <span className="text-meta-1">*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                onChange={handleChange}
                  className="mt-1 block py-2 px-2 w-full  border border-gray-300 shadow-sm text-black outline-none transition  dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
                 {formErrors.price && <p className="text-red-500 text-xs mt-1">{formErrors.price}</p>}

              </div>
              {/* Tags */}
              <div className="">
                <label className="block text-sm font-medium text-gray-700 dark:text-white pb-1">Room Type <span className="text-meta-1">*</span></label>
                <TagSelector handleTags={handleTags}  />
              </div>
            </div>

            {/* Tags */}
            {/* <div className="col-span-1 md:col-span-2">
      <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
      <input type="text" id="tags" name="tags" placeholder="Use comma to separate tags" className="mt-1 block py-2 px-2 w-full  border border-gray-300 shadow-sm text-black outline-none transition  dark:border-form-strokedark dark:bg-form-input dark:text-white" />
    </div> */}

            {/* Price History */}
            <div>
              <label htmlFor="priceHistory" className="block text-sm font-medium text-gray-700">
                Price History
              </label>
              <input
                type="number"
                id="priceHistory"
                name="priceHistory"
                value={formData.h}
                onChange={handleChange}
                className="mt-1 block py-2 px-2 w-full  border border-gray-300 shadow-sm text-black outline-none transition  dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>

            {/* Buttons */}
            <div className="col-span-1 md:col-span-2 text-center">
              <button type="submit" className="px-6 py-2 bg-primary text-white rounded hover:bg-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </>
    </section>
  );
};

export default AddRoom;
