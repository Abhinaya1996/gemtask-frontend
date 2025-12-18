import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import PageMeta from "../components/common/PageMeta";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

import api from "../api/api";
import Select from "../components/form/Select";

export default function ScheduleAppointment() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

      const doctorsArray =
        Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : Array.isArray(res.data?.doctors)
          ? res.data.doctors
          : [];

      setDoctors(doctorsArray);
    } catch (err) {
      console.error("Failed to load doctors", err);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
  
    const { doctor, date, time, type } = form;

    console.log("formdata ", form);
  
    if (!doctor || !date || !time || !type) {
      setError("All fields are required");
      return;
    }
  
    const selectedDateTime = new Date(date);
    const [hours, minutes] = time.split(":");
    selectedDateTime.setHours(Number(hours), Number(minutes), 0, 0);
  
    if (selectedDateTime <= new Date()) {
      setError("Please select a future date and time");
      return;
    }
  
    try {
      await api.post("/appointments", form);
      alert("Appointment scheduled successfully");
      navigate("/appointments");
    } catch (err) {
      console.error(err);
      setError("Failed to schedule appointment");
    }
  };
  
  

  const doctorOptions = doctors.map((doc: any) => ({
    value: doc._id,
    label: doc.name,
  }));

  const appointmentTypeOptions = [
    { value: "video", label: "Video" },
    { value: "in-person", label: "In Person" },
  ];
  

  
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

            {error && <p className="text-red-600 text-sm">{error}</p>}

            {/* Doctor */}
            <div>
              <label className="block mb-1">Doctor</label>
              <Select
  options={doctorOptions}
  placeholder="Select Doctor"
  onChange={(value: string) => {
    setForm(prev => ({
      ...prev,
      doctor: value,
    }));
  }}
  className="dark:bg-dark-900"
/>




            </div>

            {/* Date */}
<div>
  <label className="block mb-1">Date</label>

  <div className="relative w-full flatpickr-wrapper">
    <Flatpickr
      value={form.date}
      onChange={([date]: Date[]) => {
        if (date) {
          const formattedDate = date.toISOString().split("T")[0];
          setForm({ ...form, date: formattedDate });
        }
      }}
      options={{
        dateFormat: "Y-m-d",
        minDate: "today", // 🔒 prevents past dates
      }}
      placeholder="Select date"
      className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm
        bg-transparent text-gray-800 border-gray-300
        focus:border-blue-500 focus:ring focus:ring-blue-200
        dark:bg-gray-900 dark:text-white dark:border-gray-700"
    />

    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
      📅
    </span>
  </div>
</div>


            {/* Time */}
            {/* Time */}
<div>
  <label className="block mb-1">Time</label>

  <div className="relative w-full flatpickr-wrapper">
    <Flatpickr
      value={form.time}
      onChange={([date]: Date[]) => {
        if (date) {
          const time = date.toTimeString().slice(0, 5); // HH:mm
          setForm({ ...form, time });
        }
      }}
      options={{
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        minTime: "09:00", // ⏰ business hours
        maxTime: "18:00",
      }}
      placeholder="Select time"
      className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm
        bg-transparent text-gray-800 border-gray-300
        focus:border-blue-500 focus:ring focus:ring-blue-200
        dark:bg-gray-900 dark:text-white dark:border-gray-700"
    />

    <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
      ⏰
    </span>
  </div>
</div>


            {/* Type */}
            <div>
              <label className="block mb-1">Appointment Type</label>
              <Select
  options={appointmentTypeOptions}
  placeholder="Select Appointment Type"
  onChange={(value: string) => {
    setForm(prev => ({
      ...prev,
      type: value,
    }));
  }}
  className="dark:bg-dark-900"
/>


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
