function checkParameters(isAction, isShift) {
  if (!isAction || !isShift) {
    if (!isAction) {
      process.stderr.write(
        "You've missed the required parameters '--action'\n"
      );
    }
    if (!isShift) {
      process.stderr.write("You've missed the required parameters '--shift'\n");
    }
    const exit = process.exit;
    exit(1);
  }
}

function checkFile(
  isInputParameter,
  isOutputParameter,
  isInputFile,
  isOutputFile
) {
  if (
    (isInputParameter && !isInputFile) ||
    (isOutputParameter && !isOutputFile)
  ) {
    if (isInputParameter && !isInputFile) {
      process.stderr.write(
        'Input file does not exist or cannot be read. Change the file path and try again.\n'
      );
    }
    if (isOutputParameter && !isOutputFile) {
      process.stderr.write(
        'Output file does not exist or cannot be read. Change the file path and try again.\n'
      );
    }
    const exit = process.exit;
    exit(2);
  }
}

module.exports.checkParameters = checkParameters;

module.exports.checkFile = checkFile;
