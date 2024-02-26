const chalk = require("chalk")
function calculadora(n1, n2, op){

    switch (op){
        case "+":
            return(n1 + n2).toFixed(2)
        case "-":
            return(n1 - n2).toFixed(2)
        case "*":
            return(n1 * n2).toFixed(2)
        case "/":
            return(n1 / n2).toFixed(2)
        default:
        console.log(chalk.bgRed.black("Invalid Operation!!!!"))
    }
}

console.log(chalk.bgYellow.black(calculadora(15,62, "+")))
console.log(chalk.bgBlue.white(calculadora(144,72, "-")))
console.log(chalk.bgGreen.black(calculadora(12,7, "*")))
console.log(chalk.bgWhite.red(calculadora(625,15, "/")))
console.log(calculadora(6,8, "|"))