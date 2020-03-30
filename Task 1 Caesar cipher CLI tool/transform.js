const lowerMinCode = 65;
const lowerMaxCode = 90;
const upperMinCode = 97;
const upperMaxCode = 122;

function encode(chunk, shift) {
  for (let i = 0; i < chunk.length; i++) {
    if (chunk[i] >= lowerMinCode && chunk[i] <= lowerMaxCode) {
      if (chunk[i] + Number(shift) > lowerMaxCode) {
        for (let j = 0; j < Number(shift); j += 1) {
          chunk[i] = chunk[i] < lowerMaxCode ? chunk[i] + 1 : lowerMinCode;
        }
        continue;
      }
      chunk[i] = chunk[i] + +shift;
    } else if (chunk[i] >= upperMinCode && chunk[i] <= upperMaxCode) {
      if (chunk[i] + +shift > upperMaxCode) {
        for (let j = 0; j < Number(shift); j += 1) {
          chunk[i] = chunk[i] < upperMaxCode ? chunk[i] + 1 : upperMinCode;
        }
        continue;
      }
      chunk[i] = chunk[i] + Number(shift);
    }
  }
}

function decode(chunk, shift) {
  for (let i = 0; i < chunk.length; i++) {
    if (chunk[i] >= lowerMinCode && chunk[i] <= lowerMaxCode) {
      if (chunk[i] - Number(shift) < lowerMinCode) {
        for (let j = 0; j < Number(shift); j += 1) {
          chunk[i] = chunk[i] > lowerMinCode ? chunk[i] - 1 : lowerMaxCode;
        }
        continue;
      }
      chunk[i] = chunk[i] - Number(shift);
    } else if (chunk[i] >= upperMinCode && chunk[i] <= upperMaxCode) {
      if (chunk[i] - Number(shift) < upperMinCode) {
        for (let j = 0; j < Number(shift); j += 1) {
          chunk[i] = chunk[i] > upperMinCode ? chunk[i] - 1 : upperMaxCode;
        }
        continue;
      }
      chunk[i] = chunk[i] - Number(shift);
    }
  }
}

function caesarCipher(shift, action) {
  function actionFunc(chunk, enc, callback) {
    switch (action) {
      case 'encode':
        encode(chunk, shift);
        break;
      case 'decode':
        decode(chunk, shift);
        break;
      default: {
        process.stderr.write('There is not this action.\n');
        const exit = process.exit;
        exit(3);
      }
    }
    this.push(chunk);
    callback();
  }
  return actionFunc;
}

module.exports.caesarCipher = caesarCipher;
