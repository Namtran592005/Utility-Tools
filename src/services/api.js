// src/services/api.js
import axios from 'axios';

const API_KEY = 'caf97accb5d68b386d4ec7bf'; // Thay bằng API Key của bạn
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

export const getExchangeRates = async (baseCurrency) => {
  try {
    const response = await axios.get(`${BASE_URL}/${API_KEY}/latest/${baseCurrency}`);
    return response.data.conversion_rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error; // Re-throw để component gọi xử lý
  }
};

// Thêm các hàm gọi API khác nếu cần (ví dụ: lấy danh sách tiền tệ)