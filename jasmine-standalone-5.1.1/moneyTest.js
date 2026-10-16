import { formatCurrency } from "../scripts/checkout/payementSummary.js";
describe('test suite : formatCurrency', () => {
    it('converts cents to dollars', ()=> {
        expect(formatCurrency(2095)).toEqual('20.95');
    });
    it ('zeroth value condition ', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });
})