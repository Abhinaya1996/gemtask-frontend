import { useEffect, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import PageMeta from "../components/common/PageMeta";
import api from "../api/api";
import DataTable from "react-data-table-component";


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

  const columns = [
    {
      name: "Doctor",
      selector: (row: any) => row.doctor?.name || "—",
      sortable: true,
    },
    {
      name: "Date",
      selector: (row: any) => row.date,
      sortable: true,
    },
    {
      name: "Time",
      selector: (row: any) => row.time,
    },
    {
      name: "Type",
      selector: (row: any) => row.type,
    },
    {
      name: "Status",
      selector: (row: any) => row.status,
    },
  ];
  

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

            <DataTable
              columns={columns}
              data={appointments}
              pagination
              highlightOnHover
              striped
              responsive
            />

          </div>
        )}
      </ComponentCard>
    </>
  );
}
