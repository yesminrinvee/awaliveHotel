import React, { useContext } from 'react'
import { AuthContext } from '../../sharedPages/Context/AuthProvider'
import i18next from 'i18next'
import { Link } from 'react-router-dom'

const RateComponent = () => {
    const currentLanguage = i18next.language
    const {  promotionLoading, promotionError, promotionsData } = useContext(AuthContext)

  return (
    <section>
        <div className=''>
            <div className='w-1/2 mx-auto max-h-screen '>
            <div className="grid grid-cols-1  gap-7 py-20 px-20 bg-white">
                {promotionsData.map((singleROom) => (
                    <p to={`/singlePromotionRoom/${singleROom._id}`} key={singleROom._id} className="grid md:grid-cols-6 gap-5 px-4 ">
                      <div className="col-span-1">
                        <img src={singleROom.roomImage} alt="" className=" w-full h-20 object-cover " />
                      </div>
                       <div className="col-span-4 flex flex-col  gap-2">
                           <h2 className={`text-2xl ${currentLanguage === "ar" ? "body-ar font-medium " : "body-en-title"}  `}>{singleROom.roomName}</h2>
                           {/* <p className="text-xs">{singleROom.fullDetails }</p> */}
                           <p className="text-xs overflow-hidden text-ellipsis block h-12 leading-6 clamp-2">{singleROom.fullDetails}</p>

                       </div>
                       <div className="text-xs col-span-1 flex flex-col gap-4">
                           <p className="text-sm">{singleROom.price } $ / night</p>
                           <div>
                           <a href="../promotions/chaletRoom.html" className="bg-[#1C1C1D] text-xs tracking-widest uppercase text-white text-center px-4 ">Sale</a>
                           </div>
                       </div>
                    </p>
                ))}
            </div>
            </div>
        </div>
    </section>
  )
}

export default RateComponent