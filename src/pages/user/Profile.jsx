import { useState } from "react";
import { FiUser, FiMail, FiPhone, FiMapPin, FiSave } from "react-icons/fi";
import toast from "react-hot-toast";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    bio: user.bio || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...formData,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    toast.success("Profile Updated Successfully");
  };

  const completion =
    [
      formData.name,
      formData.email,
      formData.phone,
      formData.address,
      formData.bio,
    ].filter(Boolean).length * 20;

  return (
    <div>
      <h1 className="text-4xl font-bold text-[#5C4033]">My Profile</h1>

      <p className="text-gray-500 mt-2">Manage your personal information.</p>

      <div className="grid lg:grid-cols-3 gap-8 mt-10">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="flex flex-col items-center">
            <img
              src={`https://ui-avatars.com/api/?name=${formData.name}&background=708238&color=fff&size=200`}
              alt="profile"
              className="w-32 h-32 rounded-full shadow-lg"
            />

            <h2 className="text-2xl font-bold text-[#5C4033] mt-5">
              {formData.name}
            </h2>

            <p className="text-gray-500">{formData.email}</p>
          </div>

          <div className="mt-8">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Profile Completion</span>

              <span>{completion}%</span>
            </div>

            <div className="bg-gray-200 rounded-full h-3">
              <div
                className="bg-[#708238] h-3 rounded-full"
                style={{
                  width: `${completion}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold flex items-center gap-2">
                <FiUser />
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-semibold flex items-center gap-2">
                <FiMail />
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-semibold flex items-center gap-2">
                <FiPhone />
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-semibold flex items-center gap-2">
                <FiMapPin />
                Address
              </label>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="font-semibold">About Me</label>

            <textarea
              rows="5"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>

          <button
            onClick={handleSave}
            className="mt-8 bg-[#708238] hover:bg-[#5C4033] text-white px-8 py-3 rounded-xl flex items-center gap-2"
          >
            <FiSave />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
