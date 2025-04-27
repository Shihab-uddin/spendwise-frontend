import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <header className="bg-blue-600 text-white p-4 text-center text-2xl">
        Spendwise
      </header>
      
      <main className="p-6">
        <Outlet />
      </main>

      <footer className="bg-gray-200 text-center p-4 mt-10">
        &copy; 2025 Spendwise. All rights reserved.
      </footer>
    </div>
  );
}
