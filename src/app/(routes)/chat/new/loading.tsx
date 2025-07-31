import {Loader} from '@/shared/ui';

export default function Loading() {
  return (
    <div className="flex justify-center items-center grow">
      <Loader size={60} type="spinner" />
    </div>
  );
}
