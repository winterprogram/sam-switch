import { useState } from "react";
import { SamWatch } from "./components/SamWatch";
import { AddSamWatch } from "./components/SamWatch/addEditWatch";
import { SideBar } from "./components/Sidebar";

export const Wrapper = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex">
      <aside className="h-screen sticky top-0">
        <SideBar collapsed={collapsed} setCollapsed={setCollapsed} fromCoupon={false} />
      </aside>
      <div className="flex-grow">
        {/* <SamWatch></SamWatch> */}
        <AddSamWatch></AddSamWatch>
      </div>
    </div>
  );
};
