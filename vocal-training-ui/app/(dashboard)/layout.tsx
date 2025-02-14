import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add your dashboard navigation/sidebar here */}
      <main className="ml-[240px]"> {/* Adjust based on your sidebar width */}
        {children}
      </main>
    </div>
  );
} 