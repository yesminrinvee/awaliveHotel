// import React from 'react';
// import { Select } from 'antd';

// const RoomFeatures = () => {
//   // Define your features here
//   const features = [
//     { en: "Mountain view", ar: "إطلالة على الجبال", icon: "🏔️" },
//     { en: "City view", ar: "إطلالة على المدينة", icon: "🌆" },
//     { en: "Air conditioning", ar: "تكييف", icon: "❄️" },
//     { en: "Private bathroom", ar: "حمام خاص", icon: "🚿" },
//     { en: "Flat-screen TV", ar: "تلفزيون بشاشة مسطحة", icon: "📺" },
//     { en: "Minibar", ar: "ميني بار", icon: "🍷" },
//     { en: "Free WiFi", ar: "واي فاي مجاني", icon: "📶" },
//   ];

//   // Handle change event
//   const handleChange = (selectedItems) => {
//     // Assuming the value format is "English / Arabic"
//     const selectedFeatures = selectedItems.map(item => {
//       // Splitting the value to extract English and Arabic versions
//       console.log(item,'asdasd');
//       const [en, ar] = item.split(" / ");
//       return { en, ar };
//     });
//     console.log('Selected features:', selectedFeatures);
//   };

//   // Render
//   return (
//     <div>
//       <h2 className="mb-2.5 block text-black dark:text-white">Room Features <span className="text-meta-1">*</span></h2>
//       <div>
//         <Select
//           mode="multiple"
//           style={{ width: '100%',
//           // backgroundColor: 'black',
        
//         }}
//           onChange={handleChange}
//           placeholder="Select features"
//           className="rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//           options={features.map(feature => ({
//             // Concatenating English and Arabic versions for the value
//             value: `${feature.en} / ${feature.ar}`, 
//             label: `${feature.icon} ${feature.en} / ${feature.ar}`, // Display both languages
//           }))}
//         />
//       </div>
//     </div>
//   );
// }

// export default RoomFeatures;
