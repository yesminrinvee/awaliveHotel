import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const ImageFieldUrl = ({ images = [], handleImagesChange }) => {
  const [inputFields, setInputFields] = useState(images);

  useEffect(() => {
    setInputFields(images);
  }, [images]);

  const addField = () => {
    setInputFields([...inputFields, '']);
  };

  const handleChange = (index, event) => {
    const values = [...inputFields];
    values[index] = event.target.value;
    setInputFields(values);
    handleImagesChange(values); // Call the handler with the new image URLs
  };

  return (
    <div>
      <div className="mb-4.5">
        <div className="flex justify-between items-center">
          <label className="mb-2.5 block text-black dark:text-white">
            Image URL <span className="text-meta-1">*</span>
          </label>
          <label
            onClick={addField}
            className="mb-2.5 block text-black dark:text-white cursor-pointer bg-gray-200 dark:bg-primary p-2 text-xs"
          >
            Add Field
          </label>
        </div>
        {inputFields.map((inputField, index) => (
          <input
            key={index}
            type="text"
            placeholder="Enter your image url"
            value={inputField}
            onChange={(e) => handleChange(index, e)}
            className="w-full mb-2.5 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageFieldUrl;
