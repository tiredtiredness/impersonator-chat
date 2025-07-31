import {useContext} from 'react';
import {ImageGenerationContext} from '@/shared/lib/contexts';

export const useImageGeneration = () => {
  const context = useContext(ImageGenerationContext);
  if (!context) {
    throw new Error('useImageGeneration must be used within an ImageGenerationProvider');
  }
  return context;
};
