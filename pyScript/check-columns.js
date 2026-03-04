const XLSX = require('xlsx');

const wb = XLSX.readFile('Compan HR contact.xlsx');
const ws = wb.Sheets[wb.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(ws);

console.log('Column names:', Object.keys(data[0]));
console.log('\nFirst few rows:');
console.log(JSON.stringify(data.slice(0, 3), null, 2));
