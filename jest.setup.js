const jestDom = require('@testing-library/jest-dom');
const { TextEncoder, TextDecoder } = require('text-encoding');
const $ = require('jquery');

global.$ = $;
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;