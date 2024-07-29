const fetchConfig = require('./fetchConfig');

const configUrlOutJuridical = 'https://developers.paysera.com/tasks/api/cash-out-juridical'

const calculateCashOutJuridical = async (amount) => {
    const config = await fetchConfig(configUrlOutJuridical)
    // {"percents":0.3,"min":{"amount":0.5,"currency":"EUR"}}
    
    const { percents, min } =  config;

    const fee = Math.max(((amount * percents) / 100), min.amount);

    return fee
}

module.exports = calculateCashOutJuridical;
