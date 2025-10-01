import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface User {
  name: string;
  type: string;
  balance: number;
  cards: number;
  accountNumber: string;
  email: string;
}

interface Homepage2Props {
  user: User;
  onLogout: () => void;
}

// Define a type for our transaction for type safety
interface Transaction {
    id: number;
    name: string;
    description: string;
    amount: number;
    date: string;
    category: string;
    merchant: string;
    status: string;
    [key: string]: any; // for other dynamic properties
}


const Homepage2: React.FC<Homepage2Props> = ({ user, onLogout }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

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
        color: 'from-teal-500 to-cyan-600' // Different color
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
        color: 'from-sky-500 to-indigo-600' // Different color
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
          color: 'from-emerald-500 to-lime-600' // Different color
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
          color: 'from-amber-500 to-yellow-600' // Different color
        }
      );
    }

    return baseCards.slice(0, user.cards);
  };

  const getTransactions = () => {
    const baseTransactions: any[] = [
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
          mccCode: '6011 - Financial Institutions'
        },
        paymentMethod: 'Card ending in 5678',
        location: 'Chicago, IL, USA',
        processingTime: '0.8 seconds',
        feeAmount: '$3.50',
        atmNetwork: 'Global ATM Alliance'
      }
    ];

    if (user.type === 'admin') {
      baseTransactions.push(
        {
          id: 16,
          name: 'Office Supplies',
          description: 'Stationery and equipment',
          amount: -350.75,
          date: '10 days ago',
          category: 'Business',
          merchant: 'Office Depot',
          status: 'Completed'
        },
        {
          id: 17,
          name: 'Client Dinner',
          description: 'Hosted dinner meeting',
          amount: -850.00,
          date: '11 days ago',
          category: 'Business',
          merchant: 'The Capital Grille',
          status: 'Completed'
        }
      );
    }
    
    // To make it slightly different, let's remove the last transaction for non-admin users
    if (user.type !== 'admin' && baseTransactions.length > 1) {
      baseTransactions.pop();
    }
    
    return baseTransactions;
  };


  const cards = getUserData();
  const transactions = getTransactions();
  const filteredTransactions = transactions.filter((t: Transaction) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'INCOME') return t.amount > 0;
    if (activeFilter === 'EXPENSES') return t.amount < 0;
    return t.category === activeFilter;
  });

  const handleTransactionClick = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowTransactionModal(true);
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowTransactionModal(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div className="grid grid-cols-12 gap-6 p-6">
        
        <header className="col-span-12 bg-gray-800 p-4 rounded-lg flex justify-between items-center">
            <h1 className="text-2xl font-bold">V2 Dashboard</h1>
            <div className="flex items-center">
                <Link to="/homepage1" className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg mr-4">Switch to V1</Link>
                <button onClick={onLogout} className="bg-red-600 hover:bg-red-700 p-2 rounded-lg">Logout</button>
            </div>
        </header>

        <main className="col-span-12 md:col-span-8 grid grid-rows-3 gap-6">
            <section className="row-span-1 bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Your Cards</h2>
                <div className="flex space-x-4 overflow-x-auto pb-2">
                    {cards.map(card => (
                        <div key={card.id} className={`w-64 h-40 p-4 rounded-xl shadow-lg bg-gradient-to-br ${card.color} flex-shrink-0`}>
                            <p className="font-bold text-lg">{card.type}</p>
                            <p className="text-sm opacity-80">{card.number}</p>
                            <div className="mt-4">
                                <p className="text-xs">Balance</p>
                                <p className="font-semibold text-xl">${card.balance.toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <article className="row-span-2 bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                
                {/* Filter Buttons */}
                <div className="flex space-x-4 mb-4">
                  {['ALL', 'INCOME', 'EXPENSES'].map(filter => (
                    <button 
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeFilter === filter 
                          ? 'bg-teal-600 text-white' 
                          : 'text-gray-400 hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
                
                <ul className="space-y-3">
                    {filteredTransactions.map((t: Transaction) => (
                        <li key={t.id} onClick={() => handleTransactionClick(t)} className="grid grid-cols-3 items-center p-3 hover:bg-gray-700 rounded-md cursor-pointer">
                            <div className="col-span-2">
                                <p className="font-bold">{t.name}</p>
                                <p className="text-sm text-gray-400">{t.merchant}</p>
                            </div>
                            <p className={`text-right font-mono ${t.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>{t.amount > 0 ? '+' : '-'}${Math.abs(t.amount).toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
            </article>
        </main>

        <aside className="col-span-12 md:col-span-4 bg-gray-800 p-6 rounded-lg flex flex-col space-y-4">
            <section>
                <h2 className="text-xl font-semibold mb-4">User Profile</h2>
                <div className="space-y-2">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Account #:</strong> {user.accountNumber}</p>
                    <p><strong>User Type:</strong> <span className="capitalize">{user.type}</span></p>
                </div>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                    <button className="bg-sky-600 hover:bg-sky-700 p-3 rounded-lg text-center">Transfer</button>
                    <button className="bg-emerald-600 hover:bg-emerald-700 p-3 rounded-lg text-center">Pay Bills</button>
                    <button className="bg-amber-600 hover:bg-amber-700 p-3 rounded-lg text-center">Add Card</button>
                    <button className="bg-rose-600 hover:bg-rose-700 p-3 rounded-lg text-center">Freeze</button>
                </div>
            </section>
        </aside>

      </div>

      {/* Transaction Modal */}
      {showTransactionModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg max-h-full overflow-y-auto p-6 border border-gray-700">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-white">Transaction Details</h2>
                <button onClick={() => setShowTransactionModal(false)} className="p-1 rounded-full hover:bg-gray-700 transition">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4 text-gray-300">
                <div>
                  <p className="font-bold text-xl">{selectedTransaction.name}</p>
                  <p className="text-gray-400 text-sm">{selectedTransaction.description}</p>
                  <p className={`text-2xl font-bold mt-2 ${selectedTransaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedTransaction.amount > 0 ? '+' : '-'}${Math.abs(selectedTransaction.amount).toFixed(2)}
                  </p>
                </div>

                <div className="border-t border-gray-700 pt-4 grid grid-cols-2 gap-4">
                    <p><strong>Date:</strong> {selectedTransaction.date}</p>
                    <p><strong>Category:</strong> {selectedTransaction.category}</p>
                    <p><strong>Merchant:</strong> {selectedTransaction.merchant}</p>
                    <p><strong>Status:</strong> <span className="font-semibold text-green-400">{selectedTransaction.status}</span></p>
                    {/* Display all other details dynamically */}
                    {Object.entries(selectedTransaction).map(([key, value]) => {
                      if (['id', 'name', 'description', 'amount', 'date', 'category', 'merchant', 'status'].includes(key)) return null;
                      return (
                        <p key={key}>
                          <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</strong> 
                          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </p>
                      );
                    })}
                </div>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage2; 