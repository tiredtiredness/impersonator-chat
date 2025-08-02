export function createUrlFromBlob(blob?: Blob | string | null) {
  if (!blob) {
    return undefined;
  }
  if (typeof blob === 'string') {
    return blob;
  }
  return URL.createObjectURL(blob);
}
