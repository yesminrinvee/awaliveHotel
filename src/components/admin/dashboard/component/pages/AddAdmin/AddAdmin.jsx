// import jwt_decode from "jwt-decode";
import { jwtDecode } from 'jwt-decode'
import { Spin, message, } from "antd";
import axios from "axios";
import i18next from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";


const AddAdmin = () => {
  const currentLanguage = i18next.language
  const { t } = useTranslation("loginAndSignUp");
  const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [errorMessageReg, setErrorMessageReg] = useState("");
    const [errors, setErrors] = useState({
      firstName: "",
      lastName: "",
        email: "",
        phone: "",
        password: ""   
      });

      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;


      const validateFields = () => {
        const newErrors = {  
          firstName: firstName ? "" : t('firstNameRequired'),
          lastName: lastName ? "" : t('lastNameRequired'),
          email: email && emailRegex.test(email) ? "" : t('validEmail'),
          phone: email ? "" : t('phoneRequired'),
          password: password ? "" : t('passwordRequired'),
        };
        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === "");
      };

        
      // };
      const handleRegisterAdmin = async () => {
        setLoading(true)

        // Retrieve token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
        // Decode the token to get user data
        const decodedToken = jwtDecode(token);
        // Check if the role is not admin
        if (decodedToken.role !== 'admin') {
            setErrorMessageReg("You are not authorized to add admin.");
            setLoading(false);
            return;
        }
    } else {
        setErrorMessageReg("No token found, authentication failed.");
        setLoading(false);
        return;
    }
        
        // Validate fields before proceeding
        if (!validateFields()) {
          setLoading(false)
          return;
        }
      
        // Consolidate all information into an object
        const adminData = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          password: password,
        };
      
        try {
          
          // const response = await axios.post('https://type-script-server.vercel.app/api/user/create/admin', adminData ,{ 
          const response = await axios.post('https://server.awalivhotel.com/api/user/create/admin', adminData ,{ 
        //   const response = await axios.post('http://localhost:5000/api/user/create/admin', adminData, {
            headers: {
                'Authorization': `${token}`
            }
          });
        //   setErrorMessageReg(response.data.message)
          setLoading(false)
          
        
        message.success(response.data.message)

        
        } catch (error) {
            console.log(error.response.data.issues[0].message);
                setErrorMessageReg( error.response.data.issues[0].message)
                message.error(error.response.data.issues[0].message)
          
        }
        setLoading(false)

      };

    
  return (
   
      <section className="max-w-2xl mx-auto">
        <div className="shadow-lg py-10 space-y-6  p-4 rounded max-w-3xl mx-auto my-8  border-stroke bg-white  dark:border-strokedark dark:bg-boxdark " style={{ fontFamily: "Gilda Display, serif" }}>
        {/* <div className="shadow-lg py-10 " style={{ fontFamily: "Gilda Display, serif" }}> */}
            {/* <h1 className="text-3xl nd:text-4xl px-4">{t('becomeMember')}</h1> */}
            {/* <h1 className="text-2xl px-4">{t('itsFree')} </h1> */}
            <h1 className="text-3xl nd:text-4xl px-4">{t('Create An Admin')}</h1>
            <h1 className="text-2xl px-4">{t('itsFree')} </h1>
        <div className="py-10 px-4 ">
          <form className="w-full flex flex-col gap-4 " id="guest-info-form">
            <input
              type="name"
              name="firstName"
              id="firstName"
              placeholder={t('firstNamePlaceholder')}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`py-2 px-2 w-full border  border-gray-300 shadow-sm text-black outline-none transition  dark:border-form-strokedark dark:bg-form-input dark:text-white ${
                errors.firstName && "border-red-500 "
              }`}
              required
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs italic">{errors.firstName}</p>
            )}
            <input
              type="name"
              name="lastName"
              id="lastName"
              placeholder={t('lastNamePlaceholder')}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`py-2 px-2 w-full border  border-gray-300 shadow-sm text-black outline-none transition  dark:border-form-strokedark dark:bg-form-input dark:text-white ${
                errors.lastName && "border-red-500"
              }`}
              required
            />
            {errors.lastName  && (
              <p className="text-red-500 text-xs italic">{errors.lastName}</p>
            )}
            <input
              type="email"
              name="email"
              id="email"
              placeholder={t('emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`py-2 px-2 w-full border  border-gray-300 shadow-sm text-black outline-none transition  dark:border-form-strokedark dark:bg-form-input dark:text-white ${
                errors.email && "border-red-500"
              }`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder={t('phonePlaceholder')}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`py-2 px-2 w-full border  border-gray-300 shadow-sm text-black outline-none transition  dark:border-form-strokedark dark:bg-form-input dark:text-white ${
                errors.name && "border-red-500"
              }`}
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-xs italic">{errors.phone}</p>
            )}

            {/* <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`py-2 px-2 border bg-slate-50 ${
                errors.password && "border-red-500"
              }`}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )} */}
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder={t('passwordPlaceholder')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`py-2 px-2  border  border-gray-300 shadow-sm text-black outline-none transition  dark:border-form-strokedark dark:bg-form-input dark:text-white w-full ${errors.password && 'border-red-500'}`}
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute inset-y-0 ${currentLanguage === 'ar' ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center text-sm leading-5`}
                >
                    {showPassword ? t('hidePassword') : t('showPassword')}
                </button>
                {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
              </div>
            {errorMessageReg && (
              <p className="text-red-500 text-xs">{errorMessageReg}</p>
            )}
            {
              loading ?   <Spin />  :    (
                <button
              type="button"
              id="confirm-button"
              className="uppercase bg-[#BE9874] text-xs text-white py-3"
              onClick={handleRegisterAdmin}
            >
              {t('Add Admin')}
            </button>
              ) 
            }
            
          </form>
        </div>
        </div>
      </section>
    
  );
};

export default AddAdmin;
