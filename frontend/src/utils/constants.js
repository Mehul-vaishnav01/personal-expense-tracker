export function daysAgo(n, h = 12) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(h, 0, 0, 0);
  return d.toISOString();
}

export const DEMO_EXPENSES = [
  { _id: "d1", title: "Whole Foods Market",  amount: 54.2,  category: "Food",          date: daysAgo(0), uri: "https://picsum.photos/seed/bill1/500/650" },
  { _id: "d2", title: "Uber ride",           amount: 18.75, category: "Transport",     date: daysAgo(0), uri: null },
  { _id: "d3", title: "Movie tickets",       amount: 32.5,  category: "Entertainment", date: daysAgo(1), uri: "https://picsum.photos/seed/bill3/500/650" },
  { _id: "d4", title: "Electricity bill",    amount: 88.75, category: "Bills",         date: daysAgo(3), uri: null },
  { _id: "d5", title: "Pharmacy",            amount: 14.3,  category: "Health",        date: daysAgo(5), uri: null },
  { _id: "d6", title: "Zara — new jacket",   amount: 65,    category: "Shopping",      date: daysAgo(8), uri: "https://picsum.photos/seed/bill6/500/650" },
  { _id: "d7", title: "Coffee with Sam",     amount: 9.4,   category: "Food",          date: daysAgo(9), uri: null },
];