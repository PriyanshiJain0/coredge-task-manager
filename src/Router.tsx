import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import TaskForm from "./components/TaskForm";
import { selectUser } from "./slices/userSlice";
import { useSelector } from "react-redux";
import TasksList from "./components/TasksList";

const ProtectedRoute = ({ children }: any) => {
  const user = useSelector(selectUser);
  if (!user.email) {
    return <Navigate to={"/signin"} replace />;
  }

  return children ? children : <Outlet />;
};

function Router() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Main />}>
          <Route index path="/" element={<TasksList />} />
          <Route path="/create-task" element={<TaskForm />} />
          <Route path="/edit-task" element={<TaskForm />} />
        </Route>
      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate to={"/taskView"} />} />
    </Routes>
  );
}

export default Router;
