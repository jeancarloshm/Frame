const { TextEncoder, TextDecoder } = require('text-encoding');
const $ = require('jquery');

global.$ = $;
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;