'use client';

import {ReactNode, createContext, useState} from 'react';

interface ImageGenerationContextType {
  isImageGenerating: boolean;
  setIsImageGenerating: (value: boolean) => void;
}

export const ImageGenerationContext = createContext<ImageGenerationContextType | undefined>(
  undefined,
);

export const ImageGenerationProvider = ({children}: {children: ReactNode}) => {
  const [isImageGenerating, setIsImageGenerating] = useState<boolean>(false);

  return (
    <ImageGenerationContext.Provider
      value={{
        isImageGenerating,
        setIsImageGenerating: setIsImageGenerating,
      }}
    >
      {children}
    </ImageGenerationContext.Provider>
  );
};
