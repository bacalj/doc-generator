import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';

const oceanSentences = [
  "The ocean is vast and mysterious",
  "The waves crash against the shore",
  "The ocean is home to many creatures",
  "The saltwater stings my eyes",
  "The ocean is a beautiful shade of blue",
  "The sound of the ocean is soothing",
  "The ocean is a source of life and inspiration",
  "The ocean is a powerful force of nature",
  "The ocean is full of surprises and wonders",
  "The ocean is a place of peace and tranquility"
];

const spaceSentences = [
  "The universe is vast and mysterious",
  "The stars twinkle in the night sky",
  "Space is home to many celestial bodies",
  "The vacuum of space is deadly to humans",
  "The Milky Way is a beautiful sight to behold",
  "The silence of space is eerie",
  "Space exploration is a source of inspiration",
  "The power of a black hole is immense",
  "Space is full of surprises and wonders",
  "The view of Earth from space is breathtaking"
];

const animalSentences = [
  "The elephant is the largest land animal",
  "The cheetah is the fastest land animal",
  "The blue whale is the largest animal on Earth",
  "The peregrine falcon is the fastest animal on Earth",
  "The honey badger is known for its toughness"
];

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
    fs.writeFileSync(path.join(__dirname, 'files', txtFileName), jsonString);
  });
}

function run(){
  makeTheFiles();
}

run();