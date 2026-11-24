// Porulagam Deals, Offers & Mega Sales
export const dealCategories = [
  { id: 'all', label: 'All Deals', tamilLabel: 'அனைத்து சலுகைகள்', icon: 'local_fire_department' },
  { id: 'offersale', label: 'Offer Sales (70%+)', tamilLabel: 'மெகா விற்பனை (70%+)', icon: 'sell' },
  { id: 'lightning', label: 'Lightning Deals', tamilLabel: 'மின்னல் சலுகை', icon: 'flash_on' },
  { id: 'under499', label: 'Under ₹499', tamilLabel: '₹499 க்குள்', icon: 'currency_rupee' },
  { id: 'tech50', label: 'Electronics 50%+ Off', tamilLabel: 'எலக்ட்ரானிக்ஸ் 50%+', icon: 'devices' },
  { id: 'fashionclearance', label: 'Fashion Clearance', tamilLabel: 'ஆடைகள் கிளியரன்ஸ்', icon: 'checkroom' },
  { id: 'bogo', label: 'Buy 1 Get 1', tamilLabel: 'ஒன்று வாங்கினால் ஒன்று இலவசம்', icon: 'redeem' }
];

export const offerSalesBanners = [
  {
    id: 'sale-1',
    title: 'Grand Festival Offer Sale',
    tamilTitle: 'மெகா விழாக்கால பெருந்தள்ளுபடி விற்பனை',
    subtitle: 'Flat 50% - 80% Off on Top Electronics, Fashion & Essentials',
    tamilSubtitle: 'எலக்ட்ரானிக்ஸ், ஆடைகள் & அத்தியாவசிய பொருட்களுக்கு 50% முதல் 80% வரை அதிரடி தள்ளுபடி!',
    badge: 'LIVE MEGA SALE',
    discount: 'UP TO 80% OFF',
    validTill: 'Limited Time Drops',
    accentColor: 'from-primary via-primary-container to-inverse-surface'
  },
  {
    id: 'sale-2',
    title: 'Weekend Super Steals',
    tamilTitle: 'வார இறுதி சூப்பர் ஆஃபர்கள்',
    subtitle: 'Extra 15% Instant Bank Discount + Free 1-Day Express Delivery',
    tamilSubtitle: 'கூடுதல் 15% உடனடி வங்கி சலுகை + இலவச விரைவு டெலிவரி',
    badge: 'EXCLUSIVE DEALS',
    discount: 'EXTRA 15% OFF',
    validTill: 'This Weekend Only',
    accentColor: 'from-tertiary-container via-tertiary to-inverse-surface'
  }
];

export const coupons = [
  {
    code: 'MEGAOFFER70',
    title: 'Offer Sale Special - Flat ₹700 Off',
    tamilTitle: 'மெகா ஆஃபர் விற்பனை - நேரடி ₹700 தள்ளுபடி',
    description: 'Valid on orders above ₹2,499 during Grand Sale',
    flatDiscount: 700,
    minCartValue: 2499
  },
  {
    code: 'PORULAGAM10',
    title: 'Flat 10% Off up to ₹1,500',
    tamilTitle: '10% உடனடி தள்ளுபடி (₹1,500 வரை)',
    description: 'Valid on all Electronics, Mobiles & Appliances',
    discountPercent: 10,
    maxDiscount: 1500,
    minCartValue: 2999
  },
  {
    code: 'WELCOME500',
    title: 'Flat ₹500 Welcome Discount',
    tamilTitle: 'வரவேற்பு சலுகை - நேரடி ₹500 தள்ளுபடி',
    description: 'Applicable on your first marketplace order',
    flatDiscount: 500,
    minCartValue: 1999
  },
  {
    code: 'FESTIVE20',
    title: 'Festive Flash 20% Instant Discount',
    tamilTitle: 'விழாக்கால சிறப்பு 20% நேரடி தள்ளுபடி',
    description: 'Up to ₹2,000 on Fashion & Audio categories',
    discountPercent: 20,
    maxDiscount: 2000,
    minCartValue: 3499
  },
  {
    code: 'SUPER50',
    title: 'SuperCoin Saver - Flat ₹250 Off',
    tamilTitle: 'சூப்பர்காயின் சேவர் - நேரடி ₹250 தள்ளுபடி',
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
  },
  {
    bank: 'Axis Bank',
    tag: 'Neo & Flipkart Cards',
    offer: 'Flat ₹750 Cashback on Festive Sale',
    minTxn: 'Min order ₹5,000',
    badge: 'OFFER SALE'
  }
];
