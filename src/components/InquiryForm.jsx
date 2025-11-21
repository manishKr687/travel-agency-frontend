import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import apiConfig from '../api/apiConfig';

// TODO: These are not possible without backend. Other way of doing is
// to integrate these with email/whatsapp and directly send the inquire there.
// Not sure if adding those on frontend is wise decision, will have to dive deep here.

const InquiryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  

  const [packageName, setPackageName] = useState('the selected package');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await fetch(`${apiConfig.baseURL}/packages/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch package details');
        }
        const data = await response.json();
        setPackageName(data.name);
      } catch (error) {
        console.error("Error fetching package:", error);
        // Handle error, maybe show a message to the user
      }
    };

    fetchPackage();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const inquiry = {
      packageId: parseInt(id),
      packageName: packageName,
      name: name,
      email: email,
      message: message
    };

    try {
      const response = await fetch(`${apiConfig.baseURL}/inquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inquiry)
      });

      if (!response.ok) {
        throw new Error("Failed to submit inquiry");
      }

      const data = await response.json();
      console.log("Inquiry submitted:", data);
      setIsSubmitted(true);

    } catch (err) {
      alert("Error submitting inquiry: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const text = `I am inquiring about the package: ${packageName}. My name is ${name}.`;
    const whatsappUrl = `https://wa.me/${apiConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isSubmitted) {
    return (
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-teal-600">Thank You!</h3>
        <p className="mt-2 text-gray-600">
          Your inquiry for <b>{packageName}</b> has been received. We'll be in touch shortly!
        </p>
        <button
          onClick={() => navigate(`/packages/${id}`)}
          className="mt-4 w-full py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg shadow transition duration-150"
        >
          Back to Package
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <h3 className="text-2xl font-bold text-gray-800">Inquire About {packageName}</h3>

      <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Message</label>
          <textarea
            className="w-full p-2 border rounded"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
          </button>
          <button
            type="button"
            onClick={handleWhatsApp}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Mail className="mr-2" /> WhatsApp
          </button>
        </div>
    </form>
  );
};

export default InquiryForm;