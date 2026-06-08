const fs = require('fs');
const path = require('path');

const directoryPath = __dirname;

// Function to process each HTML file
async function processFile(file) {
    if (!file.endsWith('.html') || file === 'index.html') return;
    
    const filePath = path.join(directoryPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if navigation div exists
    const navMatch = content.match(/<div class="navigation">[\s\S]*?<\/div>\s*<header>/);
    if (!navMatch) return;
    
    // Extract navigation HTML
    const navHtml = navMatch[0].replace(/\s*<header>$/, '');
    
    // Remove navigation from its original position
    let newContent = content.replace(navMatch[0], '<header>');
    
    // Add navigation before closing body tag
    newContent = newContent.replace(
        /\s*<\/body>\s*<\/html>/,
        `\n    ${navHtml.trim()}\n</body>\n</html>`
    );
    
    // Write changes back to file
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated navigation in ${file}`);
}

// Read all files in directory
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }
    
    files.forEach(file => processFile(file));
    console.log('All session files have been updated successfully!');
});
