import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const Rider = () => {
  const { register, handleSubmit, control } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const RiderRegion = useWatch({ control, name: "region" });
  const districtByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleRider = (data) => {
    // console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your application has been submitted.",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
  return (
    <div>
      <h2 className="text-3xl">Be a Rider</h2>
      <form onSubmit={handleSubmit(handleRider)} className="mt-10 text-black">
        {/* Two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* details */}
          <div>
            <fieldset className="fieldset">
              <h3 className="text-2xl font-semibold">Rider Details</h3>
              {/* Name */}
              <label className="label">Rider Name</label>
              <input
                type="text"
                {...register("name")}
                defaultValue={user?.displayName}
                className="input w-full"
                placeholder="Sender Name"
              />
              {/* Email */}
              <label className="label">Your Email</label>
              <input
                type="text"
                {...register("email")}
                defaultValue={user?.email}
                className="input w-full"
                placeholder="Sender Email"
              />

              {/*  region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Region</legend>
                <select
                  {...register("region")}
                  defaultValue="Pick a Region"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a Region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>
              {/* Districts */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend"> Districts</legend>
                <select
                  {...register("district")}
                  defaultValue="Pick a Districts"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a Districts</option>
                  {districtByRegion(RiderRegion).map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Address */}
              <label className="label mt-2"> Address</label>
              <input
                type="text"
                {...register("address")}
                className="input w-full"
                placeholder="Your Address"
              />
              {/* Contact No */}
              <label className="label mt-2">Contact No</label>
              <input
                type="text"
                {...register("contact")}
                className="input w-full"
                placeholder="Contact No"
              />
            </fieldset>
          </div>

          {/*Part 2*/}
          <div>
            <fieldset className="fieldset">
              <h2 className="text-2xl font-semibold">More Details</h2>
              <label className="label">Driving License</label>
              <input
                type="text"
                {...register("license")}
                className="input w-full"
                placeholder="Driving License"
              />
              {/*  Email */}
              <label className="label"> NID No</label>
              <input
                type="text"
                {...register("nid")}
                className="input w-full"
                placeholder="NID No"
              />
              {/*  region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Bike reg no</legend>
                <input
                  type="text"
                  {...register("bike")}
                  className="input w-full"
                  placeholder="Bike reg no"
                />
              </fieldset>
            </fieldset>
          </div>
        </div>

        <input
          type="submit"
          className="btn bg-primary mt-5"
          value="Apply as a Rider"
        />
      </form>
    </div>
  );
};

export default Rider;
