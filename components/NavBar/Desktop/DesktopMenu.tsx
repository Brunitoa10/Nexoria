import { MOCK_NOTIFICATIONS } from "@/data/notifications";

import NavLinks from "../NavLinks";
import NotificationMenu from "./NotificationMenu";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";

export default function DesktopMenu() {
  return (
    <div className="hidden lg:flex items-center gap-6 bg-black px-6 py-3 text-white relative">
      <NavLinks direction="row" />
      <SearchBar />
      <NotificationMenu notifications={MOCK_NOTIFICATIONS} />
      <UserMenu />
    </div>
  );
}
