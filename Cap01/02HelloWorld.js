// require importação de modulo
const readline = require('readline')
console.log('Hello, World!')
// readline é um módulo com a funcionalidade de receber entradas no console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Qual é seu nome?\n', (name) => {
    console.log(`Olá ${name}`)
})
console.log('Hello, cruel World.')