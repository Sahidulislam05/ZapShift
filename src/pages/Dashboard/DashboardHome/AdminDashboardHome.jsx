import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { data: deliveryStatus = [] } = useQuery({
    queryKey: ["delivery-status-state"],
    queryFn: async () => {
      const res = await axiosSecure.get("parcels/delivery-status/status");
      return res.data;
    },
  });
  return (
    <div>
      <h2 className="text-4xl">Admin Dashboard</h2>
      <div className="stats shadow">
        {deliveryStatus.map((state) => (
          <div key={state._id} className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title text-2xl font-semibold">{state._id}</div>
            <div className="stat-value">{state.count}</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardHome;
