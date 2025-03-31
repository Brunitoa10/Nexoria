"use client";

import { Search } from "@mui/icons-material";

export default function SearchBar() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search..."
        className="pl-10 pr-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring focus:ring-red-500"
      />
    </div>
  );
}
