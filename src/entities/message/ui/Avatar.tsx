import Image from 'next/image';
import {Loader} from '@/shared/ui';

type AvatarProps = {
  url?: string;
  size?: number;
  rounded?: 'xl' | 'full';
  who?: string;
  isGenerating?: boolean;
};

export function Avatar({url, size = 40, rounded = 'full', who, isGenerating = false}: AvatarProps) {
  return (
    <div className={`relative shrink-0 `} style={{width: size, height: size}}>
      {(isGenerating || !url) ? (
        <div
          className={`absolute rounded-${rounded} bg-violet-100 ${url && 'animate-pulse'} inset-0 flex items-center justify-center`}
        >
          {isGenerating && <Loader
            type="spinner"
            size={size - 44}
          />}
        </div>
      ) : (
        <Image
          src={url}
          alt={who ? `Аватар, на котором изображен ${who}` : 'Аватар бота'}
          width={size}
          height={size}
          className={`rounded-${rounded}`}
          placeholder='empty'
          loading='lazy'
          unoptimized
        />
      )}
    </div>
  );
}
