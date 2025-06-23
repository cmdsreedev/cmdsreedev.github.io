---
title: "Control Your Windows PC with Homebridge"
description: "Learn how to make your Windows PC an accessory for Homebridge and control it using HomeKit."
pubDate: 2025-06-23
pubDatetime: 2025-06-23T16:35:50.314559
draft: false
---

This guide shows you how to make your Windows PC act as an accessory in Homebridge so you can control it using Apple HomeKit.

## 1. Install Node.js

Download and install the LTS version of Node.js from [https://nodejs.org](https://nodejs.org).

## 2. Install Homebridge

Open Command Prompt or PowerShell and run:

```bash
npm install -g homebridge
```

## 3. (Optional) Install Homebridge UI

This helps manage Homebridge easily.

```bash
npm install -g homebridge-config-ui-x
homebridge
```

Then visit `http://localhost:8581`.

## 4. Choose Your Use Case

Decide how you want to control your PC:

- Wake or shut it down
- Run scripts
- Expose system metrics (CPU, RAM, etc.)

## 5. Install Relevant Plugins

### a. Wake and Shutdown

```bash
npm install -g homebridge-wol
```

Update `config.json` with MAC address and IP.

### b. Run Scripts

```bash
npm install -g homebridge-cmd
```

Example configuration:

```json
{
  "accessory": "CMD",
  "name": "Run Script",
  "on": "C:\\Path\\to\\script.bat",
  "off": "C:\\Path\\to\\script-off.bat"
}
```

### c. PC Metrics

```bash
npm install -g homebridge-pc-stats
```

Add to `config.json`:

```json
{
  "accessory": "PCStats",
  "name": "Windows Stats",
  "updateInterval": 10
}
```

## 6. Configure Homebridge

Edit the `config.json` in `.homebridge` directory to include plugin settings.

## 7. Add Homebridge to HomeKit

1. Open the Home app on your iPhone or iPad.
2. Tap "+" > "Add Accessory".
3. Scan the QR code from Homebridge UI or terminal.

## 8. Keep Homebridge Running

Use PM2:

```bash
npm install -g pm2
pm2 start homebridge
pm2 save
```

## Notes

- Enable Wake-on-LAN in BIOS if needed.
- Run Homebridge and your PC on the same local network.
