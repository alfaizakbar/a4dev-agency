import fs from 'fs';

try {
  // Read the logo image
  const img = fs.readFileSync('public/logo-white-gede.jpg');
  const base64 = img.toString('base64');
  
  // Create SVG with base64 embedded image and circular clip-path
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <clipPath id="circleView">
      <circle cx="256" cy="256" r="256" />
    </clipPath>
  </defs>
  <image href="data:image/jpeg;base64,${base64}" width="512" height="512" clip-path="url(#circleView)" preserveAspectRatio="xMidYMid slice" />
</svg>`;
  
  // Overwrite favicon.svg
  fs.writeFileSync('public/favicon.svg', svg);
  console.log('Favicon updated successfully!');
} catch (error) {
  console.error('Error updating favicon:', error);
}
