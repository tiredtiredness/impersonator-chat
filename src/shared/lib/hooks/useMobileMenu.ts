import {useContext} from 'react';
import {MobileMenuContext} from '@/shared/lib/contexts/MobileMenuContext';

export function useMobileMenu() {
  const context = useContext(MobileMenuContext);
  if (!context) {
    throw new Error('useMobileMenu is used outside of MobileMenuProvider');
  }
  return context;
}
