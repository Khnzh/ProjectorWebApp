import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Profile from "./pages/profile/Profile";
import Header from "./components/header/Header";
import Account from "./pages/account/Account";
import ProjectDisplay from "./pages/projectDisplay/ProjectDisplay";
import ProjectDetailedView from "./pages/projectDetailedView/ProjectDetailedView";
import ProjectCreate from "./pages/projectCreate/ProjectCreate";
import { AuthProvider } from "./context/AuthContext";
import SavedProjects from "./pages/savedProjects/SavedProjects";
import UserDisplay from "./pages/userDisplay/UserDisplay";

function AppInside() {
  const location = useLocation();

  // Determine if the current path is '/create'
  const isCreatePage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/profile/1" ||
    location.pathname === "/profile/0";

  return (
    <>
      {isCreatePage && <Header />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile/:emode" element={<Profile />} />
        <Route element={<Account />}>
          <Route path="/users" element={<UserDisplay />} />
          <Route path="/projects" element={<ProjectDisplay specific="all" />} />
          <Route
            path="/projects/saved/:pId"
            element={<ProjectDisplay specific="saved" />}
          />
          <Route path="/project/:prId" element={<ProjectDetailedView />} />
          <Route
            path="/projects/mine/:pId"
            element={<ProjectDisplay specific="mine" />}
          />
          <Route path="/project/create" element={<ProjectCreate />} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppInside />
      </BrowserRouter>
    </AuthProvider>
  );
}
