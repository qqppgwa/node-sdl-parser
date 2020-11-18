import { EOL } from 'os';

function letsParty(obj: any) {
  console.log(obj);
  const perfect = obj.forEach((el: any) => {
    // console.log(Object.keys(el));
    // console.log(el.Name);
    const objWithName = { ...el };
    delete el.Name;
    // console.log({ [objWithName.Name]: { ...el } });
    const a: any = { [objWithName['Name']]: { ...el } };
    console.log(a);
  });
}

function parseSection(data: string[]) {
  // console.log(data);

  const shit = data.map((el) => {
    // console.log(el.replace(/\t/g, ',').replace(/,/, ''));
    const toArray = el.replace(/|\t/, '').replace(/"/g, '').split(/\t/);
    const a = toArray.map((str) => {
      const [key, ...values] = str.split('=');
      const obj = { [key]: values.join('=') };
      return obj;
    });
    const QQ: Object = {};
    a.forEach((objEl) => {
      Object.assign(QQ, objEl);
    });
    return QQ;
  });
  letsParty(shit);
}
/**{
 * 
 * const objWithoutName = obj.
 *[name]:{
   ...objWithoutName
 } 
 *}
 */

/**
 * parse
 * @param {string} data
 */
function parse(data: string) {
  // console.log(data.split(/^TOKEN(?:\r\n|[\r\n])([\s\S]*?)End$/gm));
  // parseSection(data.replace(/TOKEN|\r?\n|\t|\r| |(#(.*)$)/gm, '').split('End'));
  parseSection(data.replace(/TOKEN|\r?\n|\r| |(#(.*)$)/gm, '').split('End'));
}

export default parse;
