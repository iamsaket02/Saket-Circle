import { useRef, useState } from "react";
import userAuthUser from "../hooks/userAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeOnboarding, uploadProfilePic } from "../lib/api";
import { CameraIcon, CircleFadingPlus, LoaderIcon, Upload } from "lucide-react";
import toast from "react-hot-toast";

const OnboardingPage = ({ fromEditProfile }) => {
  const { authUser } = userAuthUser();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Proile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const result = await uploadProfilePic(file);
      setFormState((prev) => ({ ...prev, profilePic: result.profilePic }));
      toast.success("Profile picture uploaded");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Image upload failed");
    } finally {
      setIsUploadingImage(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            {fromEditProfile ? "Edit profile" : "Complete your profile"}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="btn btn-accent"
                  type="button"
                  onClick={handleImageUpload}
                  disabled={isUploadingImage}
                >
                  <Upload className="size-4 mr-2" />
                  {isUploadingImage ? "Uploading..." : "Upload Profile picture"}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formState.fullName}
                  onChange={(e) =>
                    setFormState({ ...formState, fullName: e.target.value })
                  }
                  placeholder="Enter full name"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full flex flex-col">
                <label className="label">
                  <span className="label-text">Bio</span>
                </label>
                <textarea
                  name="bio"
                  value={formState.bio}
                  onChange={(e) =>
                    setFormState({ ...formState, bio: e.target.value })
                  }
                  placeholder="Tell others about yourself"
                  className="textarea textarea-bordered h-24 w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <select
                  value={formState.location || ""}
                  onChange={(e) =>
                    setFormState({ ...formState, location: e.target.value })
                  }
                  className="input input-bordered w-full"
                >
                  {" "}
                  <option value="" disabled selected>
                    Select your state
                  </option>
                  <optgroup label="States">
                    <option value="andhra-pradesh">Andhra Pradesh</option>
                    <option value="arunachal-pradesh">Arunachal Pradesh</option>
                    <option value="assam">Assam</option>
                    <option value="bihar">Bihar</option>
                    <option value="chhattisgarh">Chhattisgarh</option>
                    <option value="goa">Goa</option>
                    <option value="gujarat">Gujarat</option>
                    <option value="haryana">Haryana</option>
                    <option value="himachal-pradesh">Himachal Pradesh</option>
                    <option value="jharkhand">Jharkhand</option>
                    <option value="karnataka">Karnataka</option>
                    <option value="kerala">Kerala</option>
                    <option value="madhya-pradesh">Madhya Pradesh</option>
                    <option value="maharashtra">Maharashtra</option>
                    <option value="manipur">Manipur</option>
                    <option value="meghalaya">Meghalaya</option>
                    <option value="mizoram">Mizoram</option>
                    <option value="nagaland">Nagaland</option>
                    <option value="odisha">Odisha</option>
                    <option value="punjab">Punjab</option>
                    <option value="rajasthan">Rajasthan</option>
                    <option value="sikkim">Sikkim</option>
                    <option value="tamil-nadu">Tamil Nadu</option>
                    <option value="telangana">Telangana</option>
                    <option value="tripura">Tripura</option>
                    <option value="uttar-pradesh">Uttar Pradesh</option>
                    <option value="uttarakhand">Uttarakhand</option>
                    <option value="west-bengal">West Bengal</option>
                  </optgroup>
                  <optgroup label="Union Territories">
                    <option value="andaman-nicobar">
                      Andaman and Nicobar Islands
                    </option>
                    <option value="chandigarh">Chandigarh</option>
                    <option value="dadra-nagar-haveli-daman-diu">
                      Dadra and Nagar Haveli and Daman and Diu
                    </option>
                    <option value="delhi">Delhi</option>
                    <option value="jammu-kashmir">Jammu and Kashmir</option>
                    <option value="ladakh">Ladakh</option>
                    <option value="lakshadweep">Lakshadweep</option>
                    <option value="puducherry">Puducherry</option>
                  </optgroup>
                </select>
              </div>
            </div>
            <button
              className="btn btn-primary w-full"
              disabled={isPending}
              type="submit"
            >
              {!isPending ? (
                <>
                  <CircleFadingPlus className="size-5 mr-2" />
                  {fromEditProfile ? "Save profile" : "Complete Onboarding"}
                </>
              ) : (
                <>
                  <LoaderIcon className="size-5 mr-2" />
                  {fromEditProfile ? "Saving..." : "Onboarding..."}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
