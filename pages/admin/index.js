import AdminLayout from '@/components/adminpage/AdminLayout';
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const expiry = localStorage.getItem("authExpiry");

    if (!isAuthenticated || !expiry || new Date().getTime() > Number(expiry)) {
      router.push("admin/login");
    }
  }, [router]);

  return <AdminLayout />;
}