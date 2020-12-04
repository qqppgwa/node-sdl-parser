import fs from 'fs';

const SIZE = 5000;

function createDummy(index: number) {
  return `TOKEN\n
  \tName  = "DUMMY${index}"\n
  \tValue  = "0x0"\n
  \tTokenType = Integer\n
  \tTargetMAK = Yes\n\tTargetH = Yes\n
  \tTargetEQU = Yes\n
  End\n`;
}

export default function appendDummy(fp: string) {
  const logStream = fs.createWriteStream(fp, { flags: 'a' });
  for (let i = 0; i < SIZE; i += 1) {
    const dummy = createDummy(i);
    if (i !== SIZE - 1) {
      logStream.write(dummy);
    } else {
      logStream.end(dummy);
    }
  }
}
