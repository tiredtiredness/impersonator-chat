export function MessageTimestamp({
  createdAt,
  isAlignedLeft,
}: {
  createdAt: string | number | Date;
  isAlignedLeft: boolean;
}) {
  return (
    <time className={`${isAlignedLeft ? 'text-left' : 'text-right'} text-xs text-gray-600`}>
      {new Date(createdAt).toLocaleString('ru')}
    </time>
  );
}
