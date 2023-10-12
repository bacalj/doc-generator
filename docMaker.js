import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';
import { oceanSentences, spaceSentences, animalSentences } from './sentences.js';

const allSentences = [...oceanSentences, ...spaceSentences, ...animalSentences];

function getJsonForStr(str) {
  const obj = {};
  obj.id = nanoid();
  obj.info = { foo: 'bar' };
  obj.words = [str];
  return JSON.stringify(obj);
}

function makeTheFiles(){
  allSentences.forEach((sentence, i) => {
    const jsonString = getJsonForStr(sentence);
    const txtFileName = `file${i}.txt`;
    const dirPath = path.join(path.dirname(new URL(import.meta.url).pathname), 'files');
    fs.writeFile(path.join(dirPath, txtFileName), jsonString, (err) => {
      if (err) throw err;
    });
  });
}

function getTag(i){
  if (i < 10) return 'ocean';
  if (i >= 10 && i < 20) return 'space';
  if (i >= 20) return 'animal';
}

function createCSVFile(){
  const csvFileName = 'schema.csv';
  const dirPath = path.join(path.dirname(new URL(import.meta.url).pathname), 'files');
  const csvFilePath = path.join(dirPath, csvFileName);
  const writeStream = fs.createWriteStream(csvFilePath);

  writeStream.write('fileName,words,tag\n');
  allSentences.forEach((sentence, i) => {
    const fileNameStr = `file${i}.txt`;
    const tag = getTag(i);
    writeStream.write(`${fileNameStr},${sentence},${tag}\n`);
  });

  writeStream.end();
}

function run(){
  makeTheFiles();
  createCSVFile();
  console.log("Done!");
}

run();