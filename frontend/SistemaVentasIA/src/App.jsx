import Navbar from "./components/Navbar";
import AppRoutes from "./routes";

const App = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;