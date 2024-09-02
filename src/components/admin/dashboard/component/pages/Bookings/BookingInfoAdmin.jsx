import { Table, Modal, Button, Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const BookingInfoAdmin = ({ setIsModalVisible, isModalVisible, selectedData }) => {
  



  return (
    <>
      <Modal title="Guest Details" open={isModalVisible}  onCancel={() => setIsModalVisible(false)} footer={[
        <Button key="back" onClick={() => setIsModalVisible(false)}>
          Return
        </Button>,
      ]}>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label htmlFor="" className="font-bold capitalize">
              First Name:
            </label>
            <p className="py-2 px-2 border ">{selectedData?.firstName} </p>
          </div>
          <div>
            <label htmlFor="" className="font-bold capitalize">
              Last Name:
            </label>
            <p className="py-2 px-2 border ">{selectedData?.lastName}</p>
          </div>
          <div>
            <label htmlFor="" className="font-bold capitalize">
              Guest Email:
            </label>
            <p className="py-2 px-2 border ">{selectedData?.email}</p>
          </div>
          <div>
            <label htmlFor="" className="font-bold capitalize">
              Phone Number:
            </label>
            <p className="py-2 px-2 border ">{selectedData?.phone}</p>
          </div>
          <div>
            <label htmlFor="" className="font-bold capitalize">
              Check In:
            </label>
            <p className="py-2 px-2 border ">{selectedData?.checkIn}</p>
          </div>
          <div>
            <label htmlFor="" className="font-bold capitalize">
            check Out:
            </label>
            <p className="py-2 px-2 border ">{selectedData?.checkOut}</p>
          </div>
          <div>
            <label htmlFor="" className="font-bold capitalize">
              Address:
            </label>
            <p className="py-2 px-2 border ">{selectedData?.address ? selectedData?.address : 'N/A'} </p>
          </div>
          <div>
            <label htmlFor="" className="font-bold capitalize">
              City:
            </label>
            <p className="py-2 px-2 border ">{selectedData?.city ? selectedData?.city : 'N/A'} </p>
          </div>
          <div>
            <label htmlFor="" className="font-bold capitalize">
            Message:
            </label>
            <p className="py-2 px-2 border ">{selectedData?.guestNote ? selectedData?.guestNote : 'N/A'}</p>
          </div>
          <div>
            <label htmlFor="" className="font-bold capitalize">
              Arrival:
            </label>
            <p className="py-2 px-2 border ">{selectedData?.arrivalTime ? selectedData?.arrivalTime : "N/A"}</p>
          </div>
          
          
        </div>
        <div className="py-2 text-center">
            <label htmlFor="" className="font-bold capitalize">
            Reservation Date:
            </label>
            {/* <p className="py-2 px-2 border ">{formatDateToSaudi(selectedData?.reserveDate) }</p> */}
            {/* <p className="py-2 px-2 border ">{selectedData?.reserveDate }</p> */}
            <p className="py-2 px-2 border ">{dayjs(selectedData?.reserveDate).format("MMM D, YYYY")}</p>
          </div>
        
      </Modal>
    </>
  );
};

export default BookingInfoAdmin;
