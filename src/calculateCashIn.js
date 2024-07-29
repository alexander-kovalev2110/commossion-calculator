const fetchConfig = require('./fetchConfig');

const configUrlIn = 'https://developers.paysera.com/tasks/api/cash-in'

const calculateCashIn = async (amount) => {
    const config = await fetchConfig(configUrlIn)
    // {"percents":0.03,"max":{"amount":5,"currency":"EUR"}}

    const { percents, max } =  config;

    const fee = Math.min(((amount * percents) / 100), max.amount);

    return fee
}

module.exports = calculateCashIn;
