import { Legend, Pie, PieChart, Tooltip } from "recharts";
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

  const getPieChartData = (data) => {
    return data.map((item) => ({ name: item.status, value: item.count }));
  };

  return (
    <div className="space-y-8 p-4">
      {/* Heading */}
      <h2 className="text-4xl font-bold mb-4 text-primary">Admin Dashboard</h2>

      {/* Stats Section */}
      <div className="stats shadow bg-base-100 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 rounded-xl">
        {deliveryStatus.map((state) => (
          <div
            key={state._id}
            className="stat bg-base-200 rounded-xl hover:shadow-lg transition"
          >
            <div className="stat-title text-xl font-semibold">{state._id}</div>
            <div className="stat-value text-primary">{state.count}</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="w-full flex justify-center py-6 bg-base-100 rounded-xl shadow">
        <PieChart
          style={{
            width: "100%",
            maxWidth: "500px",
            maxHeight: "80vh",
            aspectRatio: 2,
          }}
          responsive
        >
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={getPieChartData(deliveryStatus)}
            cx="50%"
            cy="100%"
            outerRadius="120%"
            fill="#8884d8"
            label
            isAnimationActive={true}
          />
          <Legend />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
