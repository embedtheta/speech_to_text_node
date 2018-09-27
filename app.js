var express = require('express');
var app = express();
const port = 3000;
var record = require('node-record-lpcm16');
var fs = require('fs');
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  // Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const fs = require('fs');

const client = new speech.SpeechClient({
    keyFilename: ''
  });



// The name of the audio file to transcribe
const fileName = 'test.wav';

// Reads a local audio file and converts it to base64
const file2 = fs.readFileSync(fileName);
const audioBytes = file2.toString('base64');

// The audio file's encoding, sample rate in hertz, and BCP-47 language code
const audio = {
  content: audioBytes,
};
const config = {
  encoding: 'LINEAR',
  sampleRateHertz: 16000,
  languageCode: 'en-US',
};
const request = {
  audio: audio,
  config: config,
};

// Detects speech in the audio file
client
  .recognize(request)
  .then(data => {
    const response = data[0];
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: ${transcription}`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
  });

app.get('/recorder', function (req, res) {
var file = fs.createWriteStream('test.wav', { encoding: 'binary' });

record.start().pipe(file);
// Stop recording after three seconds
setTimeout(function () {
  record.stop();
}, 3000);


});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
