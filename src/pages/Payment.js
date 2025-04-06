import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import GoogleIcon from '@mui/icons-material/Google';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import './Payment.css';

function Payment() {
  // Add these new states with the existing state declarations
  const [selectedMethod, setSelectedMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [showReceipt, setShowReceipt] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('pending');
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [inputTransactionId, setInputTransactionId] = useState('');

  // Add this new handler function before the return statement
  // Update the handleVerifyPayment function
  const handleVerifyPayment = (e) => {
    e.preventDefault();
    console.log('Input ID:', inputTransactionId, 'Actual ID:', transactionId); // For debugging
    
    if (inputTransactionId === transactionId) {
      setVerificationStatus('verified');
      setPaymentStatus('completed');
      setShowReceipt(true);
      setError('');
    } else {
      // Display the transaction ID for the user to verify
      setError('Please enter the transaction ID shown in your payment app');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Add this with other state declarations at the top
  const [verificationCode, setVerificationCode] = useState('');
  
  // Update the generateTransactionId function
  const generateTransactionId = () => {
    const txnId = 'TXN' + Date.now().toString().slice(-8);
    const verCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setVerificationCode(verCode);
    return { txnId, verCode };
  };
  
  // Update the handlePayment function
  const handlePayment = async (e) => {
    e.preventDefault();
    if (!selectedMethod) {
      setError('Please select a payment method');
      return;
    }
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
  
    try {
      if (selectedMethod === 'googlepay' || selectedMethod === 'phonepe') {
        const { txnId, verCode } = generateTransactionId();
        const qrData = generateQRValue(selectedMethod, amount, txnId, verCode);
        setQrValue(qrData);
        setTransactionId(txnId);
        setShowQR(true);
        setError('');
      } else if (selectedMethod === 'card') {
        const txnId = generateTransactionId();
        setTransactionId(txnId);
        setPaymentStatus('processing');
        setTimeout(() => {
          setPaymentStatus('completed');
          setShowReceipt(true);
        }, 2000);
      }
    } catch (err) {
      setError('Payment processing failed. Please try again.');
      console.error('Payment error:', err);
    }
  };

  // Add new state for payment simulation
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  // Add new state to track payment verification attempts
    const [verificationAttempts, setVerificationAttempts] = useState(0);
  
  useEffect(() => {
    let timer;
    let verificationTimer;
  
    if (showQR && timeLeft > 0 && paymentStatus === 'pending') {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
  
      // Payment verification logic
      verificationTimer = setInterval(async () => {
        try {
          // Increment verification attempts
          setVerificationAttempts(prev => prev + 1);
  
          // Simulate checking with UPI servers
          const checkPayment = async () => {
            // In production, this would be a real API call to your backend
            const response = await fetch(`https://your-backend/api/verify-upi/${transactionId}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                upiId: 'piyushsolanki381-1@oksbi',
                amount: amount,
                transactionId: transactionId
              })
            }).catch(() => {
              // Simulate successful payment after a few verification attempts
              if (verificationAttempts > 2) {
                return {
                  ok: true,
                  json: () => Promise.resolve({ status: 'completed' })
                };
              }
              return {
                ok: true,
                json: () => Promise.resolve({ status: 'pending' })
              };
            });
  
            return response.json();
          };
  
          const result = await checkPayment();
          
          if (result.status === 'completed') {
            setVerificationStatus('verified');
            setPaymentStatus('completed');
            setShowReceipt(true);
            clearInterval(verificationTimer);
          }
        } catch (err) {
          console.error('Payment verification error:', err);
        }
      }, 3000); // Check every 3 seconds
  
      return () => {
        clearInterval(timer);
        clearInterval(verificationTimer);
      };
    } else if (timeLeft === 0) {
      setPaymentStatus('expired');
    }
    return () => clearInterval(timer);
  }, [showQR, timeLeft, paymentStatus, transactionId, amount, verificationAttempts]);

  // Update the QR container messages
  const Receipt = () => (
    <div className="receipt">
      <div className="receipt-header">
        <h2>Payment Receipt</h2>
        <p className="receipt-date">{new Date().toLocaleString()}</p>
      </div>
      <div className="receipt-details">
        <div className="receipt-row">
          <span>Transaction ID:</span>
          <span>{transactionId}</span>
        </div>
        <div className="receipt-row">
          <span>Amount Paid:</span>
          <span>₹{amount}</span>
        </div>
        <div className="receipt-row">
          <span>Payment Method:</span>
          <span>{selectedMethod.toUpperCase()}</span>
        </div>
        <div className="receipt-row">
          <span>Status:</span>
          <span className="status-success">Success</span>
        </div>
      </div>
      <div className="receipt-actions">
        <button onClick={() => window.print()} className="print-button">
          Print Receipt
        </button>
        <button onClick={() => window.location.href = '/history'} className="view-history">
          View History
        </button>
      </div>
    </div>
  );

  return (
    <div className="payment-page">
      <section className="payment-hero">
        <h1>Make Payment</h1>
        <p>Choose your preferred payment method</p>
      </section>

      <div className="payment-container">
        {showReceipt ? (
          <Receipt />
        ) : !showQR ? (
          <form onSubmit={handlePayment} className="payment-form">
            <div className="amount-input">
              <label>Enter Amount (₹)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
              />
            </div>

            <div className="payment-methods">
              <h2>Select Payment Method</h2>
              <div className="method-options">
                <div 
                  className={`method-card ${selectedMethod === 'googlepay' ? 'selected' : ''}`}
                  onClick={() => setSelectedMethod('googlepay')}
                >
                  <GoogleIcon className="payment-icon" />
                  <span>Google Pay</span>
                </div>

                <div 
                  className={`method-card ${selectedMethod === 'phonepe' ? 'selected' : ''}`}
                  onClick={() => setSelectedMethod('phonepe')}
                >
                  <PhoneIphoneIcon className="payment-icon" />
                  <span>PhonePe</span>
                </div>

                <div 
                  className={`method-card ${selectedMethod === 'card' ? 'selected' : ''}`}
                  onClick={() => setSelectedMethod('card')}
                >
                  <CreditCardIcon className="payment-icon" />
                  <span>Card Payment</span>
                </div>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" className="pay-button">
              Pay ₹{amount || '0'}
            </button>
          </form>
        ) : (
          <div className="qr-container">
            <h2>Scan QR Code to Pay</h2>
            <div className="qr-code">
              <QRCodeSVG
                value={qrValue}
                size={256}
                level="H"
                includeMargin={true}
                bgColor="#ffffff"
                fgColor="#000000"
                style={{ display: 'block', margin: '0 auto' }}
              />
            </div>
            <p className="amount-display">Amount: ₹{amount}</p>
            <p className="verification-code">Verification Code: {verificationCode}</p>
            
            {paymentStatus === 'pending' && (
              <>
                <div className="timer">Time remaining: {formatTime(timeLeft)}</div>
                {!showVerificationInput ? (
                  <button 
                    className="verify-button" 
                    onClick={() => setShowVerificationInput(true)}
                  >
                    Verify Payment
                  </button>
                ) : (
                  <form onSubmit={handleVerifyPayment} className="verification-form">
                    <input
                      type="text"
                      value={inputTransactionId}
                      onChange={(e) => setInputTransactionId(e.target.value)}
                      placeholder="Enter Verification Code"
                      required
                    />
                    <button type="submit">Verify</button>
                  </form>
                )}
              </>
            )}

            {error && <div className="error-message">{error}</div>}
            
            {verificationStatus === 'verifying' && (
              <div className="verification-message">
                Verifying your payment...
              </div>
            )}

            {paymentStatus === 'completed' && (
              <div className="success-message">
                Payment successful! Redirecting to transaction history...
              </div>
            )}

            {paymentStatus === 'expired' && (
              <div className="error-message">
                QR code expired. Please try again.
              </div>
            )}

            {paymentStatus === 'pending' && (
              <button className="back-button" onClick={() => setShowQR(false)}>
                Back to Payment Methods
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;

// Add this function after generateTransactionId
const generateQRValue = (method, amount, txnId, verCode) => {
  const upiUrl = `upi://pay?pa=piyushsolanki381-1@oksbi&pn=FACT_STORE&tr=${txnId}&tn=Payment for Order [Code: ${verCode}]&am=${amount}&cu=INR`;
  return upiUrl;
};