const { execSync } = require('child_process')
const fs = require('fs')

const getPath = require('./Tools/GetPath')

if (!fs.existsSync(getPath(__dirname, ['LightPanel']))) {
  console.log('Installing Light Panel')

	if (fs.existsSync(getPath(__dirname, ['Cache']))) fs.rmSync(getPath(__dirname, ['Cache']), { recursive: true })

	fs.mkdirSync(getPath(__dirname, ['Cache']))

	execSync(`cd "${getPath(__dirname, ['Cache'])}" && git clone https://github.com/Light-Panel/LightPanel.git`)

  fs.cpSync(getPath(__dirname, ['Cache', 'LightPanel', 'LightPanel']), getPath(__dirname, ['LightPanel']), { recursive: true })

  fs.rmSync(getPath(__dirname, ['Cache']), { recursive: true })
}

const { Server } = require('./LightPanel/API')

if (!fs.existsSync(getPath(__dirname, ['Data']))) fs.mkdirSync(getPath(__dirname, ['Data']))

new Server(getPath(__dirname, ['Data']), require('./Options.json'))
