export type MenuItem = {
    label: string;
    path: string;
  };
  
  const menuItems: MenuItem[] = [
    { label: "Home", path: "/" },
    { label: "Movies", path: "/Movies" },
    { label: "Series", path: "/Series" },
    { label: "Novels", path: "/Novels" },
    { label: "Profile", path: "/Profile" },
  ];
  
  export default menuItems;
  