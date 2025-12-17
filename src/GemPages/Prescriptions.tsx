import { useEffect, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import PageMeta from "../components/common/PageMeta";
import api from "../api/api";

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const res = await api.get("/prescriptions");
      setPrescriptions(res.data);
    } catch (err) {
      console.error("Error fetching prescriptions", err);
    } finally {
      setLoading(false);
    }
  };

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
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-3">Medication</th>
                  <th className="p-3">Dosage</th>
                  <th className="p-3">Frequency</th>
                  <th className="p-3">Start Date</th>
                  <th className="p-3">End Date</th>
                  <th className="p-3">Doctor</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((item: any) => (
                  <tr key={item._id} className="border-b">
                    <td className="p-3">{item.medicationName}</td>
                    <td className="p-3">{item.dosage}</td>
                    <td className="p-3">{item.frequency}</td>
                    <td className="p-3">{item.startDate}</td>
                    <td className="p-3">{item.endDate}</td>
                    <td className="p-3">{item.doctorName}</td>
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
