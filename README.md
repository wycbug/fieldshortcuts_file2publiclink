# Getting Started

- Run `npm install` to install dependencies
- Run `npm start` to start server
- Run `npm run dev` to test execute function

# Feishu Attachment → Link (Field Plugin)

This plugin for Feishu Base (多维表格) takes selected attachments as input and outputs their links. It maps each file to its `tmp_url` (fallbacks: `url`, then `link`) and returns newline-separated links.

## Features

- Convert Feishu attachment inputs to links
- Newline-separated output for multiple files
- i18n with minimal keys only
- Context-rich logging for easy log search

## Usage

1. Add the field to your Base sheet.
2. Select attachment(s) in the field input labeled by i18n key `inputText`.
3. Execute. The result text will contain one link per line using `tmp_url` → `url` → `link`.

## i18n keys in use

- `inputText`
- `errorProcessing`
- `parseSuccess`
- `parseFailed`

## Logging

Every log line is prefixed with standardized context fields for traceability:

`[logID=...] [packID=...] [tenantKey=...] [baseID=...] [tableID=...] [baseOwnerID=...] [timeZone=...] [isNeedPayPack=...] [hasQuota=...] [baseSignature=...]`

## Scripts

- `npm start` — run with Basekit CLI
- `npm run dev` — local execute testing
- `npm run build` — build field package
- `npm run pack` — create `output/output.zip`

# Publish

Run `npm run pack` to create output/output.zip file

