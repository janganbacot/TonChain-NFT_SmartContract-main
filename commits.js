const { execSync } = require('child_process');
const fs = require('fs');

// Settings
const fileName = 'weekly_commit.txt';
const message = 'Backdated commit for';
const startDate = new Date();
startDate.setMonth(startDate.getMonth() - 3); // 3 months ago
const today = new Date();

function formatDate(date) {
  return date.toISOString().split('T')[0] + 'T10:00:00';
}

function commitAtDate(date) {
  const dateStr = formatDate(date);

  // Append to the file
  fs.appendFileSync(fileName, `${message} ${date.toDateString()}\n`);

  // Stage changes
  execSync(`git add ${fileName}`);

  // Commit with backdated timestamps
  execSync(
    `GIT_AUTHOR_DATE="${dateStr}" GIT_COMMITTER_DATE="${dateStr}" git commit -m "${message} ${date.toDateString()}"`
  );

  console.log(`✅ Commit made for ${date.toDateString()}`);
}

// Commit once every 7 days from 3 months ago to today
let currentDate = new Date(startDate);
while (currentDate <= today) {
  commitAtDate(currentDate);
  currentDate.setDate(currentDate.getDate() + 7); // weekly commits
}

console.log('\n🚀 All backdated commits created!');
console.log('👉 Now run: git push origin main');
