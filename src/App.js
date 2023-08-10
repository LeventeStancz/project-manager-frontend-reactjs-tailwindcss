import { Routes, Route } from "react-router-dom";

//auth
import RequireAuth from "./contexts/RequireAuth";
import PersistLogin from "./contexts/PersistLogin";
//pages
import Missing from "./pages/Missing";
import Unauthorized from "./pages/Unauthorized";
import Register from "./pages/register-login/Register";
import Login from "./pages/register-login/Login";
//layouts
import RootLayout from "./layouts/RootLayout";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProjectLayout from "./layouts/ProjectLayout/ProjectLayout";
import TaskLayout from "./layouts/ProjectLayout/TaskLayout/TaskLayout";
import CreateTaskLayout from "./layouts/ProjectLayout/CreateTaskLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        {/* public routes */}
        <Route index path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* protected routes*/}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route element={<MainLayout />}>
              <Route index path="/" element={<DashboardLayout />} />
              <Route path="/project" element={<ProjectLayout />}>
                <Route path=":projectname/tasks" element={<TaskLayout />} />
                <Route
                  path=":projectname/create"
                  element={<CreateTaskLayout />}
                />
              </Route>
            </Route>
          </Route>
        </Route>
        {/* 404 */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
