'use strict';

const path = require('node:path');
const metatests = require('metatests');
const metautil = require('..');

metatests.case(
  'String functions',
  { metautil },
  {
    'metautil.split': [
      ['abc.def', '.', ['abc', 'def']],
      ['abc.', '.', ['abc', '']],
      ['abc', '.', ['abc', '']],
      ['.abc', '.', ['', 'abc']],
      ['.', '.', ['', '']],
      ['', '.', ['', '']],
      ['abc', '', ['', 'abc']],
    ],
    'metautil.replace': [
      ['a2a2a2', 'a2', 'z', 'zzz'],
      ['k2k2k2', 'a2', 'z', 'k2k2k2'],
      ['', 'a2', 'z', ''],
      ['a2', '', 'z', 'a2'],
      ['a2', 'a2', '', ''],
      ['a2', 'a2', 'a2', 'a2'],
      ['a2a2a2', 'a2', 'a2', 'a2a2a2'],
      ['a20w10z2a22aa0', 'a2', '', '0w10z22aa0'],
    ],
    'metautil.between': [
      ['abcdefghijk', 'cd', 'h', 'efg'],
      ['field="value"', '"', '"', 'value'],
      ['field:"value"', '"', '"', 'value'],
      ['field[value]', '[', ']', 'value'],
      ['kjihgfedcba', 'cd', 'h', ''],
      ['kjihgfedcba', 'dc', 'h', ''],
      ['field="value"', '=', '=', ''],
      ['field[value]', '{', '}', ''],
      ['{a:"b",c:"d"}', '"', '"', 'b'],
      ['abcdefghijk', 'cd', 'efghijk'],
    ],
    'metautil.isFirstUpper': [
      ['Abcd', true],
      ['abcd', false],
      ['aBCD', false],
      ['', false],
      ['?string', false],
    ],
    'metautil.isFirstLower': [
      ['Abcd', false],
      ['abcd', true],
      ['aBCD', true],
      ['', false],
      ['?string', false],
    ],
    'metautil.isFirstLetter': [
      ['Abcd', true],
      ['abcd', true],
      ['', false],
      ['?string', false],
    ],
    'metautil.toLowerCamel': [
      ['Abcd', 'abcd'],
      ['abcd', 'abcd'],
      ['aBCD', 'aBCD'],
      ['AbCd', 'abCd'],
      ['aBcD', 'aBcD'],
      ['', ''],
    ],
    'metautil.toUpperCamel': [
      ['Abcd', 'Abcd'],
      ['abcd', 'Abcd'],
      ['aBCD', 'ABCD'],
      ['AbCd', 'AbCd'],
      ['aBcD', 'ABcD'],
      ['', ''],
    ],
    'metautil.toLower': [
      ['abcd', 'abcd'],
      ['ABCD', 'abcd'],
      ['', ''],
    ],
    'metautil.toCamel': [
      ['-', (f) => f('ab-cd') === 'abCd'],
      ['--', (f) => f('AB--CD') === 'abCd'],
      ['', (f) => f('') === ''],
    ],
    'metautil.spinalToCamel': [
      ['abcd', 'abcd'],
      ['ab-cd', 'abCd'],
      ['AB-CD', 'abCd'],
      ['AB-CD', 'abCd'],
      ['a', 'a'],
      ['', ''],
      ['-', ''],
    ],
    'metautil.snakeToCamel': [
      ['abcd', 'abcd'],
      ['ab_cd', 'abCd'],
      ['AB_CD', 'abCd'],
      ['AB_CD', 'abCd'],
      ['a', 'a'],
      ['', ''],
      ['_', ''],
    ],
    'metautil.isConstant': [
      ['UPPER', true],
      ['UPPER_SNAKE', true],
      ['lowercase', false],
      ['camelCase', false],
      ['PascalCase', false],
      ['snake_case', false],
    ],
  },
);

metatests.case(
  'Path functions',
  { metautil },
  {
    'metautil.fileExt': [
      ['/dir/dir/file.txt', 'txt'],
      ['/dir/dir/file.txt', 'txt'],
      ['\\dir\\file.txt', 'txt'],
      ['/dir/dir/file.txt', 'txt'],
      ['/dir/file.txt', 'txt'],
      ['/dir/file.TXt', 'txt'],
      ['//file.txt', 'txt'],
      ['file.txt', 'txt'],
      ['/dir/.ext', 'ext'],
      ['/dir.ext/', ''],
      ['/dir/dir', ''],
      ['/dir/', ''],
      ['/dir', ''],
      ['/', ''],
      ['.', ''],
      ['', ''],
    ],
    'metautil.parsePath': [
      ['', ['']],
      ['file', ['file']],
      ['file.js', ['file']],
      [`example${path.sep}stop`, ['example', 'stop']],
      [`example${path.sep}stop.js`, ['example', 'stop']],
      [`example${path.sep}sub2${path.sep}do.js`, ['example', 'sub2', 'do']],
    ],
    'metautil.trimLines': [
      ['abc', 'abc'],
      ['  abc', 'abc'],
      ['abc  ', 'abc'],
      ['   a   b   c   ', 'a   b   c'],
      ['  \n  a  \n  b  \n  c  \n  ', 'a\nb\nc'],
      ['', ''],
    ],
  },
);
