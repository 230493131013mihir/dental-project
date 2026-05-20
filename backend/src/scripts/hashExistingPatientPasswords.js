const crypto = require("crypto");
const pool = require("../db/mysql");

const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
};

const migratePasswords = async () => {
  const [patients] = await pool.query("SELECT id, password FROM patient");
  let updatedCount = 0;

  for (const patient of patients) {
    if (!patient.password || patient.password.startsWith("scrypt:")) {
      continue;
    }

    await pool.query("UPDATE patient SET password=? WHERE id=?", [
      hashPassword(patient.password),
      patient.id,
    ]);

    updatedCount += 1;
  }

  console.log(`Updated ${updatedCount} patient password(s).`);
  await pool.end();
};

migratePasswords().catch(async (error) => {
  console.error(error);
  await pool.end();
  process.exit(1);
});
