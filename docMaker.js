import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';
import { oceanSentences, spaceSentences, animalSentences } from './sentences.js';
import { bucketPathStr } from './gc.js';

const allSentences = [...oceanSentences, ...spaceSentences, ...animalSentences];


function getJsonForStr(str) {
  const obj = {};
  obj.id = nanoid();
  obj.info = { foo: 'bar' };
  obj.words = [str];
  return JSON.stringify(obj);
}

function makeTheFiles(batchId){
  allSentences.forEach((sentence, i) => {
    const jsonString = getJsonForStr(sentence);
    const txtFileName = `file${i}.txt`;
    const dirPath = path.join(path.dirname(new URL(import.meta.url).pathname), 'files', `files_${batchId}`);
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

function createCSVFile(batchId){
  const csvFileName = `${batchId}_schema.csv`;
  const filesDirPath = path.join(path.dirname(new URL(import.meta.url).pathname), 'files');
  const dirName = `files_${batchId}`;
  const dirPath = path.join(filesDirPath, dirName);
  const csvFilePath = path.join(dirPath, csvFileName);
  const writeStream = fs.createWriteStream(csvFilePath);

  // Create the new directory inside the 'files' directory
  fs.mkdirSync(dirPath);

  allSentences.forEach((sentence, i) => {
    const fileUri = `gs://${bucketPathStr}/files_${batchId}/file${i}.txt`;
    const tag = getTag(i);
    writeStream.write(`${fileUri},${tag}\n`);
  });

  writeStream.end();
}

function run(){
  const batchId = nanoid().substring(0, 8);
  createCSVFile(batchId);
  makeTheFiles(batchId);
  console.log("Done with batchId: ", batchId);
}

run();

// c89CvLBc