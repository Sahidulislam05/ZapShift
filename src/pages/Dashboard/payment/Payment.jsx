import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { isLoading, data } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });
  const parcel = data?.result ?? [];
  if (isLoading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }

  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    // console.log(res.data);
    window.location.href = res.data.url;
  };
  return (
    <div>
      <h2>
        Please pay ${parcel.cost} for: {parcel.parcelName}
      </h2>
      <button onClick={handlePayment} className="btn btn-accent">
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
