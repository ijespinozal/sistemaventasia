import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    Navigate,
} from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login";
import Products from "../pages/Products";
import Insights from "../pages/Insights";

export default function AppRoutes() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<Insights />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/insights" element={<Insights />} />
                    </Route>

                    <Route path="*" element={<Login />} />
                </Routes>
            </Router>
        </div>

    );
}
