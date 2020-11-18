import { EOL } from 'os';

/**
 *
 * @param line
 */
function parseLine(line: string) {
  // TODO:
}

/**
 *
 * @param section
 */
function parseSection(section: string[]) {
  // TODO:
}

/**
 *
 * @param data
 */
function toSections(data: string): string[][] {
  /** split data into sections*/
  const sections = data
    .split(/^TOKEN(?:\r\n|[\r\n])([\s\S]*?)End$/gm) // split data into sections
    /** reducing valid section */
    .reduce((acc: string[][], value) => {
      const trim = value.trim();
      if (trim) {
        const splited = trim.split(EOL).map((o) => o.trim());
        acc.push(splited);
      }

      return acc;
    }, []);

  return sections;
}

/**
 * parse
 * @param {string} data
 */
function parse(data: string) {
  /** parse data into sections */
  const sections = toSections(data);

  /** handle section */
  for (let section of sections) {
    // TODO:
  }
  console.log(sections);
}

export default parse;
