import Navbar from "./components/Navbar";
import AppRoutes from "./routes";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <AppRoutes />
    </div>
  );
}