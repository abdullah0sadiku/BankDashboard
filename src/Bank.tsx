import React from 'react';

const Bank = () => {
  // Sample data for the public demo dashboard
  const accountHolder = {
    name: 'Sarah Anderson',
    id: 'ACC-2024-78932',
    accountNumber: '**** **** **** 4892',
    balance: 24580.75,
    availableBalance: 22340.50
  };

  const cards = [
    {
      id: 1,
      type: 'Visa Platinum',
      number: '**** **** **** 4892',
      expiry: '12/26',
      cardHolder: 'Sarah Anderson',
      color: 'from-purple-600 to-blue-600'
    },
    {
      id: 2,
      type: 'Mastercard Gold',
      number: '**** **** **** 7634',
      expiry: '08/27',
      cardHolder: 'Sarah Anderson',
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 3,
      type: 'Virtual Card',
      number: '**** **** **** 2189',
      expiry: '03/25',
      cardHolder: 'Sarah Anderson',
      color: 'from-emerald-500 to-teal-600'
    }
  ];

  const transactions = [
    { id: 1, merchant: 'Amazon Purchase', amount: -145.99, date: '2024-10-01', type: 'shopping', status: 'completed' },
    { id: 2, merchant: 'Salary Deposit', amount: 5420.00, date: '2024-09-30', type: 'income', status: 'completed' },
    { id: 3, merchant: 'Netflix Subscription', amount: -15.99, date: '2024-09-28', type: 'subscription', status: 'completed' },
    { id: 4, merchant: 'Grocery Store', amount: -89.50, date: '2024-09-27', type: 'shopping', status: 'completed' },
    { id: 5, merchant: 'Gas Station', amount: -65.00, date: '2024-09-26', type: 'transport', status: 'completed' },
    { id: 6, merchant: 'Restaurant', amount: -120.75, date: '2024-09-25', type: 'dining', status: 'completed' },
    { id: 7, merchant: 'Electric Bill', amount: -180.00, date: '2024-09-24', type: 'utilities', status: 'completed' },
    { id: 8, merchant: 'Freelance Project', amount: 2500.00, date: '2024-09-23', type: 'income', status: 'completed' },
    { id: 9, merchant: 'Pharmacy', amount: -45.30, date: '2024-09-22', type: 'health', status: 'completed' },
    { id: 10, merchant: 'ATM Withdrawal', amount: -200.00, date: '2024-09-21', type: 'withdrawal', status: 'completed' }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'shopping': return '🛍️';
      case 'income': return '💰';
      case 'subscription': return '📺';
      case 'transport': return '⛽';
      case 'dining': return '🍽️';
      case 'utilities': return '⚡';
      case 'health': return '💊';
      case 'withdrawal': return '🏧';
      default: return '💳';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Bank Dashboard</h1>
              <p className="text-gray-600">Public Demo - No Authentication Required</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-lg"></div>
            </div>
          </div>

          {/* Account Holder Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Holder Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Account Holder</p>
                <p className="text-lg font-semibold text-gray-800">{accountHolder.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Account ID</p>
                <p className="text-lg font-semibold text-gray-800">{accountHolder.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Account Number</p>
                <p className="text-lg font-semibold text-gray-800">{accountHolder.accountNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Balance</p>
                <p className="text-lg font-semibold text-green-600">
                  ${accountHolder.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-xl p-6 text-white">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-purple-100 text-sm mb-2">Total Balance</p>
                <p className="text-4xl font-bold">
                  ${accountHolder.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                💎
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-purple-100 text-xs mb-1">Account Number</p>
                <p className="text-lg font-mono">{accountHolder.accountNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-purple-100 text-xs mb-1">Status</p>
                <p className="text-sm font-semibold">Active</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-sm mb-2">Available Balance</p>
                <p className="text-3xl font-bold text-gray-800">
                  ${accountHolder.availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-green-600 text-xs mb-1">Income</p>
                <p className="text-lg font-semibold text-green-700">$7,920</p>
              </div>
              <div className="bg-red-50 rounded-lg p-3">
                <p className="text-red-600 text-xs mb-1">Expenses</p>
                <p className="text-lg font-semibold text-red-700">$862.53</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`bg-gradient-to-br ${card.color} rounded-2xl shadow-xl p-6 text-white relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <div className="text-sm font-medium opacity-90">{card.type}</div>
                    <div className="text-2xl">💳</div>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-xl font-mono tracking-wider mb-1">{card.number}</p>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs opacity-70 mb-1">Card Holder</p>
                      <p className="text-sm font-semibold">{card.cardHolder}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs opacity-70 mb-1">Expires</p>
                      <p className="text-sm font-semibold">{card.expiry}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Transactions</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-2xl">
                    {getTypeIcon(transaction.type)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{transaction.merchant}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-lg font-bold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-gray-800'
                    }`}
                  >
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{transaction.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bank;