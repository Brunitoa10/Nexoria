"use client";

import { DesktopMenuList } from "./DesktopMenuList";
import NotificationMenu from "./NotificationMenu";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";

export default function DesktopMenu() {
  return (
    <div className="hidden lg:flex items-center gap-6 bg-black px-6 py-3 text-white relative">
      <DesktopMenuList />
      <SearchBar />
      <NotificationMenu notificationsCount={3} />
      <UserMenu />
    </div>
  );
}
