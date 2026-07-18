"use client";

import AdminDashboard from '../../../components/admin/AdminDashboard';
import ProtectedRoute from '../../../components/admin/ProtectedRoute';

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  );
}
