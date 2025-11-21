import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    // watch,
    // formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  // const senderRegion = watch("senderRegion");
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    // console.log("cost", cost);
    data.cost = cost;
    Swal.fire({
      title: "Agree with the cost?",
      text: `You will be charged ${cost} taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm and continue payment!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", data).then((res) => {
          if (res.data.result.insertedId) {
            navigate("/dashboard/my-parcels");
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Parcel has created. Please pay",
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <div className="p-10 md:p-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-2">Add Parcel</h2>
        <form
          onSubmit={handleSubmit(handleSendParcel)}
          className="mt-10 text-black"
        >
          {/* Parcel type */}
          <div>
            <label className="label mr-4">
              <input
                type="radio"
                {...register("parcelType")}
                value={"document"}
                className="radio"
                defaultChecked
              />
              Document
            </label>
            <label className="label">
              <input
                type="radio"
                {...register("parcelType")}
                value={"non-document"}
                className="radio"
              />
              Non Document
            </label>
          </div>
          {/* parcel info name , weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 justify-between items-center my-5 md:gap-5">
            <fieldset className="fieldset">
              <label className="label">Parcel Name</label>
              <input
                type="text"
                {...register("parcelName")}
                className="input w-full"
                placeholder="Parcel Name"
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label">Parcel Weight (KG)</label>
              <input
                type="text"
                {...register("parcelWeight")}
                className="input w-full"
                placeholder="Parcel Weight (KG)"
              />
            </fieldset>
          </div>

          {/* Two column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Sender details */}
            <div>
              <fieldset className="fieldset">
                <h3 className="text-2xl font-semibold">Sender Details</h3>
                {/* Sender Name */}
                <label className="label">Sender Name</label>
                <input
                  type="text"
                  {...register("senderName")}
                  defaultValue={user?.displayName}
                  className="input w-full"
                  placeholder="Sender Name"
                />
                {/* Sender Email */}
                <label className="label">Sender Email</label>
                <input
                  type="text"
                  {...register("senderEmail")}
                  defaultValue={user?.email}
                  className="input w-full"
                  placeholder="Sender Email"
                />

                {/* Sender region */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Sender Region</legend>
                  <select
                    {...register("senderRegion")}
                    defaultValue="Pick a Region"
                    className="select"
                  >
                    <option disabled={true}>Pick a Region</option>
                    {regions.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </fieldset>
                {/* Sender Districts */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Sender Districts</legend>
                  <select
                    {...register("senderDistrict")}
                    defaultValue="Pick a Districts"
                    className="select"
                  >
                    <option disabled={true}>Pick a Districts</option>
                    {districtByRegion(senderRegion).map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </fieldset>

                {/* Address */}
                <label className="label mt-2">Sender Address</label>
                <input
                  type="text"
                  {...register("senderAddress")}
                  className="input w-full"
                  placeholder="Sender Address"
                />
                {/* Sender Contact No */}
                <label className="label mt-2">Sender Contact No</label>
                <input
                  type="text"
                  {...register("senderContactNo")}
                  className="input w-full"
                  placeholder="Contact No"
                />

                {/* Pickup Instruction */}
                <label className="label mt-2">Pickup Instruction</label>
                <textarea
                  className="textarea h-24 w-full"
                  {...register("senderInstruction")}
                  placeholder="Pickup Instruction"
                ></textarea>
              </fieldset>
            </div>

            {/* Receiver */}
            <div>
              <fieldset className="fieldset">
                <h2 className="text-2xl font-semibold">Receiver Details</h2>
                <label className="label">Receiver Name</label>
                <input
                  type="text"
                  {...register("receiverName")}
                  className="input w-full"
                  placeholder="Receiver Name"
                />
                {/* Receiver Email */}
                <label className="label">Receiver Email</label>
                <input
                  type="text"
                  {...register("receiverEmail")}
                  className="input w-full"
                  placeholder="Receiver Email"
                />
                {/* Receiver region */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Receiver Region</legend>
                  <select
                    {...register("receiverRegion")}
                    defaultValue="Pick a Region"
                    className="select"
                  >
                    <option disabled={true}>Pick a Region</option>
                    {regions.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </fieldset>
                {/* Receiver Districts */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    Receiver Districts
                  </legend>
                  <select
                    {...register("receiverDistrict")}
                    defaultValue="Pick a Districts"
                    className="select"
                  >
                    <option disabled={true}>Pick a Districts</option>
                    {districtByRegion(receiverRegion).map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </fieldset>
                {/* Address */}
                <label className="label mt-2">Receiver Address</label>
                <input
                  type="text"
                  {...register("receiverAddress")}
                  className="input w-full"
                  placeholder="Receiver Address"
                />
                {/* Sender Contact No */}
                <label className="label mt-2">Receiver Contact No</label>
                <input
                  type="text"
                  {...register("receiverContactNo")}
                  className="input w-full"
                  placeholder="Contact No"
                />

                {/* Pickup Instruction */}
                <label className="label mt-2">Pickup Instruction</label>
                <textarea
                  className="textarea h-24 w-full"
                  {...register("receiverInstruction")}
                  placeholder="Pickup Instruction"
                ></textarea>
              </fieldset>
            </div>
          </div>

          <input
            type="submit"
            className="btn bg-primary mt-5"
            value="Send Parcel"
          />
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
