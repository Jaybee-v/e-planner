import * as bcrypt from 'bcrypt';

export function hashPassword(password: string) {
  const saltOrRounds = 10;
  const hash = bcrypt.hash(password, saltOrRounds);
  return hash;
}

export function comparePassword(password: string, hashedPassword: string) {
  const result = bcrypt.compare(password, hashedPassword);
  return result;
}
