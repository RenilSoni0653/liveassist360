"use client";

import AdminNavbar from "../../components/AdminNavbar";

export default function AdminLayout({ children }) {
  return (
    <div>
      <AdminNavbar />
      {children}
    </div>
  );
}
