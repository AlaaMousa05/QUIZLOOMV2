/**
 * Migration Script: Update Questions Schema
 * - Removes 'difficulty' field from all questions
 * - Adds 'type' field with default value 'multiple-choice'
 * - Cleans up old data structure
 */

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const Question = require('./models/Question');

async function migrateQuestions() {
  try {
    // Connect to database
    await connectDB();
    console.log('Connected to database');

    // Count total questions
    const totalQuestions = await Question.countDocuments();
    console.log(`\nTotal questions found: ${totalQuestions}`);

    if (totalQuestions === 0) {
      console.log('No questions to migrate.');
      process.exit(0);
    }

    // Update all questions: add type field and remove difficulty
    const result = await Question.updateMany(
      {},
      {
        $set: { type: 'multiple-choice' },
        $unset: { difficulty: '' }
      }
    );

    console.log(`\nMigration completed successfully!`);
    console.log(`  - Updated: ${result.modifiedCount} documents`);
    console.log(`  - Added default type: 'multiple-choice'`);
    console.log(`  - Removed difficulty field`);

    // Verify the migration
    const sample = await Question.findOne().select('type difficulty');
    console.log(`\nSample document after migration:`);
    console.log(`  - type: ${sample?.type || 'N/A'}`);
    console.log(`  - difficulty: ${sample?.difficulty?.toString() || 'removed'}`);

    process.exit(0);
  } catch (error) {
    console.error('\nMigration failed:', error.message);
    process.exit(1);
  }
}

// Run migration
migrateQuestions();
