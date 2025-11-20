// src/api/inquiries.js

const inquiries = [
  { id: 1, name: 'John Doe', email: 'john@example.com', package: 'Mystical Bali Retreat', message: 'I would like to know more about the itinerary.' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', package: 'Tokyo Neon Adventure', message: 'Are flights included?' },
];

export const getInquiries = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(inquiries);
    }, 500);
  });
};
