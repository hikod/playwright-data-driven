import { readFileSync } from 'fs';
import { join } from 'path';

export class DataLoader {
  static loadTestData(filename: string) {
    const filePath = join(__dirname, '../fixtures/test-data', filename);
    const rawData = readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
  }
}