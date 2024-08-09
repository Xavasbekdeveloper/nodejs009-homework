import React from "react";
import { useGetProfileQuery } from "../../context/api/userApi";

const Header = () => {
  const { data, isError, error, isSuccess } = useGetProfileQuery();
  console.log(data);
  console.log(error);

  return (
    <div>
      <nav class="bg-gray-800 flex justify-between gap-5 px-4 py-2 items-center">
        <div>
          <form action="" className="py-2 flex">
            <input
              type="text"
              className="w-[300px] py-1 px-3 rounded-lg outline-none	"
              placeholder="Search..."
            />
          </form>
        </div>
        <div className="flex items-center gap-3 px-2 py-1 text-xl text-white font-bold">
          <h3>{data?.payload?.fname}</h3>
          <h3>{data?.payload?.lname}</h3>
        </div>
      </nav>
    </div>
  );
};

export default Header;
