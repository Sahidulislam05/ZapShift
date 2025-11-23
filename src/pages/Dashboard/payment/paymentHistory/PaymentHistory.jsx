import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });
  const payments = data?.result ?? [];
  return (
    <div>
      <h2 className="text-2xl md:text-5xl font-bold my-5 text-center">
        Payment History: {payments.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Amount</th>
              <th>Paid time</th>
              <th>Transaction Id</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index}>
                <th> {index + 1} </th>
                <td> {payment.parcelName} </td>
                <td> $ {payment.amount} </td>
                {/* <td>{payment.paidAt} </td> */}
                <td>{new Date(payment.paidAt).toLocaleDateString("en-GB")} </td>
                <td>{payment.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
