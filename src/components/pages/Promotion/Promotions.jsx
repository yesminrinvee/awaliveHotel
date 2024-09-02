import { useContext} from "react";
import PageAnimation from "../../PageAnimation/PageAnimation";
import Banner from "./Banner";

import BestPromotions from "./BestPromotions";
import RelaxArea from "./RelaxArea";

import { AuthContext } from "../../sharedPages/Context/AuthProvider";


const Promotions = () => {
  const {
    promotionError,
    promotionLoading,
    promotionsData,} = useContext(AuthContext)
  

  return (
    <>
      <PageAnimation>
        <Banner data={promotionsData} loading={promotionLoading}  />
        <BestPromotions data={promotionsData} loading={promotionLoading} promotionError={promotionError} />
        <RelaxArea />

      </PageAnimation>
    </>
  );
};

export default Promotions;
