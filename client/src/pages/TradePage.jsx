import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import Card from '../components/Card';
import InputGroup from '../components/InputGroup';
import Button from '../components/Button';
import Table from '../components/Table';
import { MOCK_STOCKS, MOCK_PORTFOLIO } from '../data/mockStocks';

/**
 * TradePage component - Trading interface for buying and selling stocks
 */
const TradePage = () => {
  const [orderType, setOrderType] = useState('buy');
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [stocks, setStocks] = useState(MOCK_STOCKS);
  const [currentStock, setCurrentStock] = useState(null);

  const stockOptions = stocks.map((stock) => ({
    value: stock.symbol,
    label: `${stock.symbol} - ${stock.name}`,
  }));

  const handleStockSelect = (e) => {
    const selectedSymbol = e.target.value;
    setSymbol(selectedSymbol);
    const foundStock = stocks.find((s) => s.symbol === selectedSymbol);
    setCurrentStock(foundStock || null);
  };

  const handleStockChange = (e) => {
    const foundStock = stocks.find((s) => s.symbol === e.target.value);
    setSymbol(foundStock ? foundStock.symbol : '');
    setCurrentStock(foundStock || null);
  };

  const estimatedValue = (Number(quantity) || 0) * (currentStock?.price || 0);

  const columns = [
    { key: 'symbol', label: 'Symbol' },
    { key: 'name', label: 'Name' },
    { key: 'price', label: 'Price' },
    { key: 'available', label: 'Action' },
  ];

  const tableData = stocks.map((stock) => ({
    ...stock,
    price: `$${stock.price.toFixed(2)}`,
    available: (
      <div className="flex space-x-2">
        <button
          className="px-3 py-1 bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 rounded text-sm font-medium"
          onClick={() => {
            setSymbol(stock.symbol);
            setCurrentStock(stock);
            setOrderType('buy');
          }}
        >
          Buy
        </button>
        <button
          className="px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 rounded text-sm font-medium"
          onClick={() => {
            setSymbol(stock.symbol);
            setCurrentStock(stock);
            setOrderType('sell');
          }}
        >
          Sell
        </button>
      </div>
    ),
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Trading Form */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Place Trade</h2>
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setOrderType('buy')}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                  orderType === 'buy'
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setOrderType('sell')}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                  orderType === 'sell'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Sell
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Stock Symbol
                </label>
                <select
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={symbol}
                  onChange={handleStockChange}
                >
                  <option value="">Select a stock...</option>
                  {stockOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>

            {currentStock && (
              <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Current Price</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${currentStock.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Estimated Value</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${estimatedValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Available Cash</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${MOCK_PORTFOLIO.availableCash.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                {orderType === 'sell' && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Owned</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {MOCK_STOCKS.find((s) => s.symbol === symbol)?.symbol === symbol ? '25 shares' : '0 shares'}
                    </span>
                  </div>
                )}
              </div>
            )}

            <Button 
              className="w-full" 
              size="lg"
              variant={orderType === 'buy' ? 'primary' : 'danger'}
              onClick={() => {
                console.log('Order placed:', { type: orderType, symbol, quantity, price: currentStock?.price });
                setQuantity('');
              }}
              disabled={!symbol || !quantity || !currentStock}
            >
              {orderType === 'buy' ? 'Buy Stock' : 'Sell Stock'}
            </Button>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg mr-3">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Buy</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Buy popular stocks with pre-filled quantities
            </p>
            <div className="space-y-2">
              {['AAPL', 'MSFT', 'NVDA'].map((s) => (
                <button
                  key={s}
                  className="w-full flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  onClick={() => {
                    const stock = stocks.find((st) => st.symbol === s);
                    setSymbol(s);
                    setCurrentStock(stock);
                    setQuantity('10');
                    setOrderType('buy');
                  }}
                >
                  <span className="font-medium text-gray-900 dark:text-white">{s}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">10 shares</span>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg mr-3">
                <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Sell</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Sell stocks with pre-filled quantities
            </p>
            <div className="space-y-2">
              {['AAPL', 'MSFT', 'NVDA'].map((s) => (
                <button
                  key={s}
                  className="w-full flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  onClick={() => {
                    const stock = stocks.find((st) => st.symbol === s);
                    setSymbol(s);
                    setCurrentStock(stock);
                    setQuantity('5');
                    setOrderType('sell');
                  }}
                >
                  <span className="font-medium text-gray-900 dark:text-white">{s}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">5 shares</span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Stock List */}
      <div className="lg:col-span-1">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Popular Stocks</h3>
          <Table 
            columns={columns}
            data={tableData}
            className="text-sm"
          />
        </Card>
      </div>
    </div>
  );
};

export default TradePage;
