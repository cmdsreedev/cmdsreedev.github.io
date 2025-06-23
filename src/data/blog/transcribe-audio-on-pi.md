---
title: "How to Transcribe Audio on Raspberry Pi"
description: "Audio transcription with Pi"
pubDate: 2025-06-23
pubDatetime: 2025-06-23T16:30:01.891031
draft: false
---

You can transcribe audio on a Raspberry Pi using one of several methods depending on your needs and hardware:

## 1. Vosk (Offline, Lightweight)

Vosk is a lightweight speech recognition engine that works well on Raspberry Pi.

### Steps:

1. Install:

   ```bash
   sudo apt update
   sudo apt install python3-pip
   pip3 install vosk
   ```

2. Download a lightweight model from [https://alphacephei.com/vosk/models](https://alphacephei.com/vosk/models)

3. Basic Python example:

   ```python
   from vosk import Model, KaldiRecognizer
   import wave

   model = Model("path/to/vosk-model")
   wf = wave.open("path/to/audio.wav", "rb")
   rec = KaldiRecognizer(model, wf.getframerate())

   while True:
       data = wf.readframes(4000)
       if len(data) == 0:
           break
       if rec.AcceptWaveform(data):
           print(rec.Result())
       else:
           print(rec.PartialResult())
   print(rec.FinalResult())
   ```

## 2. Google Speech-to-Text (Cloud)

High-accuracy option requiring internet.

### Steps:

1. Install:

   ```bash
   pip3 install google-cloud-speech
   ```

2. Set up credentials from Google Cloud.

3. Example code:

   ```python
   from google.cloud import speech
   import io

   client = speech.SpeechClient()
   with io.open("path/to/audio.wav", "rb") as audio_file:
       content = audio_file.read()

   audio = speech.RecognitionAudio(content=content)
   config = speech.RecognitionConfig(
       encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
       sample_rate_hertz=16000,
       language_code="en-US"
   )

   response = client.recognize(config=config, audio=audio)
   for result in response.results:
       print("Transcript:", result.alternatives[0].transcript)
   ```

## 3. Whisper by OpenAI (Offline, Powerful)

Accurate but heavier. Use `tiny` or `base` model for Pi.

### Steps:

1. Install:

   ```bash
   pip3 install git+https://github.com/openai/whisper.git
   ```

2. Example:

   ```python
   import whisper

   model = whisper.load_model("tiny")
   result = model.transcribe("path/to/audio.wav")
   print(result["text"])
   ```
