import BanquetBanner from "./BanquetBanner"
import BanquetDetails from "./BanquetDetails"
import PageAnimation from "../../PageAnimation/PageAnimation";


const Banquet = () => {
  return (
    <>
    <PageAnimation >

      <BanquetBanner />
      <BanquetDetails />
    </PageAnimation>
    </>
  )
}

export default Banquet