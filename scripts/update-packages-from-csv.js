
const fs = require('fs');
const path = require('path');

console.log('Starting package conversion...');

const csvFilePath = path.join(__dirname, '..', 'packages.csv');
const jsonFilePath = path.join(__dirname, '..', 'public', 'packages.json');

// Check if packages.csv exists
if (!fs.existsSync(csvFilePath)) {
  console.error(`Error: 'packages.csv' not found in the project root.`);
  console.error('Please make sure the client has provided the CSV file and it is in the root directory.');
  process.exit(1);
}

const csvData = fs.readFileSync(csvFilePath, 'utf8');

// Basic CSV parser
function parseCSV(data) {
  const lines = data.trim().split(/\r?\n/); // Handles both windows and unix line endings
  if (lines.length < 2) {
    console.error('Error: CSV file must have a header row and at least one data row.');
    process.exit(1);
  }
  
  const headers = lines[0].split(',').map(h => h.trim());
  const packages = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    // This is a simple parser. It will not handle commas within a field.
    // For more complex CSVs, a dedicated library would be better.
    if (values.length !== headers.length) {
      console.warn(`Warning: Skipping row ${i + 1} due to mismatched number of columns.`);
      continue;
    }
    
    const packageData = {};
    for (let j = 0; j < headers.length; j++) {
      const header = headers[j];
      const value = values[j].trim();
      if (header === 'id' || header === 'duration') {
        packageData[header] = parseInt(value, 10);
      } else if (header === 'price') {
        packageData[header] = parseFloat(value);
      } else {
        packageData[header] = value;
      }
    }
    packages.push(packageData);
  }
  return packages;
}

try {
  const packages = parseCSV(csvData);

  if (packages.length > 0) {
    fs.writeFileSync(jsonFilePath, JSON.stringify(packages, null, 2));
    console.log(`Successfully converted 'packages.csv' to 'public/packages.json'. ${packages.length} packages updated.`);
  } else {
    console.warn('Warning: No packages were found in the CSV file. `packages.json` was not updated.');
  }

} catch (error) {
  console.error('An error occurred during the conversion process:', error);
  process.exit(1);
}
