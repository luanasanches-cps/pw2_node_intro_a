module.exports = {
    calculadora(n1, n2, op) {
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
                console.log("Invalid Operation!!!!")
        }        
    },
    cientifica(n1, n2, op){
        switch(op) {
            case "sr":
                return(Math.sqrt(n1+n2))
            default:
                console.log("Invalid Operation!!!!")    
        }
    }
}

