"use client";
import Link from "next/link";
import { Fragment } from "react";

const TopNavList = () => {
  return (
    <div className="flex text-[#4D4D4D] gap-3 py-2 border-b-[3px] ">
      <Link
        className="px-6 rounded-md py-1 hover:bg-gray-200 font-semibold"
        href={"/list"}
      >
        List
      </Link>
      <Link
        className="px-6 rounded-md py-1 hover:bg-gray-200 font-semibold"
        href={"/table"}
      >
        Manage
      </Link>
    </div>
  );
};
export default TopNavList;
