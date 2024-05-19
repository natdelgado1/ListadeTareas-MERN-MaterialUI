"use client";
import Link from "next/link";

const TopNavList = () => {
  return (
    <div className="flex gap-1 px-2 bg-[#fef9ff] items-center pb-1 pt-4 max-lg:mt-12">
      <Link
        className="pr-2 rounded-md text-lg py-1 hover:bg-gray-200 font-semibold"
        href={"/list"}
      >
        List 
      </Link>
      <h1 className="pr-2 text-center">•</h1>
      <Link
        className=" text-lg rounded-md py-1 hover:bg-gray-200 font-semibold"
        href={"/manage"}
      >
        Manage
      </Link>
    </div>
  );
};
export default TopNavList;
