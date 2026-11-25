export const SITE_NAME = 'Bizpad';

export const TOOLS = [
  {
    slug: 'receipts', name: 'Receipts & invoices', title: 'Free Receipt, Invoice and Quotation Maker',
    desc: 'Make a receipt, invoice or quotation in seconds. Send it on WhatsApp or save it as a PDF. Free, no sign-up.',
    pitch: 'Give every customer a proper receipt, quote or invoice and send it on WhatsApp.',
    steps: ['Choose Receipt, Invoice or Quotation.', 'Type your business, the customer and what was sold.', 'Tap Send on WhatsApp, or Save as PDF to print.'],
    faqs: [
      ['Is the receipt maker really free?', 'Yes. You can make as many receipts, invoices and quotations as you like. The free version adds a small “Made free with Bizpad” line at the bottom.'],
      ['Can I send the receipt on WhatsApp?', 'Yes. Enter the customer’s number and tap Send on WhatsApp. It opens a ready-to-send message with the items and total.'],
      ['What is the difference between a receipt, an invoice and a quotation?', 'A receipt proves a customer has paid. An invoice asks for payment later. A quotation tells a customer what the job will cost before they agree.']
    ]
  },
  {
    slug: 'sales-book', name: 'Daily sales book', title: 'Free Daily Sales Book and Cash Book',
    desc: 'Write down every sale and expense and see your profit for the day and month. Free cash book that works on your phone.',
    pitch: 'Write each sale and expense once. See your real profit for the day and the month.',
    steps: ['Pick money in (sale) or money out (expense).', 'Type what it was for, the amount and how it was paid.', 'Read your profit for the day, split by cash and EcoCash.'],
    faqs: [
      ['How do I know if my shop made a profit today?', 'Add every sale as money in and every expense, including stock, as money out. The difference is your profit for the day.'],
      ['Where is my sales data stored?', 'On your own phone or computer, in your browser. Download the spreadsheet (CSV) regularly, or use the Pro backup.'],
      ['Can I split cash and EcoCash sales?', 'Yes. Each entry records how it was paid, and the day’s totals are split by method so you can match your cash and your phone.']
    ]
  },
  {
    slug: 'debtors', name: 'Debtors book', title: 'Debtors Book: Track Who Owes You Money',
    desc: 'Keep a list of customers who owe you, take part payments and send a polite WhatsApp reminder in one tap.',
    pitch: 'Know exactly who owes you, how much, and remind them politely on WhatsApp.',
    steps: ['Add the customer, their WhatsApp number and the amount.', 'Record part payments as they come in.', 'Tap Remind on WhatsApp for anyone who is late.'],
    faqs: [
      ['How do I ask customers to pay without being rude?', 'Use the built-in reminder. It is short, friendly and includes the amount, so you do not have to find the words each time.'],
      ['Can customers pay a little at a time?', 'Yes. Use Part payment and the balance updates. When it reaches zero the customer is marked as paid.'],
      ['Do I need the customer’s number?', 'Only to send a WhatsApp reminder. You can still track the debt without it.']
    ]
  },
  {
    slug: 'stock-list', name: 'Stock & price list', title: 'Free Stock List and Price List Maker',
    desc: 'Track what you have in stock, see your profit on each product, get low-stock warnings and share a price list on WhatsApp.',
    pitch: 'See what is running low, what each product earns you, and share your price list.',
    steps: ['Add each product with what you pay and what you sell for.', 'Tap Sold 1 or Received stock as things move.', 'Share the price list on WhatsApp when customers ask.'],
    faqs: [
      ['How do I know when to restock?', 'Set a warning level for each product. When the stock reaches it, the product turns red and shows “restock”.'],
      ['Does it show my profit per product?', 'Yes. Each product shows your profit in money and as a percentage of the selling price.'],
      ['Can I share my prices with customers?', 'Yes. One tap creates a clean price list message you can send to any WhatsApp contact or group.']
    ]
  },
  {
    slug: 'airtime-float', name: 'Airtime & mobile money float', title: 'Airtime and Mobile Money Float Tracker',
    desc: 'Check that your airtime, data or EcoCash float balances at the end of the day and see your commission. Spot shortages early.',
    pitch: 'Check that your float adds up every evening and see your commission.',
    steps: ['Enter your float at the start of the day and every top-up.', 'Enter the total you sold.', 'Enter what is left on your phone. Bizpad tells you if you are short or over.'],
    faqs: [
      ['How do I check my airtime float balance?', 'Start balance plus top-ups minus sales should equal what is left. If the real balance is lower, you are short.'],
      ['Does this work for EcoCash and other mobile money?', 'Yes. Any float that you top up and sell from works the same way.'],
      ['How is my commission worked out?', 'It is your total sales multiplied by your commission percentage. Change the percentage to match your agent rate.']
    ]
  },
  {
    slug: 'price-calculator', name: 'Selling price calculator', title: 'Markup and Selling Price Calculator for Small Shops',
    desc: 'Work out what to sell each item for when you buy in bulk. Set your markup, round the price and see your profit per item.',
    pitch: 'Bought a box or a pack? Find the right selling price per item in seconds.',
    steps: ['Enter what you paid for the pack and how many items it holds.', 'Choose the markup you want.', 'Read the price per item and your profit.'],
    faqs: [
      ['How do I price items I buy in bulk?', 'Divide the pack cost by the number of items to get the cost of one, then add your markup. The calculator does both steps.'],
      ['What is the difference between markup and margin?', 'Markup is profit divided by cost. Margin is profit divided by the selling price. A 30% markup is about a 23% margin.'],
      ['Can it round prices to easy numbers?', 'Yes. Choose to round up to 5 cents, 10 cents, 50 cents or a dollar so change is easy to give.']
    ]
  }
];

const B = (slug, name, h1, intro, pains, uses, faq) => ({ slug, name, h1, intro, pains, uses, faq });

export const BUSINESSES = [
  B('tuckshop', 'Tuckshop', 'Free tools for tuckshop owners', 'A tuckshop runs on small sales that add up fast, and small leaks that add up faster. Bizpad gives you a notebook that does the adding for you.',
    ['You are busy all day but cannot say what profit you made.', 'Regulars take on credit and forget how much.', 'Suppliers raise prices and your shelf prices stay the same.'],
    [['sales-book', 'Write each sale and each stock purchase. At closing time you see the profit and how much is cash and how much is EcoCash.'], ['debtors', 'Keep the “I will pay Friday” list in one place and send a reminder on WhatsApp.'], ['price-calculator', 'When the supplier’s price changes, re-price a box of drinks or biscuits in seconds.'], ['stock-list', 'See which fast sellers are about to run out before customers go elsewhere.']],
    [['How do I start a tuckshop record book?', 'Write down every sale as money in and everything you spend as money out. Do it daily. Bizpad adds it up and shows the profit.'], ['How much markup should a tuckshop add?', 'Many small shops use 20% to 40% depending on the product. Fast sellers can carry lower markup, slow sellers need higher.']]),
  B('airtime-seller', 'Airtime seller', 'Free tools for airtime and mobile money sellers', 'Your float is your business. If it is short at the end of the day, your profit is gone. Bizpad helps you catch it the same evening.',
    ['The float does not match your sales and you do not know why.', 'You are not sure what you really earn after commission.', 'Customers owe you small amounts that get forgotten.'],
    [['airtime-float', 'Compare what you should have against what is on your phone every evening.'], ['debtors', 'Track people you gave airtime to on credit and remind them politely.'], ['sales-book', 'Record other things you sell, such as sweets, chargers and cards, next to your airtime.']],
    [['How do airtime sellers track their float?', 'Write the opening float, every top-up and the total sold. Start plus top-ups minus sales is what should be left.'], ['How do I find out why my float is short?', 'Check for sales you forgot to write, top-ups sent to a wrong number and reversals. Balancing every day makes the cause easy to find.']]),
  B('street-vendor', 'Street vendor', 'Free tools for street vendors and market traders', 'You work from a stall or a bag, and your phone is your office. Bizpad is made to be fast, work with little data and keep your records on your phone.',
    ['No time to write while customers are waiting.', 'Hard to know which products really make you money.', 'Money gets mixed up with personal spending.'],
    [['sales-book', 'Add a sale in two taps and see your profit when you pack up.'], ['price-calculator', 'Bought a bag of tomatoes or a box of sweets? Find the price per item.'], ['stock-list', 'Keep a simple count of what you carry and what is left.']],
    [['Can I use Bizpad with little data?', 'Yes. After the page opens, your records are saved on your phone and the tools work with very little data.'], ['How do street vendors separate business and personal money?', 'Record only business sales and costs in Bizpad. Whatever is left as profit is what you may take for yourself.']]),
  B('hair-salon', 'Hair salon', 'Free tools for hair salons and braiders', 'Salons depend on bookings, repeat clients and tidy prices. Bizpad gives you quotes, receipts and a record of who still owes you.',
    ['Clients ask for the price and you quote from memory.', 'Deposits and balances get confused.', 'Product costs eat into your profit.'],
    [['receipts', 'Send a quotation before the style, then a receipt after, both on WhatsApp.'], ['debtors', 'Track balances from clients who paid a deposit only.'], ['sales-book', 'See how much each day earns after products and rent.']],
    [['How do I quote a client for braiding?', 'List the style, hair and time as items, send the quotation on WhatsApp, and turn it into a receipt once they pay.'], ['Should a salon take a deposit?', 'Many do, especially for long styles. Record it as a part payment so you can see the balance.']]),
  B('barbershop', 'Barbershop', 'Free tools for barbershops', 'A busy chair earns quickly, but a barbershop also has clippers, blades and rent to pay for. Bizpad shows what is left.',
    ['Cash and EcoCash tips are hard to match at night.', 'Several barbers share one book.', 'Supplies run out in the middle of a busy day.'],
    [['sales-book', 'Record each cut and see cash and EcoCash totals separately.'], ['stock-list', 'Track blades, powders and oils with low-stock warnings.'], ['receipts', 'Give a receipt for bigger jobs such as wedding groups.']],
    [['How do I track barbershop income?', 'Add every cut as money in and every cost as money out. At the end of the day the profit is calculated for you.'], ['How do I know what each chair earns?', 'Add the barber’s name in the description, such as “Cut – Tino”, and review the day’s list.']]),
  B('tailor', 'Tailor or dressmaker', 'Free tools for tailors and dressmakers', 'Custom work needs clear quotes and clear records of deposits. Bizpad covers quotes, receipts and balances.',
    ['Customers argue about the price after the garment is done.', 'Deposits are written on scraps of paper.', 'Cloth and thread costs are not counted.'],
    [['receipts', 'Send a quotation first so the price is agreed in writing.'], ['debtors', 'Record deposits and balances until the garment is collected.'], ['price-calculator', 'Work out the price of a job from cloth, zips and your time.']],
    [['How do I write a quote for tailoring?', 'List each garment with its price, add materials as separate items if needed, and send it on WhatsApp for the customer to confirm.'], ['How do I avoid unpaid collections?', 'Take a deposit, record the balance in the debtors book and only hand over when it is cleared.']]),
  B('freelancer', 'Freelancer', 'Free invoice maker for freelancers', 'You do great work and need to be paid for it. Send a clean invoice, then follow up without awkwardness.',
    ['Invoices made in Word look messy.', 'Late payers need reminders.', 'Income is hard to see across clients.'],
    [['receipts', 'Make a professional invoice, with your logo on Pro, and share it as a PDF.'], ['debtors', 'Keep a list of unpaid invoices and send reminders.'], ['sales-book', 'See your monthly income and costs in one place.']],
    [['What should a freelance invoice include?', 'Your name and contact details, the client, an invoice number, the date, what you did, the total and when you need to be paid.'], ['Can I use Bizpad for clients in other countries?', 'Yes. Pick from USD, EUR, GBP, ZAR and other currencies.']]),
  B('mechanic', 'Garage or mechanic', 'Free tools for mechanics and garages', 'A garage sells labour and parts. Customers want a clear quote and you want to be sure you are paid before the car leaves.',
    ['Parts and labour are mixed together.', 'Customers dispute the final bill.', 'Parts money is tied up in unpaid jobs.'],
    [['receipts', 'Quote parts and labour as separate lines, then issue an invoice or receipt.'], ['debtors', 'Track jobs still unpaid.'], ['stock-list', 'Keep a count of common parts such as oil, filters and bulbs.']],
    [['How do I write a quote for a car repair?', 'List each part and the labour as separate items with prices. Send the quotation and get a reply before you start.'], ['How do I stop customers disputing a bill?', 'A written quotation agreed on WhatsApp before the work is the best protection.']]),
  B('hardware-shop', 'Hardware shop', 'Free tools for hardware and building supply shops', 'Hardware has thousands of items, big tickets and customers who buy on account. Bizpad keeps the core under control.',
    ['Contractors buy on credit.', 'Prices change often with supplier costs.', 'Slow-moving items hide in the back.'],
    [['stock-list', 'Track fast movers and see stock value at cost.'], ['debtors', 'Keep a list of contractors and what they owe.'], ['receipts', 'Send quotations for big orders on WhatsApp.']],
    [['How do I price building materials?', 'Work out the cost per unit from your supplier price, then add a markup that covers transport and breakage.'], ['How do I handle contractor credit?', 'Record it in the debtors book with a date and send reminders on a fixed day each week.']]),
  B('restaurant', 'Takeaway or restaurant', 'Free tools for takeaways and small restaurants', 'Food business margins are thin. Knowing your daily numbers is the difference between a busy kitchen and a profitable one.',
    ['Ingredients cost more than you think.', 'Waste is not counted.', 'Catering jobs need written quotes.'],
    [['sales-book', 'Record sales and ingredient purchases to see real profit.'], ['price-calculator', 'Price a plate from the cost of ingredients.'], ['receipts', 'Send catering quotes and receipts on WhatsApp.']],
    [['How do I price a meal?', 'Add up the cost of everything on the plate, divide if you cook in batches, then add markup for labour, gas and profit.'], ['How do I record food waste?', 'Add it as money out with the description “Waste” so you can see how much it costs each month.']]),
  B('farmer', 'Farmer or poultry keeper', 'Free tools for farmers and poultry keepers', 'Farming has big costs up front and income at harvest or sale. Tracking both is how you learn what really pays.',
    ['Feed and medicine costs are not tracked per batch.', 'Buyers pay late.', 'Prices change by season.'],
    [['sales-book', 'Record feed, chicks, medicine and sales to see profit per batch.'], ['debtors', 'Track buyers who still owe you for eggs, chickens or produce.'], ['price-calculator', 'Work out the price per bird or per tray from your costs.']],
    [['How do I know if my broilers made a profit?', 'Add every cost for the batch, including chicks, feed and medicine, as money out and every sale as money in. The difference is your profit.'], ['How do I price eggs by the tray?', 'Enter the cost of the tray, set your markup and read the price per tray or per egg.']]),
  B('transport', 'Taxi, kombi or delivery', 'Free tools for taxi, kombi and delivery operators', 'Fuel, repairs and drivers’ payments all cut into daily takings. Bizpad shows what a vehicle really earns.',
    ['Drivers hand over less than expected.', 'Repairs surprise you.', 'You cannot tell which vehicle makes money.'],
    [['sales-book', 'Record daily takings, fuel and repairs for each vehicle.'], ['debtors', 'Track drivers or customers who owe you.'], ['receipts', 'Give receipts for deliveries and private hires.']],
    [['How do I track how much my kombi earns?', 'Add takings as money in, and fuel, repairs and driver pay as money out, with the vehicle name in the description.'], ['How do I handle driver targets?', 'Record what each driver hands over every day and compare it against the target.']]),
  B('event-planner', 'Event planner or caterer', 'Free quotation and invoice tools for event planners', 'Events are won with clear quotes and lost with unpaid balances. Bizpad keeps both simple.',
    ['Clients change their minds on price.', 'Deposits and final payments are confusing.', 'Suppliers must be paid before the event.'],
    [['receipts', 'Send a quotation, then an invoice for the deposit and a receipt for the balance.'], ['debtors', 'Keep track of balances due before the event date.'], ['sales-book', 'Record supplier payments to see the profit on each event.']],
    [['How do I quote for an event?', 'List venue, food, decor and your fee as separate lines so clients can see what they are paying for.'], ['Should I ask for a deposit?', 'Yes. Most planners take a deposit to secure the date and record the balance as owed.']]),
  B('home-services', 'Cleaner, builder or plumber', 'Free tools for cleaners, builders and plumbers', 'Home service work is paid per job. A clear quote at the start and a receipt at the end builds trust and repeat customers.',
    ['Customers ask for “a rough price” and then dispute it.', 'Materials are bought first and paid back late.', 'Work is done but not recorded.'],
    [['receipts', 'Send quotations and receipts that look professional.'], ['debtors', 'Remind customers who have not settled.'], ['price-calculator', 'Price materials with a markup that covers transport.']],
    [['How do I quote for a small building job?', 'Add materials and labour as separate lines, include transport, and state how long the quote is valid.'], ['How do I make customers pay on time?', 'Agree a deposit upfront, write the balance in the debtors book and remind them the day after the job.']])
];

export const toolBySlug = (s) => TOOLS.find((t) => t.slug === s);
export const bizBySlug = (s) => BUSINESSES.find((b) => b.slug === s);
