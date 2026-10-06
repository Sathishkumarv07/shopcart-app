// Porulagam Orders Catalog & Tracking Stages
export const initialOrders = [
  {
    id: 'POR-892410',
    date: '24 Oct 2024',
    status: 'transit',
    statusText: 'In Transit - Out for Delivery Today',
    deliveryDate: 'Arriving Today by 8:00 PM',
    courier: 'Porulagam Express (Air Speed)',
    trackingNumber: 'PE-IND-90821948',
    item: {
      name: 'UltraTech Neo 15 Pro 5G (Celestial Blue, 256 GB)',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCC2PzbGKvccLfzdlcXqTbR0LlXY-buu4Q-GVyThXXtSgGIV2ePGZmycarqo15LKK-Qw4eaB74_KGLaq-ZrQNA4WmYyNYe84lJDIcrcvGS4hfpPsBS0B7DBz3So3wgGuZd142LyZ5lLuMwMiq1rm5XAnVrISq2uCK7dv8sjmv3mpESWOK9k1XSh33S-Ba1EmGSk0tWEepBQnvZFqF426SZsQlk37pEokCq5BKVnp6cZUsvJ5hDZEaCp',
      color: 'Celestial Blue',
      quantity: 1,
      price: 34999
    },
    address: 'Flat 402, Green Glen Heights, Bellandur, Bengaluru 560103',
    steps: [
      { title: 'Order Confirmed', time: '24 Oct, 09:15 AM', done: true },
      { title: 'Packed at Hub', time: '24 Oct, 01:40 PM', done: true },
      { title: 'Shipped via Express Air', time: '24 Oct, 07:10 PM', done: true },
      { title: 'Out for Delivery', time: 'Today, 08:30 AM', done: true, current: true },
      { title: 'Delivered', time: 'Expected by 08:00 PM', done: false }
    ]
  },
  {
    id: 'POR-773120',
    date: '18 Oct 2024',
    status: 'delivered',
    statusText: 'Delivered on 20 Oct 2024',
    deliveryDate: 'Delivered successfully',
    courier: 'BlueDart Air Express',
    trackingNumber: 'BD-771239841',
    item: {
      name: 'Sony WH-1000XM5 Wireless ANC Headphones',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGurSaUpB3w8oR13i3QqAVgUl0eXbFqvLBWTQVTXgfl27SUVdSW8F8_j_7JJ_-gURwDNoSEH_kcasGPjbB7eJj3wAHhoPQfHnhFmhrwIHljnQLwmDx3ef7-Wp-YuWjKGdE9GBMzs_o9H4xNQm3qPgIfUu9k07NguHJddWls-BPiiXIXhTzo1ta6HvzHRDIFa2zBWVDG6B8mjVjrBCeh1S_0wJAUWX8agumge8nUHAskWPcgXB7DJcy',
      color: 'Matte Black',
      quantity: 1,
      price: 24990
    },
    address: 'Flat 402, Green Glen Heights, Bellandur, Bengaluru 560103',
    steps: [
      { title: 'Order Confirmed', time: '18 Oct, 11:20 AM', done: true },
      { title: 'Packed at Hub', time: '18 Oct, 03:10 PM', done: true },
      { title: 'Shipped via BlueDart', time: '19 Oct, 08:00 AM', done: true },
      { title: 'Out for Delivery', time: '20 Oct, 09:30 AM', done: true },
      { title: 'Delivered', time: '20 Oct, 02:15 PM', done: true }
    ]
  },
  {
    id: 'POR-651092',
    date: '05 Oct 2024',
    status: 'delivered',
    statusText: 'Delivered on 07 Oct 2024',
    deliveryDate: 'Delivered successfully',
    courier: 'Porulagam Express',
    trackingNumber: 'PE-65109299',
    item: {
      name: 'Apple AirTag (4 Pack) - Precision Finding',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMzxb4m2hqgNgFMRWIumULDbsMfHZXKu-26eFcXOM4cFOO-lv0e0XpqRHGhNvSGFLD1KWQ6ZQ9221_urEEsM6Zzuts6B1qFQeOOfmV5RPNY5ft2LwPMCUPowg2_GUuexU0R88tibkksUxFPHLqReQMKVoO9BiP6pcvGp2s08DW3_aZCi6iQMQYWf3-IWWKKKbYNGhuoerqMeYvnnDJo97asElXvvnwPzB2zse2lOy2T0p8fmK9o5ME',
      color: 'White',
      quantity: 1,
      price: 9990
    },
    address: 'Flat 402, Green Glen Heights, Bellandur, Bengaluru 560103',
    steps: [
      { title: 'Order Confirmed', time: '05 Oct, 02:00 PM', done: true },
      { title: 'Delivered', time: '07 Oct, 04:30 PM', done: true }
    ]
  },
  {
    id: 'POR-519082',
    date: '14 Sep 2024',
    status: 'cancelled',
    statusText: 'Cancelled by Customer - Refund Completed',
    deliveryDate: 'Refund of ₹49,999 credited to UPI ID',
    courier: 'N/A',
    trackingNumber: 'REF-519082-UPI',
    item: {
      name: 'Samsung Galaxy Watch Ultra (Titanium Gray, 47mm)',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfqe0gK1UaM9SqMNYla-GuUL1nptplAzfFdqSqNggFv-T1K3WQ-q9-Ppkdg1UnYRGcgCkhUipomWy67SUv-rbzGZ1Gp0s8D9gJHiexnBPtOEV7FQOPkvQ5JQd8KZYeOJx8re5wZ-ki8SmmpSAILWB577airrCC02hGkkjcCMiq2hb4DXEMlD85hbgr0HArzngnxql_l0_nRVB2yDSxiLrdytvJADJFOQCfoYr8wLVrB2xKRB_8hg24',
      color: 'Titanium Gray',
      quantity: 1,
      price: 49999
    },
    address: 'Flat 402, Green Glen Heights, Bellandur, Bengaluru 560103',
    steps: [
      { title: 'Order Placed', time: '14 Sep, 10:00 AM', done: true },
      { title: 'Cancellation Requested', time: '14 Sep, 10:45 AM', done: true },
      { title: 'Refund Completed', time: '14 Sep, 11:15 AM', done: true }
    ]
  }
];
