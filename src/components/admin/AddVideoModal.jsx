import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

function AddVideoModal({ onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    client: "",
    duration: "",
    status: "Pending",
  });

  const [thumbnail, setThumbnail] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("client", formData.client);
    data.append("duration", formData.duration);
    data.append("status", formData.status);

    if (thumbnail) {
      data.append("thumbnail", thumbnail);
    }

    try {
      await api.post("/videos", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Video Added Successfully");

      setFormData({
        title: "",
        category: "",
        client: "",
        duration: "",
        status: "Pending",
      });

      setThumbnail(null);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Add Video");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-[#5C4033] mb-6">Add New Video</h2>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
        <input
          type="text"
          name="title"
          placeholder="Video Title"
          value={formData.title}
          onChange={handleChange}
          className="border rounded-xl p-3"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border rounded-xl p-3"
          required
        />

        <input
          type="text"
          name="client"
          placeholder="Client Name"
          value={formData.client}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={formData.duration}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border rounded-xl p-3"
        >
          <option>Pending</option>
          <option>Editing</option>
          <option>Completed</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
          className="border rounded-xl p-3"
        />

        <button
          type="submit"
          className="md:col-span-2 bg-[#708238] hover:bg-[#5C4033] text-white py-3 rounded-xl font-semibold"
        >
          Add Video
        </button>
      </form>
    </div>
  );
}

export default AddVideoModal;
