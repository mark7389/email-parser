# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Node.js MIME email parser that reads raw email files from `data/`, parses headers and multipart MIME bodies, and outputs structured JSON.

## Running

```bash
cd main && node parser.js
```

This reads all files from `data/`, parses each one, and prints JSON to stdout.

## Architecture

The pipeline flows: `main/parser.js` → `lib/extract.js` → individual parsers.

- **main/parser.js** - Entry point; calls extract and logs JSON result.
- **lib/extract.js** - Core orchestrator. Reads each mail file, splits headers from body, detects MIME boundaries, and delegates to `headers()` and `body()` for parsing. Returns an array of mail objects shaped `{header, boundaries, body}`.
- **lib/headers.js** - Parses header lines into key-value object. Handles multi-line (folded) headers by appending continuation lines with `" | "`.
- **lib/body.js** - Parses individual MIME body parts into `{bodyHeader, text}` using the same header parser for part-level headers.
- **lib/regExps.js** - Shared regex patterns (CRLF line breaks, boundary extraction, colon splitting, etc.).
- **lib/getMail.js** - Reads the `data/` directory and returns the list of filenames.

## Key Details

- Email files use CRLF (`\r\n`) line endings; the regexes in `regExps.js` depend on this.
- No package.json or dependencies; uses only Node.js built-in modules (`fs`).
- No test framework is configured; test by placing `.txt` email files in `data/` and running the parser.
- `getMail.js` reads from a relative path `../data`, so the parser must be run from within the `main/` directory.
