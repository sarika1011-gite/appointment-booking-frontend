import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import AddVideoModal from "../../components/admin/AddVideoModal";
import EditVideoModal from "../../components/admin/EditVideoModal";

function Videos() {
  const [videos, setVideos] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await api.get("/videos");
      setVideos(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load videos");
    }
  };

  const deleteVideo = async (id) => {
    if (!window.confirm("Delete this video?")) return;

    try {
      await api.delete(`/videos/${id}`);
      toast.success("Video Deleted");
      fetchVideos();
    } catch (err) {
      toast.error("Delete Failed");
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-[#5C4033] mb-8">Videos</h1>

      <AddVideoModal onSuccess={fetchVideos} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <img
              src={`http://localhost:5000/uploads/${video.thumbnail}`}
              alt={video.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-bold text-[#5C4033]">
                {video.title}
              </h2>

              <p className="text-gray-500 mt-2">{video.category}</p>

              <button
                onClick={() => {
                  setSelectedVideo(video);
                  setOpenEdit(true);
                }}
                className="mt-5 mr-3 bg-[#708238] text-white px-4 py-2 rounded-lg"
              >
                Update
              </button>
              <button
                onClick={() => deleteVideo(video._id)}
                className="mt-5 bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <EditVideoModal
        open={openEdit}
        video={selectedVideo}
        onClose={() => setOpenEdit(false)}
      />
    </div>
  );
}

export default Videos;
