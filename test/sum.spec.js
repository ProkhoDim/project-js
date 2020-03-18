const esmImport = require('esm')(module);
const sum = esmImport('./sum.js').sum;

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
