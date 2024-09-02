import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

const ActionSteps = () => {
    const { t } = useTranslation("booking");
    const currentLanguage = i18next.language
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 w-80 md:w-[36rem] lg:w-[40rem] gap-5 lg:gap-6 justify-center items-center text-white ${currentLanguage === 'ar' ? 'body-ar font-normal  ' : 'body-en '}`}>
        <div className='flex gap-3 items-center col-span-1'>
            <p className='bg-black  h-7 w-7 flex items-center justify-center text-xs  rounded-full '>1</p>
            <p className='uppercase tracking-[0.2rem] text-xs '>{t("SEARCH")}</p>
        </div>
        <div className='flex flex-row gap-3 justify-center items-center text-white'>
            <p className='border border-gray-100-50 h-7 w-7 flex items-center justify-center  text-xs  rounded-full '>2</p>
            <p className='uppercase tracking-[0.2rem] text-xs '>{t("BOOKING")}</p>
        </div>
        <div className='flex flex-row gap-3 justify-center items-center text-white'>
            <p  className='border border-gray-100-50 h-7 w-7 flex items-center justify-center  text-xs  rounded-full '>3</p>
            <p className='uppercase tracking-[0.2rem] text-xs '>{t("CHECKOUT")}</p>
        </div>
        <div className='flex flex-row gap-3 justify-center items-center text-white'>
            <p className='border border-gray-100-50 h-7 w-7 flex items-center justify-center  text-xs  rounded-full '>4</p>
            <p className='uppercase tracking-[0.2rem] text-xs '>{t("THANK YOU")}</p>
        </div>
    </div>
  )
}

export default ActionSteps