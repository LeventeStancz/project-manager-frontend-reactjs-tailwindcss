import { Routes, Route } from "react-router-dom";

//pages
import Missing from "./pages/Missing";
import Unauthorized from "./pages/Unauthorized";
import Register from "./pages/register-login/Register";
import Login from "./pages/register-login/Login";
//layouts
import RootLayout from "./layouts/RootLayout";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        {/* public routes */}
        <Route index path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* protected routes
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>*/}
        <Route element={<MainLayout />}>
          <Route index path="/" element={<DashboardLayout />} />
        </Route>
        {/*</Route>
        </Route>*/}
        {/* 404 */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
