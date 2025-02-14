export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add your dashboard navigation/sidebar here */}
      <main className="ml-[240px]"> {/* Adjust based on your sidebar width */}
        {children}
      </main>
    </div>
  );
} 