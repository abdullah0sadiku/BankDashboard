import React, { useState, useEffect } from 'react';

interface User {
  name: string;
  type: string;
  balance: number;
  cards: number;
  accountNumber: string;
  email: string;
}

interface Homepage1Props {
  user: User;
  onLogout: () => void;
}

const Homepage1: React.FC<Homepage1Props> = ({ user, onLogout }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [showAddCard, setShowAddCard] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [showBillPay, setShowBillPay] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  // Comprehensive data based on user type
  const getUserData = () => {
    const baseCards = [
      {
        id: 1,
        type: 'Mastercard',
        name: user.name.toUpperCase(),
        number: user.type === 'admin' ? '4532 1234 5678 0000' : '2567 5647 8700 1234',
        expiry: '06/2025',
        cvv: '123',
        balance: user.balance,
        limit: user.type === 'admin' ? 50000 : user.type === 'premium' ? 25000 : 15000,
        color: 'from-purple-600 to-purple-800'
      },
      {
        id: 2,
        type: 'Visa',
        name: user.name.toUpperCase(),
        number: '4532 1234 5678 5678',
        expiry: '12/2024',
        cvv: '456',
        balance: user.type === 'admin' ? 8520.30 : 2340.50,
        limit: 10000,
        color: 'from-blue-600 to-blue-800'
      }
    ];

    if (user.type === 'premium' || user.type === 'admin') {
      baseCards.push(
        {
          id: 3,
          type: 'American Express',
          name: user.name.toUpperCase(),
          number: '3782 8224 6310 9876',
          expiry: '08/2026',
          cvv: '7890',
          balance: 1250.75,
          limit: 15000,
          color: 'from-green-600 to-green-800'
        },
        {
          id: 4,
          type: 'Discover',
          name: user.name.toUpperCase(),
          number: '6011 1111 1111 1117',
          expiry: '03/2025',
          cvv: '321',
          balance: 580.25,
          limit: 8000,
          color: 'from-orange-600 to-orange-800'
        }
      );
    }

    return baseCards.slice(0, user.cards);
  };

  const getTransactions = () => {
    const baseTransactions = [
      { 
        id: 1, 
        name: 'Amazon Purchase', 
        description: 'Electronics & Gadgets', 
        amount: -245.99, 
        date: 'Today', 
        category: 'Shopping', 
        merchant: 'Amazon.com', 
        status: 'Completed',
        // Detailed information only visible in modal
        transactionId: 'TXN-AMZ-20241109-001',
        authCode: 'AUTH456789',
        merchantDetails: {
          fullName: 'Amazon.com LLC',
          address: '410 Terry Ave N, Seattle, WA 98109',
          phone: '1-888-280-4331',
          website: 'amazon.com',
          mccCode: '5943 - Stationery Stores'
        },
        paymentMethod: 'Card ending in 1234',
        location: 'Seattle, WA, USA',
        processingTime: '2.3 seconds',
        interchangeFee: '$0.45',
        receiptNumber: 'AMZ-RCP-789456123',
        items: ['MacBook Air M2', 'Wireless Mouse', 'USB-C Cable'],
        tax: '$18.99',
        shipping: '$0.00',
        totalBeforeTax: '$227.00',
        securityLevel: 'High - 3D Secure Verified',
        fraudScore: '2/100 - Very Low Risk'
      },
      { 
        id: 2, 
        name: 'Salary Deposit', 
        description: 'Monthly salary payment', 
        amount: 5420.00, 
        date: 'Today', 
        category: 'Income', 
        merchant: 'TechCorp Inc', 
        status: 'Completed',
        transactionId: 'TXN-SAL-20241109-002',
        authCode: 'ACH789123',
        merchantDetails: {
          fullName: 'TechCorp Incorporated',
          address: '123 Silicon Valley Blvd, San Jose, CA 95110',
          phone: '1-555-TECH-001',
          website: 'techcorp.com',
          mccCode: '7372 - Computer Programming Services'
        },
        paymentMethod: 'Direct Deposit',
        location: 'San Jose, CA, USA',
        processingTime: '24 hours',
        routingNumber: '121000248',
        accountType: 'Business Checking',
        payrollRef: 'PAY-2024-NOV-001',
        grossPay: '$6500.00',
        deductions: '$1080.00',
        netPay: '$5420.00',
        taxWithheld: '$845.00',
        benefits: '$235.00'
      },
      { 
        id: 3, 
        name: 'Starbucks', 
        description: 'Coffee and pastries', 
        amount: -12.45, 
        date: 'Yesterday', 
        category: 'Food', 
        merchant: 'Starbucks #1234', 
        status: 'Completed',
        transactionId: 'TXN-SBX-20241108-003',
        authCode: 'AUTH321654',
        merchantDetails: {
          fullName: 'Starbucks Coffee Company',
          address: '456 Main Street, Downtown, NY 10001',
          phone: '1-800-STARBUX',
          website: 'starbucks.com',
          mccCode: '5814 - Fast Food Restaurants'
        },
        paymentMethod: 'Card ending in 1234',
        location: 'New York, NY, USA',
        processingTime: '1.1 seconds',
        interchangeFee: '$0.08',
        receiptNumber: 'SBX-RCP-456789',
        items: ['Grande Latte', 'Blueberry Muffin', 'Extra Shot'],
        loyaltyPoints: '+15 Stars',
        tip: '$2.00',
        subtotal: '$10.45',
        contactlessPayment: true,
        deviceId: 'POS-Terminal-789'
      },
      { 
        id: 4, 
        name: 'Gas Station', 
        description: 'Fuel purchase', 
        amount: -78.32, 
        date: 'Yesterday', 
        category: 'Transportation', 
        merchant: 'Shell Gas Station', 
        status: 'Completed',
        transactionId: 'TXN-SHL-20241108-004',
        authCode: 'AUTH987654',
        merchantDetails: {
          fullName: 'Shell Oil Company',
          address: '789 Highway Blvd, Austin, TX 78701',
          phone: '1-888-SHELL-01',
          website: 'shell.com',
          mccCode: '5541 - Service Stations'
        },
        paymentMethod: 'Card ending in 1234',
        location: 'Austin, TX, USA',
        processingTime: '3.7 seconds',
        fuelType: 'Premium Unleaded',
        gallons: '18.5 gallons',
        pricePerGallon: '$4.23',
        pumpNumber: 'Pump #7',
        odometerReading: '45,789 miles',
        vehicleId: 'License ending in XYZ',
        rewardsEarned: '78 points'
      },
      { 
        id: 5, 
        name: 'Netflix Subscription', 
        description: 'Monthly streaming service', 
        amount: -15.99, 
        date: '2 days ago', 
        category: 'Entertainment', 
        merchant: 'Netflix', 
        status: 'Completed',
        transactionId: 'TXN-NFX-20241107-005',
        authCode: 'REC123456',
        merchantDetails: {
          fullName: 'Netflix Inc.',
          address: '100 Winchester Circle, Los Gatos, CA 95032',
          phone: '1-866-579-7172',
          website: 'netflix.com',
          mccCode: '4899 - Cable and Other Pay TV Services'
        },
        paymentMethod: 'Card ending in 1234',
        location: 'Los Gatos, CA, USA',
        subscriptionPlan: 'Premium Plan',
        billingCycle: 'Monthly',
        nextBillingDate: '2024-12-07',
        accountsIncluded: '4 Users',
        autoRenewal: true,
        subscriptionId: 'SUB-NFX-789456123'
      },
      { 
        id: 6, 
        name: 'ATM Withdrawal', 
        description: 'Cash withdrawal', 
        amount: -200.00, 
        date: '3 days ago', 
        category: 'Cash', 
        merchant: 'Bank ATM #567', 
        status: 'Completed',
        transactionId: 'TXN-ATM-20241106-006',
        authCode: 'ATM789456',
        merchantDetails: {
          fullName: 'SecureBank ATM Network',
          address: '234 Financial District, Chicago, IL 60601',
          phone: '1-800-SECURE-1',
          website: 'securebank.com',
          mccCode: '6011 - Automated Cash Disburse'
        },
        atmId: 'ATM-567-CHI-001',
        location: 'Chicago, IL, USA',
        atmFee: '$3.50',
        foreignFee: '$0.00',
        remainingBalance: '$2,891.73',
        transactionFee: '$3.50',
        network: 'Plus/Cirrus',
        securityCamera: 'Recorded',
        dispensedBills: '10x $20 bills'
      },
      { 
        id: 7, 
        name: 'Freelance Payment', 
        description: 'Web design project', 
        amount: 1250.00, 
        date: '3 days ago', 
        category: 'Income', 
        merchant: 'Digital Agency', 
        status: 'Pending',
        transactionId: 'TXN-FRL-20241106-007',
        authCode: 'PENDING',
        merchantDetails: {
          fullName: 'Digital Creative Agency LLC',
          address: '567 Innovation Drive, Portland, OR 97201',
          phone: '1-503-DIGITAL',
          website: 'digitalcreative.com',
          mccCode: '7311 - Advertising Agencies'
        },
        paymentMethod: 'Wire Transfer',
        location: 'Portland, OR, USA',
        projectId: 'PROJ-WEB-2024-089',
        invoiceNumber: 'INV-2024-NOV-015',
        hoursWorked: '62.5 hours',
        hourlyRate: '$20.00',
        expectedClearance: '2-3 business days',
        wireReference: 'WIR-DCA-789456'
      },
      { 
        id: 8, 
        name: 'Uber Ride', 
        description: 'Transportation to airport', 
        amount: -45.20, 
        date: '4 days ago', 
        category: 'Transportation', 
        merchant: 'Uber Technologies', 
        status: 'Completed',
        transactionId: 'TXN-UBR-20241105-008',
        authCode: 'AUTH654321',
        merchantDetails: {
          fullName: 'Uber Technologies Inc.',
          address: '1455 Market Street, San Francisco, CA 94103',
          phone: '1-800-UBER-HELP',
          website: 'uber.com',
          mccCode: '4121 - Taxicabs and Limousines'
        },
        rideId: 'RIDE-UBR-456789123',
        driverName: 'Carlos M.',
        vehicleInfo: '2019 Toyota Camry - ABC123',
        pickup: '123 Home Street',
        destination: 'LAX Airport Terminal 3',
        distance: '23.4 miles',
        duration: '41 minutes',
        baseFare: '$8.50',
        tip: '$9.00',
        surge: '1.2x',
        rating: '5 stars'
      },
      { 
        id: 9, 
        name: 'Grocery Store', 
        description: 'Weekly grocery shopping', 
        amount: -156.78, 
        date: '5 days ago', 
        category: 'Food', 
        merchant: 'Walmart Supercenter', 
        status: 'Completed',
        transactionId: 'TXN-WMT-20241104-009',
        authCode: 'AUTH147258',
        merchantDetails: {
          fullName: 'Walmart Inc.',
          address: '890 Retail Plaza, Bentonville, AR 72712',
          phone: '1-800-WALMART',
          website: 'walmart.com',
          mccCode: '5411 - Grocery Stores and Supermarkets'
        },
        storeNumber: '2547',
        checkoutLane: 'Self-Checkout #12',
        cashierId: 'SELF-SERVICE',
        itemCount: '24 items',
        loyaltyCard: 'Walmart+ Member',
        savings: '$12.43',
        coupons: '3 digital coupons',
        bagFee: '$0.00',
        receiptCode: 'TC8492 0847 2956 8741'
      },
      { 
        id: 10, 
        name: 'Investment Return', 
        description: 'Dividend payment', 
        amount: 89.45, 
        date: '6 days ago', 
        category: 'Investment', 
        merchant: 'Fidelity Investments', 
        status: 'Completed',
        transactionId: 'TXN-FID-20241103-010',
        authCode: 'DIV789456',
        merchantDetails: {
          fullName: 'Fidelity Investments Inc.',
          address: '245 Summer Street, Boston, MA 02210',
          phone: '1-800-FIDELITY',
          website: 'fidelity.com',
          mccCode: '6211 - Security Brokers/Dealers'
        },
        accountNumber: '****-****-7890',
        stockSymbol: 'AAPL',
        sharesHeld: '150 shares',
        dividendPerShare: '$0.596',
        exDividendDate: '2024-11-01',
        paymentDate: '2024-11-03',
        taxWithheld: '$13.42',
        netDividend: '$89.45'
      }
    ];

    if (user.type === 'premium' || user.type === 'admin') {
      baseTransactions.push(
        { 
          id: 11, 
          name: 'Hotel Booking', 
          description: 'Business trip accommodation', 
          amount: -320.00, 
          date: '1 week ago', 
          category: 'Travel', 
          merchant: 'Marriott Hotels', 
          status: 'Completed',
          transactionId: 'TXN-MAR-20241102-011',
          authCode: 'AUTH456123',
          merchantDetails: {
            fullName: 'Marriott International Inc.',
            address: '10400 Fernwood Road, Bethesda, MD 20817',
            phone: '1-800-MARRIOTT',
            website: 'marriott.com',
            mccCode: '3504 - Hotels/Motels/Resorts'
          },
          paymentMethod: 'Card ending in 1234',
          location: 'Bethesda, MD, USA',
          confirmationNumber: 'MAR-RES-456789123',
          roomNumber: '1247',
          checkIn: '2024-11-01',
          checkOut: '2024-11-03',
          roomType: 'Executive Suite',
          guestCount: '2 Adults',
          roomRate: '$160.00/night',
          totalNights: '2 nights'
        },
        { 
          id: 12, 
          name: 'Consulting Fee', 
          description: 'Strategic consulting project', 
          amount: 3500.00, 
          date: '1 week ago', 
          category: 'Income', 
          merchant: 'Fortune 500 Corp', 
          status: 'Completed',
          transactionId: 'TXN-F500-20241102-012',
          authCode: 'WIRE789456',
          merchantDetails: {
            fullName: 'Fortune 500 Corporation',
            address: '1 Corporate Plaza, New York, NY 10007',
            phone: '1-212-FORTUNE',
            website: 'fortune500corp.com',
            mccCode: '7392 - Management Consulting Services'
          },
          paymentMethod: 'Wire Transfer',
          location: 'New York, NY, USA',
          projectCode: 'STRAT-2024-Q4',
          invoiceRef: 'INV-STRAT-789456',
          consultingHours: '175 hours',
          hourlyRate: '$20.00',
          totalFee: '$3500.00'
        },
        { 
          id: 13, 
          name: 'Restaurant', 
          description: 'Business dinner', 
          amount: -89.50, 
          date: '1 week ago', 
          category: 'Food', 
          merchant: 'The Capital Grille', 
          status: 'Completed',
          transactionId: 'TXN-TCG-20241102-013',
          authCode: 'AUTH789123',
          merchantDetails: {
            fullName: 'The Capital Grille',
            address: '601 Pennsylvania Ave NW, Washington, DC 20004',
            phone: '1-202-GRILLE',
            website: 'thecapitalgrille.com',
            mccCode: '5812 - Eating Places and Restaurants'
          },
          paymentMethod: 'Card ending in 1234',
          location: 'Washington, DC, USA',
          partySize: '4 people',
          tableNumber: 'Table 15',
          serverName: 'Michael S.',
          tip: '$16.50',
          subtotal: '$73.00',
          businessExpense: true
        },
        { 
          id: 14, 
          name: 'Office Supplies', 
          description: 'Home office equipment', 
          amount: -245.30, 
          date: '2 weeks ago', 
          category: 'Business', 
          merchant: 'Office Depot', 
          status: 'Completed',
          transactionId: 'TXN-OFC-20241026-014',
          authCode: 'AUTH321789',
          merchantDetails: {
            fullName: 'Office Depot Inc.',
            address: '6600 North Military Trail, Boca Raton, FL 33496',
            phone: '1-800-GO-DEPOT',
            website: 'officedepot.com',
            mccCode: '5943 - Stationery Stores'
          },
          paymentMethod: 'Card ending in 1234',
          location: 'Boca Raton, FL, USA',
          items: ['Standing Desk', 'Office Chair', 'Monitor Stand'],
          orderNumber: 'OD-456789123',
          deliveryDate: '2024-10-28',
          warranty: '2 years'
        },
        { 
          id: 15, 
          name: 'Stock Sale', 
          description: 'Technology stock profit', 
          amount: 2100.00, 
          date: '2 weeks ago', 
          category: 'Investment', 
          merchant: 'E*TRADE', 
          status: 'Completed',
          transactionId: 'TXN-ETR-20241026-015',
          authCode: 'SALE456789',
          merchantDetails: {
            fullName: 'E*TRADE Financial Corporation',
            address: '671 N Glebe Rd, Arlington, VA 22203',
            phone: '1-800-ETRADE-1',
            website: 'etrade.com',
            mccCode: '6211 - Security Brokers/Dealers'
          },
          paymentMethod: 'Brokerage Settlement',
          location: 'Arlington, VA, USA',
          stockSymbol: 'TSLA',
          sharesSold: '50 shares',
          sellPrice: '$42.00/share',
          costBasis: '$2000.00',
          capitalGain: '$100.00',
          tradeDate: '2024-10-24'
        }
      );
    }

    if (user.type === 'admin') {
      baseTransactions.push(
        { 
          id: 16, 
          name: 'Real Estate Income', 
          description: 'Rental property payment', 
          amount: 2800.00, 
          date: '2 weeks ago', 
          category: 'Income', 
          merchant: 'Property Management Co', 
          status: 'Completed',
          transactionId: 'TXN-PMC-20241026-016',
          authCode: 'RENT789456',
          merchantDetails: {
            fullName: 'Premium Property Management LLC',
            address: '789 Real Estate Blvd, Miami, FL 33101',
            phone: '1-305-PROPERTY',
            website: 'premiumproperty.com',
            mccCode: '6513 - Real Estate Agents and Managers'
          },
          paymentMethod: 'ACH Transfer',
          location: 'Miami, FL, USA',
          propertyAddress: '456 Ocean Drive, Miami Beach, FL',
          tenant: 'Corporate Lease - Tech Startup',
          leaseRef: 'LEASE-2024-OD-456',
          monthlyRent: '$2800.00',
          managementFee: '$140.00'
        },
        { 
          id: 17, 
          name: 'Luxury Purchase', 
          description: 'High-end electronics', 
          amount: -1299.99, 
          date: '3 weeks ago', 
          category: 'Shopping', 
          merchant: 'Apple Store', 
          status: 'Completed',
          transactionId: 'TXN-APL-20241019-017',
          authCode: 'AUTH654987',
          merchantDetails: {
            fullName: 'Apple Inc.',
            address: '1 Apple Park Way, Cupertino, CA 95014',
            phone: '1-800-APL-CARE',
            website: 'apple.com',
            mccCode: '5732 - Electronics Stores'
          },
          paymentMethod: 'Card ending in 1234',
          location: 'Cupertino, CA, USA',
          items: ['iPhone 15 Pro Max 1TB', 'MagSafe Charger'],
          serialNumber: 'F2LM8Q3XYZ123',
          warranty: 'AppleCare+ 2 years',
          tradeInCredit: '$800.00',
          finalPrice: '$1299.99'
        },
        { 
          id: 18, 
          name: 'Investment Portfolio', 
          description: 'Monthly investment', 
          amount: -5000.00, 
          date: '3 weeks ago', 
          category: 'Investment', 
          merchant: 'Charles Schwab', 
          status: 'Completed',
          transactionId: 'TXN-CS-20241019-018',
          authCode: 'INV123456',
          merchantDetails: {
            fullName: 'Charles Schwab Corporation',
            address: '211 Main Street, San Francisco, CA 94105',
            phone: '1-800-SCHWAB-1',
            website: 'schwab.com',
            mccCode: '6211 - Security Brokers/Dealers'
          },
          paymentMethod: 'Bank Transfer',
          location: 'San Francisco, CA, USA',
          portfolioType: 'Diversified Growth',
          allocationSplit: '70% Stocks, 30% Bonds',
          expectedReturn: '8-12% annually',
          managementFee: '0.25%',
          automaticInvestment: true
        }
      );
    }

    return baseTransactions;
  };

  const [cards] = useState(getUserData());
  const [transactions] = useState(getTransactions());
  const [notifications] = useState([
    { id: 1, title: 'Payment Due', message: 'Credit card payment due in 3 days', type: 'warning', time: '2 hours ago' },
    { id: 2, title: 'Transaction Alert', message: 'Large purchase detected: $245.99', type: 'info', time: '4 hours ago' },
    { id: 3, title: 'Security Update', message: 'Your account security has been enhanced', type: 'success', time: '1 day ago' },
    { id: 4, title: 'New Feature', message: 'Mobile check deposit now available', type: 'info', time: '2 days ago' }
  ]);

  const filteredTransactions = transactions.filter(t => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'INCOME') return t.amount > 0;
    if (activeFilter === 'EXPENSES') return t.amount < 0;
    return true;
  });

  const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));

  const handleTransactionClick = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowTransactionModal(true);
  };

  const simulateLoading = async (callback: () => void) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    callback();
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Enhanced Sidebar */}
      <div className="w-64 bg-white shadow-neumorphism flex flex-col py-6">
        {/* Logo */}
        <div className="px-6 mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SB</span>
            </div>
            <div>
              <h2 className="font-bold text-gray-800">SecureBank</h2>
              <p className="text-xs text-gray-500">Digital Banking</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4">
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-3 px-4 py-3 bg-purple-50 text-purple-600 rounded-lg font-medium">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
              <span>Dashboard</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
              </svg>
              <span>My Cards</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
              </svg>
              <span>Transactions</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
              <span>Analytics</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
              <span>Investments</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
              <span>Transfers</span>
            </button>

            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 01-1 1H5a1 1 0 01-1-1zm6 0v-1a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 01-1 1h-2a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
              <span>Bill Pay</span>
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="space-y-2">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors relative"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                </svg>
                <span>Notifications</span>
                {notifications.length > 0 && (
                  <div className="absolute right-4 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {notifications.length}
                  </div>
                )}
              </button>
              
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                </svg>
                <span>Settings</span>
              </button>
              
              <button 
                onClick={onLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"/>
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Welcome, {user.name}</h1>
              <p className="text-gray-500">{user.type.charAt(0).toUpperCase() + user.type.slice(1)} Account</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>Last 3 Months</option>
            </select>
            <span className="text-sm text-gray-500">16:55, 31 October 2019</span>
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-8 h-8 bg-gray-300 rounded-full relative"
              >
                {notifications.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {notifications.length}
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Cards and Transactions Section */}
          <div className="xl:col-span-2 space-y-6">
            {/* Credit Cards */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">My Cards</h2>
                <button 
                  onClick={() => setShowAddCard(true)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  + Add Card
                </button>
              </div>
              
              <div className="flex space-x-4 overflow-x-auto pb-4">
                {cards.map((card, index) => (
                  <div key={card.id} className="flex-shrink-0">
                    <div 
                      className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white shadow-neumorphism w-80 cursor-pointer transform transition-all hover:scale-105`}
                      onClick={() => setExpandedCard(expandedCard === card.id ? null : card.id)}
                    >
                      <div className="flex justify-between items-start mb-8">
                        <div className="flex space-x-2">
                          <div className="w-8 h-5 bg-red-500 rounded-sm"></div>
                          <div className="w-8 h-5 bg-yellow-400 rounded-sm"></div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs opacity-75">CARD HOLDER</div>
                          <div className="font-semibold">{card.name}</div>
                        </div>
                      </div>
                      <div className="text-2xl font-mono tracking-wider mb-4" id={`card-number-${card.id}`}>
                        {card.number}
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-xs opacity-75">VALID THRU</div>
                          <div className="font-semibold">{card.expiry}</div>
                        </div>
                        <div className="text-right opacity-75 text-sm">
                          {card.type.toUpperCase()}
                        </div>
                      </div>
                      
                      {expandedCard === card.id && (
                        <div className="mt-4 pt-4 border-t border-white border-opacity-20">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="opacity-75">Balance</div>
                              <div className="font-semibold">${card.balance.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="opacity-75">Limit</div>
                              <div className="font-semibold">${card.limit.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="opacity-75">Available</div>
                              <div className="font-semibold">${(card.limit - card.balance).toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="opacity-75">CVV</div>
                              <div className="font-semibold">***</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-2xl p-6 shadow-neumorphism">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Recent Transactions</h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setShowTransferModal(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Transfer
                  </button>
                  <button 
                    onClick={() => setShowBillPay(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Pay Bills
                  </button>
                  <button className="text-purple-600 text-sm font-medium hover:text-purple-800">
                    View All
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-6 mb-6">
                {['ALL', 'INCOME', 'EXPENSES'].map(filter => (
                  <button 
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeFilter === filter 
                        ? 'bg-purple-100 text-purple-600' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredTransactions.map((transaction) => (
                  <div 
                    key={transaction.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    onClick={() => handleTransactionClick(transaction)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 ${transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'} rounded-lg flex items-center justify-center`}>
                        <div className={`w-6 h-6 ${transaction.amount > 0 ? 'bg-green-600' : 'bg-red-600'} rounded`}></div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800" id={`transaction-${transaction.id}-name`}>
                          {transaction.name}
                        </div>
                        <div className="text-sm text-gray-500">{transaction.description}</div>
                        <div className="text-xs text-gray-400">{transaction.merchant}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`} id={`transaction-${transaction.id}-amount`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500" id={`transaction-${transaction.id}-date`}>
                        {transaction.date}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${transaction.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                        {transaction.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Balance Overview */}
            <div className="bg-white rounded-2xl p-6 shadow-neumorphism">
              <div className="text-right mb-4">
                <div className="text-sm text-gray-500 mb-1">Total Balance</div>
                <div className="text-sm text-gray-500">{user.accountNumber}</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-800 mb-2" id="current-balance">
                  ${user.balance.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">Across {user.cards} cards</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Income</div>
                  <div className="text-lg font-semibold text-green-600" id="total-income">
                    ${totalIncome.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Expenses</div>
                  <div className="text-lg font-semibold text-red-500" id="total-expenses">
                    ${totalExpenses.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Monthly Budget</span>
                  <span>73% used</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" style={{width: '73%'}}></div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-neumorphism">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowTransferModal(true)}
                  className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>Transfer Money</span>
                  <span className="text-purple-600">→</span>
                </button>
                <button 
                  onClick={() => setShowBillPay(true)}
                  className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>Pay Bills</span>
                  <span className="text-purple-600">→</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between">
                  <span>Investment Portfolio</span>
                  <span className="text-purple-600">→</span>
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between">
                  <span>Request Statement</span>
                  <span className="text-purple-600">→</span>
                </button>
              </div>
            </div>

            {/* Statistics Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-neumorphism">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Spending Analytics</h4>
              <div className="h-32 relative">
                <svg width="100%" height="100%" viewBox="0 0 300 120">
                  <line x1="0" y1="20" x2="300" y2="20" stroke="#f3f4f6" strokeWidth="1"/>
                  <line x1="0" y1="40" x2="300" y2="40" stroke="#f3f4f6" strokeWidth="1"/>
                  <line x1="0" y1="60" x2="300" y2="60" stroke="#f3f4f6" strokeWidth="1"/>
                  <line x1="0" y1="80" x2="300" y2="80" stroke="#f3f4f6" strokeWidth="1"/>
                  <line x1="0" y1="100" x2="300" y2="100" stroke="#f3f4f6" strokeWidth="1"/>
                  
                  <polyline fill="none" stroke="#10b981" strokeWidth="3" points="20,80 60,60 100,70 140,50 180,45 220,40 260,35"/>
                  <polyline fill="none" stroke="#ef4444" strokeWidth="3" points="20,90 60,85 100,95 140,90 180,85 220,80 260,75"/>
                  
                  <circle cx="260" cy="35" r="4" fill="#10b981" />
                  <circle cx="260" cy="75" r="4" fill="#ef4444" />
                </svg>
                
                <div className="absolute top-0 right-0 text-right">
                  <div className="text-lg font-bold text-gray-800">$2,140.50</div>
                  <div className="text-sm text-green-600">+12.5%</div>
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Oct 11</span>
                <span>Oct 15</span>
                <span>Oct 19</span>
                <span>Oct 20</span>
                <span>Oct 21</span>
              </div>
            </div>

            {/* Upcoming Bills */}
            <div className="bg-white rounded-2xl p-6 shadow-neumorphism">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Bills</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div>
                    <div className="font-medium text-red-800">Credit Card</div>
                    <div className="text-sm text-red-600">Due in 2 days</div>
                  </div>
                  <div className="text-red-800 font-semibold">$1,245.50</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <div className="font-medium text-yellow-800">Internet</div>
                    <div className="text-sm text-yellow-600">Due in 5 days</div>
                  </div>
                  <div className="text-yellow-800 font-semibold">$89.99</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-medium text-blue-800">Insurance</div>
                    <div className="text-sm text-blue-600">Due in 12 days</div>
                  </div>
                  <div className="text-blue-800 font-semibold">$340.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl z-40 transform transition-transform">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <button 
                onClick={() => setShowNotifications(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="p-4 space-y-4 overflow-y-auto h-full">
            {notifications.map(notification => (
              <div key={notification.id} className={`p-4 rounded-lg border-l-4 ${
                notification.type === 'warning' ? 'border-yellow-400 bg-yellow-50' :
                notification.type === 'success' ? 'border-green-400 bg-green-50' :
                'border-blue-400 bg-blue-50'
              }`}>
                <div className="font-medium text-gray-800">{notification.title}</div>
                <div className="text-sm text-gray-600 mt-1">{notification.message}</div>
                <div className="text-xs text-gray-400 mt-2">{notification.time}</div>
              </div>
            ))}
          </div>
        </div>
      )}

             {/* Enhanced Transaction Details Modal */}
       {showTransactionModal && selectedTransaction && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
           <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-2xl font-bold text-gray-800">Transaction Details</h3>
               <button 
                 onClick={() => setShowTransactionModal(false)}
                 className="text-gray-400 hover:text-gray-600 text-xl"
               >
                 ✕
               </button>
             </div>
             
             {/* Main Transaction Info */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
               <div className="bg-gray-50 rounded-xl p-6">
                 <h4 className="text-lg font-semibold text-gray-800 mb-4">Transaction Summary</h4>
                 <div className="space-y-3">
                   <div className="flex justify-between">
                     <span className="text-gray-600">Amount:</span>
                     <span className={`font-bold text-xl ${selectedTransaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                       {selectedTransaction.amount > 0 ? '+' : ''}${Math.abs(selectedTransaction.amount).toFixed(2)}
                     </span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-600">Transaction ID:</span>
                     <span className="font-mono text-sm bg-white px-2 py-1 rounded border" id={`txn-id-${selectedTransaction.id}`}>
                       {selectedTransaction.transactionId || 'N/A'}
                     </span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-600">Authorization Code:</span>
                     <span className="font-mono text-sm bg-white px-2 py-1 rounded border" id={`auth-code-${selectedTransaction.id}`}>
                       {selectedTransaction.authCode || 'N/A'}
                     </span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-600">Date & Time:</span>
                     <span className="font-semibold">{selectedTransaction.date}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-600">Status:</span>
                     <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                       selectedTransaction.status === 'Completed' 
                         ? 'bg-green-100 text-green-800' 
                         : 'bg-yellow-100 text-yellow-800'
                     }`}>
                       {selectedTransaction.status}
                     </span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-gray-600">Payment Method:</span>
                     <span className="font-semibold">{selectedTransaction.paymentMethod || 'N/A'}</span>
                   </div>
                 </div>
               </div>

               <div className="bg-blue-50 rounded-xl p-6">
                 <h4 className="text-lg font-semibold text-gray-800 mb-4">Merchant Information</h4>
                 <div className="space-y-3">
                   <div>
                     <span className="text-gray-600 block">Business Name:</span>
                     <span className="font-semibold text-lg">{selectedTransaction.merchantDetails?.fullName || selectedTransaction.merchant}</span>
                   </div>
                   <div>
                     <span className="text-gray-600 block">Address:</span>
                     <span className="text-sm">{selectedTransaction.merchantDetails?.address || 'N/A'}</span>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <span className="text-gray-600 block">Phone:</span>
                       <span className="text-sm font-mono">{selectedTransaction.merchantDetails?.phone || 'N/A'}</span>
                     </div>
                     <div>
                       <span className="text-gray-600 block">Website:</span>
                       <span className="text-sm text-blue-600">{selectedTransaction.merchantDetails?.website || 'N/A'}</span>
                     </div>
                   </div>
                   <div>
                     <span className="text-gray-600 block">MCC Code:</span>
                     <span className="text-sm font-mono bg-white px-2 py-1 rounded border">
                       {selectedTransaction.merchantDetails?.mccCode || 'N/A'}
                     </span>
                   </div>
                   <div>
                     <span className="text-gray-600 block">Location:</span>
                     <span className="font-semibold">{selectedTransaction.location || 'N/A'}</span>
                   </div>
                 </div>
               </div>
             </div>

             {/* Transaction-Specific Details */}
             {selectedTransaction.items && (
               <div className="bg-green-50 rounded-xl p-6 mb-6">
                 <h4 className="text-lg font-semibold text-gray-800 mb-4">Purchase Details</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <span className="text-gray-600 block mb-2">Items Purchased:</span>
                     <ul className="space-y-1">
                       {selectedTransaction.items.map((item: string, index: number) => (
                         <li key={index} className="text-sm bg-white px-3 py-2 rounded border">
                           • {item}
                         </li>
                       ))}
                     </ul>
                   </div>
                   <div className="space-y-3">
                     {selectedTransaction.receiptNumber && (
                       <div className="flex justify-between">
                         <span className="text-gray-600">Receipt #:</span>
                         <span className="font-mono text-sm">{selectedTransaction.receiptNumber}</span>
                       </div>
                     )}
                     {selectedTransaction.tax && (
                       <div className="flex justify-between">
                         <span className="text-gray-600">Tax:</span>
                         <span className="font-semibold">{selectedTransaction.tax}</span>
                       </div>
                     )}
                     {selectedTransaction.shipping && (
                       <div className="flex justify-between">
                         <span className="text-gray-600">Shipping:</span>
                         <span className="font-semibold">{selectedTransaction.shipping}</span>
                       </div>
                     )}
                     {selectedTransaction.tip && (
                       <div className="flex justify-between">
                         <span className="text-gray-600">Tip:</span>
                         <span className="font-semibold">{selectedTransaction.tip}</span>
                       </div>
                     )}
                   </div>
                 </div>
               </div>
             )}

             {/* Ride/Service Details for Uber */}
             {selectedTransaction.rideId && (
               <div className="bg-purple-50 rounded-xl p-6 mb-6">
                 <h4 className="text-lg font-semibold text-gray-800 mb-4">Ride Details</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-3">
                     <div className="flex justify-between">
                       <span className="text-gray-600">Ride ID:</span>
                       <span className="font-mono text-sm">{selectedTransaction.rideId}</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-gray-600">Driver:</span>
                       <span className="font-semibold">{selectedTransaction.driverName}</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-gray-600">Vehicle:</span>
                       <span className="text-sm">{selectedTransaction.vehicleInfo}</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-gray-600">Rating:</span>
                       <span className="font-semibold text-yellow-600">{selectedTransaction.rating}</span>
                     </div>
                   </div>
                   <div className="space-y-3">
                     <div>
                       <span className="text-gray-600 block">Pickup:</span>
                       <span className="text-sm">{selectedTransaction.pickup}</span>
                     </div>
                     <div>
                       <span className="text-gray-600 block">Destination:</span>
                       <span className="text-sm">{selectedTransaction.destination}</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-gray-600">Distance:</span>
                       <span className="font-semibold">{selectedTransaction.distance}</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-gray-600">Duration:</span>
                       <span className="font-semibold">{selectedTransaction.duration}</span>
                     </div>
                   </div>
                 </div>
               </div>
             )}

             {/* Investment Details */}
             {selectedTransaction.stockSymbol && (
               <div className="bg-yellow-50 rounded-xl p-6 mb-6">
                 <h4 className="text-lg font-semibold text-gray-800 mb-4">Investment Details</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-3">
                     <div className="flex justify-between">
                       <span className="text-gray-600">Stock Symbol:</span>
                       <span className="font-bold text-lg">{selectedTransaction.stockSymbol}</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-gray-600">Shares:</span>
                       <span className="font-semibold">{selectedTransaction.sharesHeld || selectedTransaction.sharesSold}</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-gray-600">Price per Share:</span>
                       <span className="font-semibold">{selectedTransaction.dividendPerShare || selectedTransaction.sellPrice}</span>
                     </div>
                   </div>
                   <div className="space-y-3">
                     {selectedTransaction.exDividendDate && (
                       <div className="flex justify-between">
                         <span className="text-gray-600">Ex-Dividend Date:</span>
                         <span className="font-semibold">{selectedTransaction.exDividendDate}</span>
                       </div>
                     )}
                     {selectedTransaction.taxWithheld && (
                       <div className="flex justify-between">
                         <span className="text-gray-600">Tax Withheld:</span>
                         <span className="font-semibold text-red-600">{selectedTransaction.taxWithheld}</span>
                       </div>
                     )}
                     {selectedTransaction.capitalGain && (
                       <div className="flex justify-between">
                         <span className="text-gray-600">Capital Gain:</span>
                         <span className="font-semibold text-green-600">{selectedTransaction.capitalGain}</span>
                       </div>
                     )}
                   </div>
                 </div>
               </div>
             )}

             {/* Security & Processing Info */}
             <div className="bg-red-50 rounded-xl p-6 mb-6">
               <h4 className="text-lg font-semibold text-gray-800 mb-4">Security & Processing</h4>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div>
                   <span className="text-gray-600 block">Processing Time:</span>
                   <span className="font-semibold">{selectedTransaction.processingTime || 'Instant'}</span>
                 </div>
                 <div>
                   <span className="text-gray-600 block">Security Level:</span>
                   <span className="font-semibold text-green-600">{selectedTransaction.securityLevel || 'Standard'}</span>
                 </div>
                 <div>
                   <span className="text-gray-600 block">Fraud Score:</span>
                   <span className="font-semibold text-green-600">{selectedTransaction.fraudScore || 'Low Risk'}</span>
                 </div>
                 {selectedTransaction.interchangeFee && (
                   <div>
                     <span className="text-gray-600 block">Interchange Fee:</span>
                     <span className="font-semibold">{selectedTransaction.interchangeFee}</span>
                   </div>
                 )}
                 {selectedTransaction.network && (
                   <div>
                     <span className="text-gray-600 block">Network:</span>
                     <span className="font-semibold">{selectedTransaction.network}</span>
                   </div>
                 )}
                 {selectedTransaction.contactlessPayment && (
                   <div>
                     <span className="text-gray-600 block">Payment Type:</span>
                     <span className="font-semibold text-blue-600">Contactless</span>
                   </div>
                 )}
               </div>
             </div>

             {/* Action Buttons */}
             <div className="flex flex-wrap gap-3">
               <button 
                 onClick={() => alert('Receipt downloaded! (Demo)')}
                 className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
               >
                 Download Receipt
               </button>
               <button 
                 onClick={() => alert('Transaction exported! (Demo)')}
                 className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
               >
                 Export Details
               </button>
               <button 
                 onClick={() => alert('Dispute initiated! (Demo)')}
                 className="px-6 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
               >
                 Dispute Transaction
               </button>
               <button 
                 onClick={() => alert('Support contacted! (Demo)')}
                 className="px-6 py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
               >
                 Contact Support
               </button>
               <button 
                 onClick={() => setShowTransactionModal(false)}
                 className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors ml-auto"
               >
                 Close
               </button>
             </div>
           </div>
         </div>
       )}

      {/* Add Card Modal */}
      {showAddCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Add New Card</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Card Number" className="w-full px-4 py-3 border rounded-lg" />
              <input type="text" placeholder="Cardholder Name" className="w-full px-4 py-3 border rounded-lg" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM/YY" className="px-4 py-3 border rounded-lg" />
                <input type="text" placeholder="CVV" className="px-4 py-3 border rounded-lg" />
              </div>
              <div className="flex space-x-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowAddCard(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    alert('Card added successfully! (Demo)');
                    setShowAddCard(false);
                  }}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Add Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Transfer Money</h3>
            <form className="space-y-4">
              <select className="w-full px-4 py-3 border rounded-lg">
                <option>From: Checking Account</option>
                <option>From: Savings Account</option>
                <option>From: Credit Card</option>
              </select>
              <select className="w-full px-4 py-3 border rounded-lg">
                <option>To: Savings Account</option>
                <option>To: External Account</option>
                <option>To: Investment Account</option>
              </select>
              <input type="number" placeholder="Amount" className="w-full px-4 py-3 border rounded-lg" />
              <input type="text" placeholder="Description (optional)" className="w-full px-4 py-3 border rounded-lg" />
              <div className="flex space-x-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowTransferModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  onClick={() => simulateLoading(() => {
                    alert('Transfer completed! (Demo)');
                    setShowTransferModal(false);
                  })}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Transfer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bill Pay Modal */}
      {showBillPay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Pay Bills</h3>
            <form className="space-y-4">
              <select className="w-full px-4 py-3 border rounded-lg">
                <option>Select Payee</option>
                <option>Electric Company</option>
                <option>Credit Card Company</option>
                <option>Internet Provider</option>
                <option>Insurance Company</option>
              </select>
              <input type="number" placeholder="Amount" className="w-full px-4 py-3 border rounded-lg" />
              <input type="date" className="w-full px-4 py-3 border rounded-lg" />
              <div className="flex space-x-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowBillPay(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  onClick={() => simulateLoading(() => {
                    alert('Bill payment scheduled! (Demo)');
                    setShowBillPay(false);
                  })}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Pay Bill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-60">
          <div className="bg-white rounded-2xl p-6 flex items-center space-x-4">
            <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <span>Processing...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage1; 