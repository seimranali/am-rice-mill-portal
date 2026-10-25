// Usage: node scripts/hash-password.mjs "<password>"
// Prints a value for the ADMIN_PASSWORD_HASH secret (PBKDF2-SHA256, Workers-compatible).
import { pbkdf2Sync, randomBytes } from 'node:crypto';

const pw = process.argv[2];
if (!pw) {
  console.error('Usage: node scripts/hash-password.mjs "<password>"');
  process.exit(1);
}
const iterations = 100000; // Cloudflare Workers' maximum for PBKDF2
const salt = randomBytes(16);
const hash = pbkdf2Sync(pw, salt, iterations, 32, 'sha256');
console.log(`pbkdf2-sha256$${iterations}$${salt.toString('hex')}$${hash.toString('hex')}`);
