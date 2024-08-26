const fs = require('fs');
const path = require('path');

// Regular expression for commit : each message should be in present tense and include a single word + 10 words description
// the maximum number of charactersin head is 72 and body is 100
const pattern = /^(bug-fix|feature|test|docs|revert): .{1,72}\n\n((.{1,100}\n?)*?)$/;

// Read the commit message file path from command line arguments
const commitMsgFile = process.argv[2];

// Read the commit message
fs.readFile(commitMsgFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Failed to read commit message file:', err);
    process.exit(1);
  }

  // Validate the commit message
  const commitMsg = data.trim();
  if (!pattern.test(commitMsg)) {
    console.error('Error: Commit message does not follow conventional commit format.');
    console.error('Example of correct format: feat(module): add new feature');
    process.exit(1);
  }
});
