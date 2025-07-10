# Demo Dashboard for Scraper Testing

A React-based finance dashboard that simulates a user interface for testing web scrapers. The dashboard matches the provided Mastercard-style UI design.

## Project Structure

```
demo-dashboard/
├── public/
│   ├── assets/        # Optional images/icons
│   └── index.html     # Main HTML file
├── src/
│   ├── Homepage1.tsx  # Version 1 of the dashboard
│   ├── App.tsx        # Main app with routing
│   ├── index.tsx      # React entry point
│   └── index.css      # TailwindCSS imports
├── Dockerfile         # Docker configuration
├── package.json       # Dependencies and scripts
├── tailwind.config.js # TailwindCSS configuration
└── postcss.config.js  # PostCSS configuration
```

## Features

### Homepage1 (/homepage1)
- **Sidebar**: Left navigation with menu icons
- **Credit Card Display**: Shows JOSEPH ALEX's Mastercard (2567 5647 8700 XXXX, valid 06/2020)
- **Recent Transactions**: 
  - Shopping: $410.00 (Oct 17)
  - Payment received: $260.00 (Oct 17)
- **Balance Panel**: 
  - Current balance: $2370.50
  - Income: $3650.50
  - Expenses: $1280.00
  - Last payment: $320.00 (17 Oct 2019)
- **Statistics Chart**: SVG-based line chart showing income/expense trends
- **Transaction Filters**: ALL / INCOME / EXPENSES buttons

## Key Data Points for Scraping

The dashboard includes specific IDs for easy scraper targeting:

- `#card-number`: Card number (2567 5647 8700 XXXX)
- `#current-balance`: Current balance ($2370.50)
- `#total-income`: Total income ($3650.50)
- `#total-expenses`: Total expenses ($1280.00)
- `#last-payment-amount`: Last payment amount ($320.00)
- `#last-payment-date`: Last payment date (17 Oct 2019)
- `#transaction-1-name`, `#transaction-1-amount`, `#transaction-1-date`: First transaction details
- `#transaction-2-name`, `#transaction-2-amount`, `#transaction-2-date`: Second transaction details

## Installation & Running

### Local Development
```bash
npm install
npm start
```

### Using Docker
```bash
docker build -t demo-dashboard .
docker run -p 3000:3000 demo-dashboard
```

## Routes

- `/` - Redirects to `/homepage1`
- `/homepage1` - Finance dashboard (Version 1)
- `/homepage2` - Coming soon (Version 2 with modified DOM structure)
- `/homepage3` - Coming soon (Version 3 with different class names)

## Technologies

- **React 18** with TypeScript
- **TailwindCSS** for styling
- **React Router** for navigation
- **Neumorphism** design elements
- **SVG** for charts and graphics

## Styling

- Soft gradients and rounded corners
- Neumorphism shadow effects
- Modern clean dashboard aesthetic
- Responsive grid layout
- Purple/gray color scheme matching the original design

## Next Steps

1. Create Homepage2.tsx with modified DOM structure (different class names, nesting)
2. Create Homepage3.tsx with additional structural changes
3. Test scraper compatibility across all three versions
4. Add interactive elements if needed for testing

This dashboard provides a controlled environment for testing web scrapers against different DOM structures while maintaining visual consistency. 