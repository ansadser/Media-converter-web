# MediaFlow Web

Premium Next.js frontend for the Media Converter project.

## Local
`npm install` then `npm run dev`

## Vercel
Import this repository into Vercel and use the default Next.js settings.

The frontend is separated from FFmpeg processing. Connect the Convert action to a server-side media-processing API for actual conversion; keep large temporary media files and FFmpeg off the Vercel frontend runtime.