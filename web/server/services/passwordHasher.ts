import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePasswords = async (hash: string, password: string) => {
  return bcrypt.compare(password, hash);
};
