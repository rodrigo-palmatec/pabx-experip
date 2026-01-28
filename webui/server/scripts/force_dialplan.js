const { syncDatabase } = require('../models');
const DialplanGenerator = require('../services/dialplanGenerator');
const logger = require('../utils/logger'); // Ensure logger is available or mock it if needed

// Mock logger if not found or complex
if (!logger.info) {
    logger.info = console.log;
    logger.error = console.error;
    logger.warn = console.warn;
}

async function run() {
    try {
        console.log("Connecting to DB...");
        await syncDatabase();
        console.log("Generating Dialplan...");
        const generator = new DialplanGenerator();
        const result = await generator.generateDialplan();
        console.log("Result:", result);
    } catch (e) {
        console.error("Error:", e);
    } finally {
        process.exit(0);
    }
}

run();
