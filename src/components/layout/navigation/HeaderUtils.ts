
// Acest fișier conține utilități pentru componenta Header

import { NavigationItem } from "@/config/navigation";

// Funcție pentru verificarea dacă un email este super admin
export const checkSuperAdmin = (email: string | undefined): boolean => {
  if (!email) return false;
  const adminEmails = [
    '114.adrian.gheorghe@gmail.com',
    '727.adrian.gheorghe@gmail.com'
  ];
  return adminEmails.includes(email);
};

// Funcție pentru determinarea vizibilității elementelor de navigare
export const determineNavItemVisibility = (
  item: NavigationItem,
  user: any, 
  isAdmin: boolean, 
  isModerator: boolean, 
  isSuperAdmin: boolean
): boolean => {
  // Verifică admin flag din NavigationItem
  if (item.admin && !isAdmin) return false;
  
  return true;
};
