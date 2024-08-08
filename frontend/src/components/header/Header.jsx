import React from "react";
import { useGetProfileQuery } from "../../context/api/userApi";

const Header = () => {
  const { data, isSuccess, isError, error } = useGetProfileQuery();
  console.log(data);
  console.log(error);

  return <div>Header</div>;
};

export default Header;
