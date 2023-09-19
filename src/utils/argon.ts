import * as argon2 from 'argon2';
class ArgonService {
  private memoryCost: number;
  private parallelism: number;
  private hashLength: number;

  constructor() {
    this.memoryCost = Number(process.env.ARGON_MEMORY_COST) || 65536; // You can adjust this value as needed
    this.parallelism = Number(process.env.ARGON_PARALLELISM) || 2; // You can adjust this value as needed
    this.hashLength = Number(process.env.ARGON_HASH_LENGTH) || 32; // You can adjust this value as needed
  }

  hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id, // You can choose the type you prefer
      memoryCost: this.memoryCost,
      parallelism: this.parallelism,
      hashLength: this.hashLength,
    });
    return hashedPassword;
  };

  comparePassword = async (
    password: string,
    hashPassword: string,
  ): Promise<boolean> => {
    const passwordsMatch = await argon2.verify(hashPassword, password);
    return passwordsMatch;
  };
}

export default new ArgonService();
