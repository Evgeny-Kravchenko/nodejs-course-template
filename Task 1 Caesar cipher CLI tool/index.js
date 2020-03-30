const { program } = require('commander');
const { pipeline } = require('stream');
const through2 = require('through2');
const fs = require('fs');
const transform = require('./transform');
const checkErrors = require('./check-errors');

program
  .option('-a, --action <action>', 'an action encode/decode')
  .option('-s, --shift <number>', 'a shift')
  .option('-i, --input <file>', 'an input file')
  .option('-o, --output <file>', 'an output file')
  .action(cmd => {
    const isAction = Object.prototype.hasOwnProperty.call(cmd, 'action');
    const isShift = Object.prototype.hasOwnProperty.call(cmd, 'shift');
    const isInputParameter = Object.prototype.hasOwnProperty.call(cmd, 'input');
    const isOutputParameter = Object.prototype.hasOwnProperty.call(
      cmd,
      'output'
    );
    // eslint-disable-next-line no-sync
    const isInputFile = fs.existsSync(`${cmd.input}`);
    // eslint-disable-next-line no-sync
    const isOutputFile = fs.existsSync(`${cmd.output}`);

    checkErrors.checkParameters(isAction, isShift);
    checkErrors.checkFile(
      isInputParameter,
      isOutputParameter,
      isInputFile,
      isOutputFile
    );

    const inputStream = isInputParameter
      ? fs.createReadStream(`./${cmd.input}`)
      : process.stdin;
    const outputStream = isOutputParameter
      ? fs.createWriteStream(`./${cmd.output}`, { flags: 'a' })
      : process.stdout;
    const caesarCipher = through2(
      transform.caesarCipher(cmd.shift, cmd.action)
    );

    pipeline(inputStream, caesarCipher, outputStream, err => {
      if (err) {
        console.error('Pipeline failed.', err);
      } else {
        console.log('Pipeline succeeded.');
      }
    });
  });

program.parse(process.argv);
