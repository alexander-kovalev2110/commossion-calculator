const calculateCommission = require('../src/calculateCommission');

// test('calculate commission', async () => {
const input = [
    { "date": "2016-01-05", "user_id": 1, "user_type": "natural", "type": "cash_in", "operation": { "amount": 200.00, "currency": "EUR" } },
    { "date": "2016-01-06", "user_id": 2, "user_type": "juridical", "type": "cash_out", "operation": { "amount": 300.00, "currency": "EUR" } },
    { "date": "2016-01-06", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 30000, "currency": "EUR" } }
];

test('calculate commission for cash_in', async () => {
    const result = (await calculateCommission(input, 0));
    expect(result).toBe(0.06);
});

test('calculate commission for cash_out/juridical', async () => {
    const result = (await calculateCommission(input, 1));
    expect(result).toBe(0.90);
});

test('calculate commission for cash_out/natural', async () => {
    const result = (await calculateCommission(input, 2));
    expect(result).toBe(87.00);
});
