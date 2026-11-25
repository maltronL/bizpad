'use client';
import DocMaker from './DocMaker';
import SalesBook from './SalesBook';
import Debtors from './Debtors';
import StockList from './StockList';
import FloatTracker from './FloatTracker';
import MarginCalc from './MarginCalc';

const MAP = { receipts: DocMaker, 'sales-book': SalesBook, debtors: Debtors, 'stock-list': StockList, 'airtime-float': FloatTracker, 'price-calculator': MarginCalc };
export default function ToolLoader({ slug }) {
  const T = MAP[slug];
  return T ? <T /> : null;
}
