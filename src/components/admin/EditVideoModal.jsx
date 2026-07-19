import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
function EditVideoModal({ open, onClose, video }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    client: "",
    duration: "",
    status: "",
  });

  useEffect(() => {
    if (video) {
      setFormData({
        title: video.title || "",
        category: video.category || "",
        client: video.client || "",
        duration: video.duration || "",
        status: video.status || "",
      });
    }
  }, [video]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdate = async () => {
    try {
      await api.put(`/videos/${video._id}`, formData);

      toast.success("Video Updated Successfully");

      onClose();

      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Update Failed");
    }
  };
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[500px] rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-[#5C4033] mb-4">Edit Video</h2>

        <div className="space-y-4 mt-5">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="client"
            value={formData.client}
            onChange={handleChange}
            placeholder="Client"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Duration"
            className="w-full border rounded-lg p-3"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option>Pending</option>
            <option>Editing</option>
            <option>Completed</option>
          </select>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-300"
          >
            Close
          </button>
          <button
            onClick={handleUpdate}
            className="px-5 py-2 rounded-lg bg-[#708238] hover:bg-[#5C4033] text-white"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditVideoModal;
