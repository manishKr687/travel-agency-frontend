import React, { useState, useEffect } from 'react';
import { getInquiries } from '../api/inquiries';

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInquiries().then(data => {
      setInquiries(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Inquiries</h2>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <ul className="space-y-4">
          {inquiries.map(inquiry => (
            <li key={inquiry.id} className="border-b pb-4">
              <p className="font-bold">{inquiry.name} ({inquiry.email})</p>
              <p className="text-sm text-gray-600">Package: {inquiry.package}</p>
              <p className="mt-2">{inquiry.message}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminInquiries;
