const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  '**/*.(ts|tsx)': () => 'tsc -p tsconfig.json --noEmit',
  '**/app/**/*.(js|ts|tsx|json)': [buildEslintCommand],
};
