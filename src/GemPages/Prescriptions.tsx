import { useEffect, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import PageMeta from "../components/common/PageMeta";
import api from "../api/api";
import DataTable from "react-data-table-component";

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const res = await api.get("/prescriptions");
  
      // ✅ normalize API response
      const prescriptionsArray =
        Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : Array.isArray(res.data?.prescriptions)
          ? res.data.prescriptions
          : [];
  
      setPrescriptions(prescriptionsArray);
    } catch (err) {
      console.error("Error fetching prescriptions", err);
      setPrescriptions([]);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      name: "Medication",
      selector: (row: any) => row.medicationName,
      sortable: true,
    },
    {
      name: "Dosage",
      selector: (row: any) => row.dosage,
    },
    {
      name: "Frequency",
      selector: (row: any) => row.frequency,
    },
    {
      name: "Start Date",
      selector: (row: any) => row.startDate,
    },
    {
      name: "End Date",
      selector: (row: any) => row.endDate,
    },
    {
      name: "Doctor",
      selector: (row: any) => row.doctorName,
    },
  ];
  
  

  return (
    <>
      <PageMeta
        title="My Prescriptions | TeleHealth"
        description="View your prescriptions"
      />

      <PageBreadcrumb pageTitle="My Prescriptions" />

      <ComponentCard title="Prescriptions List">
        {loading ? (
          <p className="text-sm text-gray-500">Loading prescriptions...</p>
        ) : prescriptions.length === 0 ? (
          <p className="text-sm text-gray-500">
            No prescriptions available
          </p>
        ) : (
          <div className="overflow-x-auto">
            <DataTable
              columns={columns}
              data={prescriptions}
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
