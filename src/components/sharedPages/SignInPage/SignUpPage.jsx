import { Spin, notification } from "antd";
import axios from "axios";
import i18next from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


const SignUpPage = () => {
  const currentLanguage = i18next.language
  const { t } = useTranslation("loginAndSignUp");
  const navigate = useNavigate()
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
      const handleRegister = async () => {
        setLoading(true)
        
        // Validate fields before proceeding
        if (!validateFields()) {
          setLoading(false)
          return;
        }
      
        // Consolidate all information into an object
        const registerData = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          password: password,
        };
      
        try {
          
          // const response = await axios.post('https://type-script-server.vercel.app/api/auth/resister', registerData);
          const response = await axios.post('https://server.awalivhotel.com/api/auth/resister', registerData);
          
          setErrorMessageReg('User registered successfully')
          setLoading(false)
          
          notification['success']({
            message: 'Joining success',
            description: 'PLease login now',
            placement: 'topRight',
            duration: 3.5, 
          });

          navigate('/login')
        } catch (error) {
          // Registration failed, handle the error
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
           
            setErrorMessageReg('Registration failed:', error.response.data)
          setLoading(false)

          } else if (error.request) {
            // The request was made but no response was received
         
            setErrorMessageReg('No response received:', error.request)
        setLoading(false)

          } else {
            // Something happened in setting up the request that triggered an Error
           
            setErrorMessageReg('Error:', error.message)
        setLoading(false)

          }
        }
        setLoading(false)

      };
    
  return (
   
      <section className="max-w-2xl mx-auto">
        <div className="shadow-lg py-10 " style={{ fontFamily: "Gilda Display, serif" }}>
            <h1 className="text-3xl nd:text-4xl px-4">{t('becomeMember')}</h1>
            <h1 className="text-2xl px-4">{t('itsFree')} </h1>
        <div className="py-10 px-4 ">
          <div className="w-full flex flex-col gap-4 " id="guest-info-form">
            <input
              type="name"
              name="firstName"
              id="firstName"
              placeholder={t('firstNamePlaceholder')}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`py-2 px-2 border bg-slate-50 ${
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
              placeholder={t('firstNamePlaceholder')}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`py-2 px-2 border bg-slate-50 ${
                errors.lastName && "border-red-500"
              }`}
              required
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs italic">{errors.lastName}</p>
            )}
            <input
              type="email"
              name="email"
              id="email"
              placeholder={t('emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`py-2 px-2 border bg-slate-50 ${
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
              className={`py-2 px-2 border bg-slate-50 ${
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
                    className={`py-2 px-2 border bg-slate-50 w-full ${errors.password && 'border-red-500'}`}
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
              onClick={handleRegister}
            >
              {t('joinButton')}
            </button>
              ) 
            }
            
          </div>
        </div>
        </div>
      </section>
    
  );
};

export default SignUpPage;
