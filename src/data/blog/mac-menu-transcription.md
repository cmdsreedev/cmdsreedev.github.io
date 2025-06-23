---
title: "macOS Menu Bar App to Control Transcription with Python"
description: "Create a macOS menu bar app using Python and PyObjC to control a transcription script with dynamic audio input selection using sounddevice."
pubDate: 2025-06-23
pubDatetime: 2025-06-23T16:40:22
draft: false
---

## macOS Menu Bar App to Control Transcription

This guide explains how to create a macOS menu bar application using Python that:

- Lists available audio input devices such as BlackHole or built-in microphones.
- Allows device selection from the menu bar.
- Launches a transcription script using the selected device.
- Opens a window to show live transcribed text.

## Prerequisites

- Python 3.8 or newer
- macOS
- Install dependencies:

```bash
pip install pyobjc sounddevice
```

## File Structure

- `menu_app.py`: macOS menu bar app using PyObjC.
- `transcribe.py`: Your transcription script. It must accept `--device` argument and output transcription text to stdout.

## Instructions

1. **Set Up the Menu Bar App**

   Use `NSStatusBar` from PyObjC to create a status item in the macOS menu bar.

2. **List Input Devices**

   Use `sounddevice.query_devices()` to get available audio input devices. Filter for devices with `max_input_channels > 0`.

3. **Generate a Menu for Devices**

   For each input device, create a menu item. When clicked, this sets the selected device.

4. **Start Transcription**

   Use `subprocess.Popen` to run the transcription script with the selected device passed as `--device`. Capture stdout for real-time transcription.

5. **Open Transcription Window**

   Create a `NSWindow` with a `NSTextView` wrapped in a `NSScrollView`. Display transcription output here.

6. **Stop Transcription**

   Terminate the subprocess and close the transcription window.

7. **Quit App**

   Add a Quit menu item that terminates the app and subprocess if running.

## Running the App

Launch the app using:

```bash
python menu_app.py
```

Look for the "Transcribe" menu in the macOS menu bar. Select an input device, start transcription, and see the output in a separate window.

## Notes

- Ensure `transcribe.py` prints transcribed text to stdout.
- The menu bar item must have a title or icon to be visible.
- Use read-only `NSTextView` inside a scroll view for clean text display.
