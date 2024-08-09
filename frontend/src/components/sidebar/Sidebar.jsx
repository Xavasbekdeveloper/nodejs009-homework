import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen bg-black flex text-white flex-col justify-between p-4 fixed left-0 top-0 w-[320px]">
      <ul className="flex text-white flex-col gap-3">
        <li>
          <NavLink to={"createBlog"}>Blog Crete</NavLink>
        </li>
        <li>
          <NavLink to={"adminBlog"}>Blog Manage</NavLink>
        </li>
      </ul>
      <div>Log out</div>
    </div>
  );
};

export default Sidebar;
