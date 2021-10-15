const strExample = "(Catch) me if you (can).";

function findFirstStringInBracket(str) {
    if (str.length > 0) {
        let indexFirstBracketFound = str.indexOf("(");
        if (indexFirstBracketFound >= 0) {
            let wordsAfterFirstBracket = str.substr(indexFirstBracketFound);
            if (wordsAfterFirstBracket) {
                wordsAfterFirstBracket = wordsAfterFirstBracket.substr(1);
                let indexClosingBracketFound = wordsAfterFirstBracket.indexOf(")");
                if (indexClosingBracketFound >= 0) {
                    return wordsAfterFirstBracket.substring(0,
                        indexClosingBracketFound);
                } else {
                    return '';
                }
            } else {
                return '';
            }
        } else {
            return '';
        }
    } else {
        return '';
    }
}

function findFirstStringInBracketRefactored(str) {
    let res = '';
    if (str.length < 1) return res;
    const startIndex = str.indexOf("(");
    const endIndex = str.indexOf(")");
    if (startIndex < 0 || endIndex < 0 || endIndex <= startIndex) return res;
    return str.substring(startIndex + 1, endIndex);
}

// Could use regex for easier code

console.log(findFirstStringInBracket(strExample));
console.log(findFirstStringInBracketRefactored(strExample));
console.log(findFirstStringInBracket("(()()())"));
console.log(findFirstStringInBracketRefactored("(()()())"));
console.log(findFirstStringInBracket("("));
console.log(findFirstStringInBracketRefactored("("));
console.log(findFirstStringInBracket(")("));
console.log(findFirstStringInBracketRefactored(")("));