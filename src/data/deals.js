// Porulagam Deals, Offers & Coupons
export const dealCategories = [
  { id: 'all', label: 'All Deals', icon: 'local_fire_department' },
  { id: 'lightning', label: 'Lightning Deals', icon: 'flash_on' },
  { id: 'under499', label: 'Under ₹499' },
  { id: 'tech50', label: 'Electronics 50%+ Off' },
  { id: 'fashionclearance', label: 'Fashion Clearance' },
  { id: 'bogo', label: 'Buy 1 Get 1' }
];

export const coupons = [
  {
    code: 'PORULAGAM10',
    title: 'Flat 10% Off up to ₹1,500',
    description: 'Valid on all Electronics, Mobiles & Appliances',
    discountPercent: 10,
    maxDiscount: 1500,
    minCartValue: 2999
  },
  {
    code: 'WELCOME500',
    title: 'Flat ₹500 Welcome Discount',
    description: 'Applicable on your first marketplace order',
    flatDiscount: 500,
    minCartValue: 1999
  },
  {
    code: 'SUPER50',
    title: 'SuperCoin Saver - Flat ₹250 Off',
    description: 'Instant deduction using Porulagam Plus coins',
    flatDiscount: 250,
    minCartValue: 999
  }
];

export const bankOffers = [
  {
    bank: 'HDFC Bank',
    tag: 'Credit & Debit Cards',
    offer: '10% Instant Cashback up to ₹1,500',
    minTxn: 'Min order ₹4,999',
    badge: 'INSTANT'
  },
  {
    bank: 'ICICI Bank',
    tag: 'No Cost EMI',
    offer: 'Zero processing fee on 6 & 12 month EMIs',
    minTxn: 'Min order ₹7,000',
    badge: 'NO COST EMI'
  },
  {
    bank: 'SBI Card',
    tag: 'Credit Cards',
    offer: 'Flat ₹1,000 Instant Discount',
    minTxn: 'Min order ₹10,000',
    badge: 'BANK DROP'
  }
];
