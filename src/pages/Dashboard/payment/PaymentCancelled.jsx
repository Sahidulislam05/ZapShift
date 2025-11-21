
import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div>
      <h2 className="text-5xl font-bold text-center mt-20 mb-5">
        payment is Cancelled
      </h2>
      <Link to="/dashboard/my-parcels ">
        <button className="btn btn-active">Try again</button>
      </Link>
    </div>
  );
};

export default PaymentCancelled;
