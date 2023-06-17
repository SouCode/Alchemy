const express = require('express');
const router = express.Router();
const { encrypt, decrypt } = require('../utils/encryptionUtils');
const AlchUsers = require('../models/alchemyUserModel');
const Alpaca = require('@alpacahq/alpaca-trade-api');
const keys = require('../utils/keys.json');
const axios = require('axios');

// Rest of the code...
// Create an order
router.post('/orders', async (req, res) => {
  try {
    const { username, symbol, qty, side, type, time_in_force, limit_price, stop_price } = req.body;

    // Find the user in the database
    const user = await AlchUsers.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Decrypt the API keys
    const decryptedApiKey = decrypt(user.alpacaApiKey, keys.encryptionKey, keys.encryptionIV);
    const decryptedSecretKey = decrypt(user.alpacaSecretKey, keys.encryptionKey, keys.encryptionIV);

    // Instantiate the Alpaca SDK with user's API keys
    const alpaca = new Alpaca({
      keyId: decryptedApiKey,
      secretKey: decryptedSecretKey,
      paper: true, // Use paper trading account
    });

    // Create the order using the Alpaca SDK
    const order = await alpaca.createOrder({
      symbol,
      qty,
      side,
      type,
      time_in_force,
      limit_price,
      stop_price,
    });

    res.status(200).json({ message: 'Order created successfully', orderId: order.id });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get orders
router.get('/orders', async (req, res) => {
  try {
    const { userId, status, after, until, limit, direction } = req.query;

    // Find the user in the database by the AlchemyUser object ID
    const user = await AlchUsers.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Decrypt the API keys
    const decryptedApiKey = decrypt(user.alpacaApiKey, keys.encryptionKey, keys.encryptionIV);
    const decryptedSecretKey = decrypt(user.alpacaSecretKey, keys.encryptionKey, keys.encryptionIV);

    // Instantiate the Alpaca SDK with user's API keys
    const alpaca = new Alpaca({
      keyId: decryptedApiKey,
      secretKey: decryptedSecretKey,
      paper: true, // Use paper trading account
    });

    // Get the list of orders using the Alpaca SDK
    const orders = await alpaca.getOrders({
      status,
      after,
      until,
      limit,
      direction,
    });

    res.status(200).json({ orders });
  } catch (err) {
    console.error('Error getting orders:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Get order by ID
router.get('/orders/:orderId', async (req, res) => {
  try {
    const { username, orderId } = req.params;

    // Find the user in the database
    const user = await AlchUsers.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Instantiate the Alpaca SDK with user's Alpaca API keys
    const alpaca = new Alpaca({
      keyId: user.alpacaApiKey,
      secretKey: user.alpacaSecretKey,
      paper: true, // Use paper trading account
    });

    // Get the order by ID using the Alpaca SDK
    const order = await alpaca.getOrder(orderId);

    res.status(200).json({ order });
  } catch (err) {
    console.error('Error getting order by ID:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get order by client ID
router.get('/orders/client/:clientId', async (req, res) => {
  try {
    const { username, clientId } = req.params;

    // Find the user in the database
    const user = await AlchUsers.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Instantiate the Alpaca SDK with user's Alpaca API keys
    const alpaca = new Alpaca({
      keyId: user.alpacaApiKey,
      secretKey: user.alpacaSecretKey,
      paper: true, // Use paper trading account
    });

    // Get the order by client ID using the Alpaca SDK
    const order = await alpaca.getOrderByClientOrderId(clientId);

    res.status(200).json({ order });
  } catch (err) {
    console.error('Error getting order by client ID:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an order
router.patch('/orders/:orderId', async (req, res) => {
  try {
    const { username, orderId } = req.params;
    const { symbol, qty, side, type, time_in_force, limit_price, stop_price } = req.body;

    // Find the user in the database
    const user = await AlchUsers.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Instantiate the Alpaca SDK with user's Alpaca API keys
    const alpaca = new Alpaca({
      keyId: user.alpacaApiKey,
      secretKey: user.alpacaSecretKey,
      paper: true, // Use paper trading account
    });

    // Update the order using the Alpaca SDK
    const updatedOrder = await alpaca.replaceOrder(orderId, {
      symbol,
      qty,
      side,
      type,
      time_in_force,
      limit_price,
      stop_price,
    });

    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Cancel an order
router.delete('/orders/:orderId', async (req, res) => {
  try {
    const { username, orderId } = req.params;

    // Find the user in the database
    const user = await AlchUsers.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Instantiate the Alpaca SDK with user's Alpaca API keys
    const alpaca = new Alpaca({
      keyId: user.alpacaApiKey,
      secretKey: user.alpacaSecretKey,
      paper: true, // Use paper trading account
    });

    // Cancel the order using the Alpaca SDK
    await alpaca.cancelOrder(orderId);

    res.status(200).json({ message: 'Order canceled successfully' });
  } catch (err) {
    console.error('Error canceling order:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Cancel all orders
router.delete('/orders', async (req, res) => {
  try {
    const { username } = req.query;

    // Find the user in the database
    const user = await AlchUsers.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Instantiate the Alpaca SDK with user's Alpaca API keys
    const alpaca = new Alpaca({
      keyId: user.alpacaApiKey,
      secretKey: user.alpacaSecretKey,
      paper: true, // Use paper trading account
    });

    // Cancel all open orders using the Alpaca SDK
    await alpaca.cancelAllOrders();

    res.status(200).json({ message: 'All orders canceled successfully' });
  } catch (err) {
    console.error('Error canceling all orders:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get position by symbol
router.get('/positions/:symbol', async (req, res) => {
  try {
    const { username, symbol } = req.params;

    // Find the user in the database
    const user = await AlchUsers.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Instantiate the Alpaca SDK with user's Alpaca API keys
    const alpaca = new Alpaca({
      keyId: user.alpacaApiKey,
      secretKey: user.alpacaSecretKey,
      paper: true, // Use paper trading account
    });

    // Get the position by symbol using the Alpaca SDK
    const position = await alpaca.getPosition(symbol);

    res.status(200).json({ position });
  } catch (err) {
    console.error('Error getting position:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all positions
router.get('/positions', async (req, res) => {
  try {
    const { username } = req.query;

    // Find the user in the database
    const user = await AlchUsers.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Instantiate the Alpaca SDK with user's Alpaca API keys
    const alpaca = new Alpaca({
      keyId: user.alpacaApiKey,
      secretKey: user.alpacaSecretKey,
      paper: true, // Use paper trading account
    });

    // Get all positions using the Alpaca SDK
    const positions = await alpaca.getPositions();

    res.status(200).json({ positions });
  } catch (err) {
    console.error('Error getting positions:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Close a position
router.delete('/positions/:symbol', async (req, res) => {
  try {
    const { username, symbol } = req.params;

    // Find the user in the database
    const user = await AlchUsers.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Instantiate the Alpaca SDK with user's Alpaca API keys
    const alpaca = new Alpaca({
      keyId: user.alpacaApiKey,
      secretKey: user.alpacaSecretKey,
      paper: true, // Use paper trading account
    });

    // Close the position using the Alpaca SDK
    await alpaca.closePosition(symbol);

    res.status(200).json({ message: 'Position closed successfully' });
  } catch (err) {
    console.error('Error closing position:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Close all positions
router.delete('/positions', async (req, res) => {
  try {
    const { username } = req.query;

    // Find the user in the database
    const user = await AlchUsers.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Instantiate the Alpaca SDK with user's Alpaca API keys
    const alpaca = new Alpaca({
      keyId: user.alpacaApiKey,
      secretKey: user.alpacaSecretKey,
      paper: true, // Use paper trading account
    });

    // Close all positions using the Alpaca SDK
    await alpaca.closeAllPositions();

    res.status(200).json({ message: 'All positions closed successfully' });
  } catch (err) {
    console.error('Error closing all positions:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;