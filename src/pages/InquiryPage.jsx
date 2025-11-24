import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiConfig from "../api/apiConfig";
import InquiryForm from "../components/InquiryForm";
import { usePackages } from "../context/PackagesContext";

const SITE_MODE = process.env.REACT_APP_SITE_MODE;

const InquiryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { packages, loading: packagesLoading, error: packagesError } = usePackages();

  const packageDetails = useMemo(() => {
    if (packages?.length > 0) {
      return packages.find((p) => p.id === Number(id));
    }
    return null;
  }, [packages, id]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async ({ name, email, message }) => {
    const finalPrice = packageDetails.offer
      ? packageDetails.price * (1 - packageDetails.offer.discountPercentage / 100)
      : packageDetails.price;

    if (SITE_MODE === "static") {
      const text = `Inquiry for: ${packageDetails.name} (Price: ₹${finalPrice.toLocaleString(
        "en-IN"
      )})\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
      const wa = `https://wa.me/${apiConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
      window.open(wa, "_blank");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${apiConfig.baseURL}/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: Number(id),
          packageName: packageDetails.name,
          finalPrice,
          name,
          email,
          message,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit inquiry");
      setIsSubmitted(true);
    } catch (err) {
      alert("Error submitting inquiry: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (packagesLoading || packagesError || !packageDetails) {
    return (
      <div className="flex justify-center px-4 py-12 sm:py-16">
        <div className="max-w-2xl w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 sm:p-10 text-center">
          {packagesLoading && <p>Loading packages...</p>}
          {packagesError && <p>Error loading packages: {packagesError.message}</p>}
          {!packageDetails && !packagesLoading && !packagesError && (
            <p>Package not found or details unavailable.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center px-4 py-12 sm:py-16">
      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 sm:p-10">

        {isSubmitted ? (
          <div className="text-center">
            <h3 className="text-3xl font-heading text-secondary font-bold">Thank You!</h3>
            <p className="mt-3 text-gray-700">
              Your inquiry for <b>{packageDetails.name}</b> has been received.
              {packageDetails.offer && (
                <>
                  <br />
                  Discounted Price:{" "}
                  <b>
                    ₹
                    {(
                      packageDetails.price *
                      (1 - packageDetails.offer.discountPercentage / 100)
                    ).toLocaleString("en-IN")}
                  </b>
                </>
              )}
            </p>

            <button
              onClick={() => navigate(`/packages/${id}`)}
              className="mt-6 w-full py-3 rounded-xl bg-secondary text-white font-semibold hover:bg-secondary/90 transition shadow-lg"
            >
              Back to Package
            </button>
          </div>
        ) : (
          <InquiryForm
            packageName={packageDetails.name}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}

      </div>
    </div>
  );
};

export default InquiryPage;
