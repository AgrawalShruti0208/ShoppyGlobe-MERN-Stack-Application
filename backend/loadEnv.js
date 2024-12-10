import fs from 'fs';
import path from 'path';


// Function to load environment variables
export function loadEnv(filePath) {
    const absolutePath = path.resolve(filePath); // Resolve the file path
    if (!fs.existsSync(absolutePath)) {
        throw new Error(`Environment file not found: ${filePath}`);
    }

    const envData = fs.readFileSync(absolutePath, 'utf-8'); // Read file content
    const lines = envData.split('\n'); // Split by lines

    lines.forEach(line => {
        // Ignore empty lines and comments
        if (!line || line.startsWith('#')) return;

        const [key, value] = line.split('=').map(str => str.trim()); // Split key and value
        if (key && value) {
            process.env[key] = value; // Set the variable in process.env
        }
    });
}



