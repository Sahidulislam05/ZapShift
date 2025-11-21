import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [PaymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  // console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payments-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);
  return (
    <div>
      <h2 className="text-5xl font-bold text-center mt-20">
        <span> Payment Successful</span>
      </h2>
      <p className="text-2xl text-red-500 font-bold text-center my-5">
        Your Transaction Id: {PaymentInfo.transactionId}
      </p>
      <p className="text-2xl text-red-500 font-bold text-center">
        Your Parcel Tracking Id: {PaymentInfo.trackingId}
      </p>
    </div>
  );
};

export default PaymentSuccess;
