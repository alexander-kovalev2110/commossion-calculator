const moment = require('moment');
require('moment-weekday-calc');
const fetchConfig = require('./fetchConfig');

const configUrlOutNatural = 'https://developers.paysera.com/tasks/api/cash-out-natural'

const getWeek = (date) => moment(date,'YYYY-MM-DD').isoWeek(); // Week number for date

const calculateCashOutNatural = async (amount, input, index) => {
    const config = await fetchConfig(configUrlOutNatural)
    // {"percents":0.3,"week_limit":{"amount":1000,"currency":"EUR"}}

    const { percents, week_limit } =  config;
    const { user_id, date } = input[index];

    // Filter transactions by 'cashout', 'natural', current user id and current week 
    // with addititig to the transaction its index and free of charge amount
    const workTransactions = input.map((item, index) => ({...item, index: index, free: 0}))
        .filter(item =>
            item.user_type === 'natural' && 
            item.type === 'cash_out' &&
            item.user_id === user_id &&
            getWeek(item.date) === getWeek(date)
    );

    let limit = week_limit.amount;

    // Calculation of the free of charge amount for each transaction of the current week
    workTransactions.forEach((item) => {
        item.free = limit;
        limit = Math.max(limit - item.operation.amount, 0);
    });

    const free = workTransactions.find(item => item.index === index).free  // Free of charge amount for current transaction
    const fee = (Math.max(amount - free, 0) * percents) / 100;
    
    return fee
}

module.exports = calculateCashOutNatural;
