const CONVERTOR = {
    MIN_VALUE: 0,
    MAX_VALUE: 100 // current max value is 9999 with this implementation
};

const convertToRomanNumber = function (input) {
    const { error } = isInputConvertible(input);
    if (error) {
        return {
            success: false,
            message: error
        };
    }
    return {
        success: true,
        romanNumber: convertNumber(input)
    };
}

function isInputConvertible(input) {
    if (!isInteger(input)) {
        return { error: "Numbers must be integers" };
    }
    const numToConvert = parseFloat(input);
    if (isNaN(numToConvert)) {
        return { error: "This is not a number" };
    }
    if (numToConvert < CONVERTOR.MIN_VALUE || numToConvert > CONVERTOR.MAX_VALUE) {
        return { error: `This convertor handle only numbers between ${CONVERTOR.MIN_VALUE} and ${CONVERTOR.MAX_VALUE}` };
    }
    if (numToConvert === 0) {
        return { error: "There is no zero in roman digits" };
    }
    return true;
}

function isInteger(inputString) {
    return !RegExp('[,\.]', 'g').test(String(inputString));
}

function convertNumber(inputNumber) {
    const romanMapping = {
        "I": "V",
        "X": "L",
        "C": "D",
        "M": null
    };
    const romanKeys = Object.keys(romanMapping);

    // split the input string into an array of digits : "1234" => [1, 2, 3, 4]
    const numberDigits = inputNumber.split("").map(char => parseInt(char, 10)).reverse();
    const romanNumber = numberDigits.map((digit, index) => {
        const romanDigit = romanKeys[index];
        let convertedDigit = romanDigit.repeat(digit);
        // if romanDigit !== "M"
        if (romanMapping[romanDigit]) {
            // handle all cases where a roman digit appears 4, 5 or 9 times
            convertedDigit = convertedDigit.replace(romanDigit.repeat(9), romanDigit + romanKeys[index + 1]);
            convertedDigit = convertedDigit.replace(romanDigit.repeat(5), romanMapping[romanDigit]);
            convertedDigit = convertedDigit.replace(romanDigit.repeat(4), romanDigit + romanMapping[romanDigit]);
        }
        return convertedDigit;
    }).reverse().join("");
    return romanNumber;
}

module.exports = { convertToRomanNumber };
