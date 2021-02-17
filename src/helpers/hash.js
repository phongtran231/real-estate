import bcrypt from 'bcrypt';

export const compareHash = async (value, hashValue) => {
  const replaceHash = hashValue.replace(/^\$2y(.+)$/i, '$2a$1');
  return await bcrypt.compare(value, replaceHash);
}
