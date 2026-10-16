import { formatCurrency } from "../scripts/checkout/payementSummary.js";
if(formatCurrency(2095)==='20.95') console.log('passed')
    else console.log('failed')