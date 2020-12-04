/**
 * locate sdl file path
 */
import fs from 'fs';
import path from 'path';
import appendDummy from './utils/appendDummy';
import parse from '../src/parse';
import readFile from '../src/readFile';

const fpTestData = path.join(__dirname, './data/Oem.sdl');
const fpTestDataJumbo = path.join(__dirname, './data/Oem.Jumbo.sdl');

/**
 * 初始化函式，製作Oem.Jumbo.sdl
 */
function init() {
  return new Promise((resolve, reject) => {
    fs.copyFile(fpTestData, fpTestDataJumbo, function (err) {
      if (err) reject(err);
      appendDummy(fpTestDataJumbo);
      resolve();
    });
  });
}
beforeAll(init);

/**
 * 完成所有test case後，刪除Jumbo
 */
function clean() {
  return new Promise((resolve, reject) => {
    fs.unlink(fpTestDataJumbo, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}
afterAll((done) => {
  clean().then(() => {
    done();
  });
});

async function readData(file: string) {
  /** read file */
  const data = await readFile(file).then((res) => parse(res));
  // console.log(data);
  return data;
}

/**
 * start_test
 */
function start_test() {
  const check = (data: any) => {
    expect(data['PHASE_CODE'].Value).toEqual('A');
    expect(data['PROJECT_MAJOR_VERSION'].Value).toEqual('0');
    expect(data['PROJECT_MINOR_VERSION'].Value).toEqual('01');
  };
  test('Normal size', async function () {
    // Put your test case here
    return await readData(fpTestData).then((data: any) => {
      // console.log(data['PHASE_CODE'].Value);
      check(data);
    });
  });

  test('Fat size', async function () {
    // Put your test case here
    return await readData(fpTestDataJumbo).then((data: object) => {
      // console.log(data);
      check(data);
    });
  });
}

start_test();
