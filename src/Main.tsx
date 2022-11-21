import { Routes, Route } from "react-router-dom";
import { Auth } from "./components/Admin/components/Auth";
import { CouponPage } from "./components/Admin/components/Coupon";
import { SamStudio } from "./components/Admin/components/SamStudio";
import { AddSamStudio } from "./components/Admin/components/SamStudio/addEditStudio";
import { SamTheme } from "./components/Admin/components/SamTheme";
import { AddSamTheme } from "./components/Admin/components/SamTheme/addEditTheme";
import { SamWatch } from "./components/Admin/components/SamWatch";
import { AddSamWatch } from "./components/Admin/components/SamWatch/addEditWatch";
import { FSamStudio } from "./components/App/components/SamStudio";
import { FSamTheme } from "./components/App/components/SamTheme";
import { FSamWatch } from "./components/App/components/SamWatch";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ViewSamWatch } from "./components/Admin/components/SamWatch/view";
import { ViewSamTheme } from "./components/Admin/components/SamTheme/view";
import { ViewSamStudio } from "./components/Admin/components/SamStudio/view";
import { App } from "./components/App/App";
import { SamAbout } from "./components/App/components/SamAbout";
import RouteChangeTracker from "./components/RouteChangeTracker";

export const Main = () => {
  RouteChangeTracker();
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        closeButton={false}
        pauseOnHover
      />
      <Routes>
        <Route path="/login" element={<Auth />} />

        <Route path="/dashboard" element={<SamWatch />} />
        <Route path="/samwatch" element={<FSamWatch />} />
        <Route path="/samtheme" element={<FSamTheme />} />
        <Route path="/samstudio" element={<FSamStudio />} />
        <Route path="/samabout" element={<SamAbout />} />

        <Route path="/dashboard/samwatch" element={<SamWatch />} />
        <Route path="/dashboard/samwatch/register" element={<AddSamWatch />} />
        <Route path="/dashboard/samwatch/:id" element={<ViewSamWatch />} />
        <Route path="/dashboard/samwatch/edit/:id" element={<AddSamWatch />} />

        <Route path="/dashboard/samtheme" element={<SamTheme />} />
        <Route path="/dashboard/samtheme/register" element={<AddSamTheme />} />
        <Route path="/dashboard/samtheme/:id" element={<ViewSamTheme />} />
        <Route path="/dashboard/samtheme/edit/:id" element={<AddSamTheme />} />

        <Route path="/dashboard/samstudio" element={<SamStudio />} />
        <Route
          path="/dashboard/samstudio/register"
          element={<AddSamStudio />}
        />
        <Route path="/dashboard/samstudio/:id" element={<ViewSamStudio />} />
        <Route
          path="/dashboard/samstudio/edit/:id"
          element={<AddSamStudio />}
        />

        <Route path="/dashboard/coupon" element={<CouponPage />} />
        <Route path="*" element={<App />} />
      </Routes>
    </>
  );
};
