import { useEffect, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import PageMeta from "../components/common/PageMeta";
import api from "../api/api";

export default function Appointments() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments");

      // ✅ Normalize API response (VERY IMPORTANT)
      if (Array.isArray(res.data)) {
        setAppointments(res.data);
      } else if (Array.isArray(res.data.appointments)) {
        setAppointments(res.data.appointments);
      } else if (Array.isArray(res.data.data)) {
        setAppointments(res.data.data);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      console.error("Error fetching appointments", error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageMeta
        title="My Appointments | TeleHealth Portal"
        description="View and manage your appointments"
      />

      <PageBreadcrumb pageTitle="My Appointments" />

      <ComponentCard title="Appointments List">
        {loading ? (
          <p className="text-sm text-gray-500">Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p className="text-sm text-gray-500">No appointments found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-3">Doctor</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt: any) => (
                  <tr key={appt._id} className="border-b">
                    <td className="p-3">
                      {appt.doctor?.name || "—"}
                    </td>
                    <td className="p-3">
                      {appt.date
                        ? new Date(appt.date).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="p-3">{appt.time || "—"}</td>
                    <td className="p-3 capitalize">{appt.type || "—"}</td>
                    <td className="p-3 capitalize">{appt.status || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </ComponentCard>
    </>
  );
}
