import { EOL } from 'os';

/** make object into array */
function parseObjToArr(obj: any) {
  const finalObj: Object = {};
  const finalArr = obj.forEach((el: any, index: any) => {
    const objWithName = { ...el };
    delete el.Name;
    delete el[''];

    const nameAsTittle: Object = {
      [objWithName['Name']]: { ...el },
    };

    Object.assign(finalObj, nameAsTittle);

    // return nameAsTittle;
  });
  // console.log(finalObj);
  return finalObj;
}
// make every section of  original String into an array
function parseSection(data: string[]) {
  const arr = data.map((el) => {
    const cleanStrArr = el.replace(/|\t/, '').replace(/"/g, '').split(/\t/);
    // console.log(cleanStrArr);
    const cleanStrObjArr = cleanStrArr.map((str) => {
      const [key, ...values] = str.split('=');
      const obj = { [key]: values.join('=') };
      return obj;
    });
    // console.log(cleanStrObjArr);
    const obj: Object = {};
    cleanStrObjArr.forEach((objEl) => {
      Object.assign(obj, objEl);
    });
    return obj;
  });
  return parseObjToArr(arr);
  // return 'll';
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
  console.log(data.split('End'));
  return parseSection(
    data.replace(/TOKEN|\r?\n|\r| |(#(.*)$)/gm, '').split('End')
  );
  // return 'kok;';
  // parseSection(data.replace(/TOKEN|\r?\n|\r| |(#(.*)$)/gm, '').split('End'));
}

export default parse;
