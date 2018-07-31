/**
 * Pega os argumentos enviados por terminal
 * Exemplo/parse.js -x 3 -y 4 -n5 -abc --beep=boop foo bar baz
 * {
 *   _: [ 'foo', 'bar', 'baz' ],
 *   x: 3,
 *   y: 4,
 *   n: 5,
 *   a: true,
 *   b: true,
 *   c: true,
 *   beep: 'boop'
 * }
 */
module.exports = require('minimist')(process.argv.slice(2));
