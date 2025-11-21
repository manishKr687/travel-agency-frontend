const fs = require('fs');
const path = require('path');

const fetchPackages = () => {
  try {
    const dataPath = path.join(__dirname, '..', 'src', 'data', 'packages.json');
    const packagesData = fs.readFileSync(dataPath, 'utf8');
    const packages = JSON.parse(packagesData);

    const outputPath = path.join(__dirname, '..', 'public', 'packages.json');
    fs.writeFileSync(outputPath, JSON.stringify(packages, null, 2));
    
    console.log(`Successfully saved ${packages.length} packages to public/packages.json`);
  } catch (error) {
    console.error('Error saving packages:', error);
    process.exit(1); // Exit with an error code
  }
};

fetchPackages();