/**
 * split array into chunks
 * @param array - array to split
 * @param chunkSize - chunk size
 * @returns
 */
export const splitArray = (array: Array<any>, chunkSize: number) => {
  const chunks = Array(Math.ceil(array.length / chunkSize))
    .fill(1)
    .map((_, index) => index * chunkSize)
    .map((begin) => array.slice(begin, begin + chunkSize));
  return chunks;
};
