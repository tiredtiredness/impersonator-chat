import {Loader} from '@/shared/ui';

export default function Loading() {
  return (
    <div className="w-dvw h-dvh flex items-center justify-center">
      <Loader size={60} type="spinner" />
    </div>
  );
}
