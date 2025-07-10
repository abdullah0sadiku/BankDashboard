# Demo Dashboard for Scraper Testing

A React-based finance dashboard that provides two distinct layouts for testing web scrapers. The dashboard includes two versions with different visual designs and DOM structures while maintaining data consistency.

## Project Structure

```
demo-dashboard/
├── public/
│   ├── assets/        # Images and icons
│   └── index.html     # Main HTML file
├── src/
│   ├── Homepage1.tsx  # Version 1 of the dashboard (Light theme)
│   ├── Homepage2.tsx  # Version 2 of the dashboard (Dark theme)
│   ├── Login.tsx      # Login component
│   ├── App.tsx        # Main app with routing
│   ├── index.tsx      # React entry point
│   └── index.css      # TailwindCSS imports
├── docker-compose.yml # Docker Compose configuration
├── Dockerfile         # Docker configuration
├── package.json       # Dependencies and scripts
├── tailwind.config.js # TailwindCSS configuration
└── postcss.config.js  # PostCSS configuration
```

## Features

### Homepage1 (/homepage1)
- Light theme with purple/blue color scheme
- Traditional layout structure
- **Sidebar**: Left navigation with menu icons
- **Credit Card Display**: Shows user's Mastercard details
- **Recent Transactions**: Detailed transaction list with modal view
- **Balance Panel**: Current balance, income, expenses tracking
- **Statistics Chart**: SVG-based line chart showing income/expense trends
- **Transaction Filters**: ALL / INCOME / EXPENSES buttons

### Homepage2 (/homepage2)
- Dark theme with teal/cyan color scheme
- CSS Grid-based layout (col-span-12)
- Contains identical data to Homepage1
- Alternative DOM structure for scraper testing
- Rich transaction detail modal
- Different visual presentation while maintaining data parity

## Key Data Points for Scraping

Both dashboard versions include consistent data points for scraper testing:

- Card details
- Current balance
- Income/expense totals
- Transaction history
- User profile information
- Quick actions

## Installation & Running

All dependencies are included in the package.json. To start the application:

```bash
# Start all services in detached mode
docker compose up --build -d
```

The application will be available at http://localhost:3000

## Routes

- `/` - Redirects to `/homepage1`
- `/homepage1` - Finance dashboard (Version 1 - Light Theme)
- `/homepage2` - Finance dashboard (Version 2 - Dark Theme)
- `/login` - Login page

## Technologies

- **React 18** with TypeScript
- **TailwindCSS** for styling
- **React Router** for navigation
- **Docker** for containerization
- **SVG** for charts and graphics

## Styling

### Homepage1
- Light theme
- Purple/blue color scheme
- Traditional dashboard layout
- Soft gradients and rounded corners
- Responsive design

### Homepage2
- Dark theme (bg-gray-900)
- Teal/cyan color scheme
- CSS Grid-based layout
- Modern card components
- Alternative visual hierarchy

This dashboard provides a controlled environment for testing web scrapers against different DOM structures and visual presentations while maintaining consistent data across versions. Each version offers unique challenges for scraping tools while preserving functional equivalence. 