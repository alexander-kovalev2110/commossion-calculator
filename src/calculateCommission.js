const calculateCashIn = require('./calculateCashIn');
const calculateCashOutNatural = require('./calculateCashOutNatural');
const calculateCashOutJuridical = require('./calculateCashOutJuridical');

// Defining the commission type and calling a function that returns the result
const calculateCommission = (input, index) => {
    const { type, user_type, operation } = input[index];
    const { amount } = operation;

    switch (type) {
        case 'cash_in':
            return  calculateCashIn(amount);

        case 'cash_out': {
            switch (user_type) {
                case 'natural':
                    return  calculateCashOutNatural(amount, input, index);

                case 'juridical':
                    return  calculateCashOutJuridical(amount);

                default:
                    console.log('Wrong user_type'); 
                    return NaN;
            }
        }

        default:
            console.log('Wrong type'); 
            return NaN; 
    }
}

module.exports = calculateCommission;
