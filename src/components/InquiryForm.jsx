import React, { useState } from "react";

const InquiryForm = ({ packageName, onSubmit, isSubmitting }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, message });
  };

  return (
    <>
      <h3 className="text-3xl font-heading font-bold text-secondary mb-6">
        Inquiry About <span className="text-primary">{packageName}</span>
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* NAME */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Full Name
          </label>
          <input
            type="text"
            className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-primary focus:border-primary transition"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Email Address
          </label>
          <input
            type="email"
            className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-primary focus:border-primary transition"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* MESSAGE */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Message</label>
          <textarea
            rows="4"
            className="w-full p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-primary focus:border-primary transition"
            placeholder="Tell us more about your travel interest..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-primary text-white rounded-xl font-semibold shadow-md hover:bg-primary/90 transition"
        >
          {isSubmitting ? "Submitting..." : "Submit Inquiry"}
        </button>
      </form>
    </>
  );
};

export default InquiryForm;
