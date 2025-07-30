import {MobileMenuContext} from '@/app/contexts/MobileMenuContext';
import {useContext} from 'react';

export function useMobileMenu() {
  const context = useContext(MobileMenuContext);
  if (!context) {
    throw new Error('useMobileMenu is used outside of MobileMenuProvider');
  }
  return context;
}
