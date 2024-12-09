import dotenv from 'dotenv';
import path from 'path';

async function globalSetup() {
  // Load environment variables
  dotenv.config({ path: path.resolve(__dirname, '.env') });
}

export default globalSetup;