import {Loader} from '@/shared/ui';

export default function Loading() {
  return (
    <div className="flex justify-center items-center grow h-dvh w-dvw">
      <Loader size={60} type="spinner" />
    </div>
  );
}
