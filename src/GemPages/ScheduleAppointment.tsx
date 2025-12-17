import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import PageMeta from "../components/common/PageMeta";
import api from "../api/api";

export default function ScheduleAppointment() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    doctor: "",
    date: "",
    time: "",
    type: "video",
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error("Failed to load doctors", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.doctor || !form.date || !form.time) {
      alert("All fields are required");
      return;
    }

    try {
      await api.post("/appointments", form);
      alert("Appointment scheduled successfully");
      navigate("/Telehealth/appointments");
    } catch (err) {
      console.error("Error scheduling appointment", err);
      alert("Failed to schedule appointment");
    }
  };

  return (
    <>
      <PageMeta
        title="Schedule Appointment | TeleHealth"
        description="Schedule a new appointment"
      />

      <PageBreadcrumb pageTitle="Schedule Appointment" />

      <ComponentCard title="New Appointment">
        {loading ? (
          <p className="text-sm text-gray-500">Loading doctors...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            {/* Doctor */}
            <div>
              <label className="block mb-1">Doctor</label>
              <select
                name="doctor"
                value={form.doctor}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Doctor</option>
                {doctors.map((doc: any) => (
                  <option key={doc._id} value={doc._id}>
                    {doc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block mb-1">Time</label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block mb-1">Appointment Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="video">Video</option>
                <option value="in-person">In Person</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Schedule
            </button>
          </form>
        )}
      </ComponentCard>
    </>
  );
}
