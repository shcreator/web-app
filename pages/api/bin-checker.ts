import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

type BinData = {
  BIN: string;
  Brand: string;
  Bank: string;
  Type: string;
  Category: string;
  Issuer: string;
  IssuerPhone: string;
  IssuerUrl: string;
  isoCode2: string;
  isoCode3: string;
  CountryName: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const results: BinData[] = [];
  const filePath = path.join(process.cwd(), 'data', 'bin-list-data.csv');

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.status(200).json(results);
    });
}
