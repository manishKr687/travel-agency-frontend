import React from 'react';
import { Phone } from 'lucide-react';
import ContactButton from './ContactButton';

const WhatsAppButton = () => {
  const openWhatsApp = () => {
    // Replace with your WhatsApp number
    const phoneNumber = '7979804102';
    const message = "Hello! I'm interested in your travel packages.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <ContactButton
      icon={<Phone size={28} />}
      backgroundColor="#25D366"
      onClick={openWhatsApp}
    />
  );
};

export default WhatsAppButton;
