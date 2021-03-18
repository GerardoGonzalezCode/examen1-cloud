const config = require('./config.js');
const express= require('express');
const cors= require('cors');
const app=express();
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.post('/sentiment',(req,res) => {

  console.log(req.body);

  const toneAnalyzer = new ToneAnalyzerV3({
    version: '2017-09-21',
    authenticator: new IamAuthenticator({
      apikey: config.APIKEY_TONE,
    }),
    url: config.URL_TONE,
  });

  const toneParams = {
    toneInput: req.body,
    contentType: 'application/json',
    acceptLanguage:'es',
  };

  toneAnalyzer.tone(toneParams)
    .then(toneAnalysis => {
      console.log(JSON.stringify(toneAnalysis, null, 2)); 
      console.log({"sentiment":toneAnalysis.result.document_tone.tones[0].tone_id });
      res.send(JSON.stringify(toneAnalysis.result.document_tone.tones));
    })
    .catch(err => {
      console.log('error:', err);
    });
});

app.listen(config.PORT,()=> console.log(`listening on port ${config.PORT}`));