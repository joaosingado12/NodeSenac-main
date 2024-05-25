let prompt = require('prompt-sync')
prompt = prompt({ sigint: true })
console.log('Hello, World!\r\n')

let name = prompt('Qual seu nome? ')
console.log(`Olá ${name}! \r\n`)
console.log('Hello, World! 2')
