"use client";
import { useSession } from "next-auth/react";
import AdminDashboard from "../../components/AdminDashboard";
import AdminSection from "../../components/AdminSection";
const AdminPage = () => {
  const { data: session } = useSession();
  let isAdmin = session?.details?.role === "ADMIN" ? true : false;
  return (
    <div className="h-screen ">
      <div className="text-center ">
        <AdminSection />
      </div>
    </div>
  );
};

export default AdminPage;
