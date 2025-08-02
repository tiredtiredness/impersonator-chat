import Image from 'next/image';
import {Loader} from '@/shared/ui';

type AvatarProps = {
  url?: string | null;
  size?: number;
  rounded?: 'xl' | 'full';
  who?: string;
  isGenerating?: boolean;
};

export function Avatar({url, size = 40, rounded = 'full', who, isGenerating = false}: AvatarProps) {
  const borderRadius = rounded === 'full' ? 'rounded-full' : 'rounded-xl';

  return (
    <div
      className={`relative shrink-0 ${borderRadius} bg-violet-100 overflow-hidden`}
      style={{width: size, height: size}}
    >
      {url && !isGenerating && (
        <Image
          src={url}
          alt={who ? `Аватар, на котором изображен ${who}` : 'Аватар бота'}
          width={size}
          height={size}
          className={`object-cover w-full h-full ${borderRadius}`}
          placeholder="empty"
          loading="lazy"
          unoptimized
        />
      )}

      {(isGenerating || !url) && (
        <div className="absolute inset-0 flex items-center justify-center animate-pulse z-10">
          {isGenerating && <Loader type="spinner" size={size - 36} />}
        </div>
      )}
    </div>
  );
}
