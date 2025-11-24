import React, { useState, useEffect, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiConfig from "../api/apiConfig";

const InquiryForm = React.lazy(() => import("../components/InquiryForm"));
const SITE_MODE = process.env.REACT_APP_SITE_MODE;

const InquiryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [packageDetails, setPackageDetails] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchDynamic = async () => {
      try {
        const res = await fetch(`${apiConfig.baseURL}/packages/${id}`);
        if (!res.ok) throw new Error("Package fetch failed.");
        const data = await res.json();
        setPackageDetails(data);
      } catch (err) {
        console.error("Error fetching package:", err);
      }
    };

    const fetchStatic = () => {
      fetch("/packages.json")
        .then((res) => {
          if (!res.ok) throw new Error("Static package load failed.");
          return res.json();
        })
        .then((packages) => {
          const pkg = packages.find((p) => p.id === parseInt(id));
          if (pkg) setPackageDetails(pkg);
          else setPackageDetails(null);
        })
        .catch((err) => console.error("Error loading static package:", err));
    };

    SITE_MODE === "static" ? fetchStatic() : fetchDynamic();
  }, [id]);

  const handleSubmit = async ({ name, email, message }) => {
    const finalPrice = packageDetails.offer
      ? packageDetails.price * (1 - packageDetails.offer.discountPercentage / 100)
      : packageDetails.price;

    if (SITE_MODE === "static") {
      const text = `Inquiry for: ${packageDetails.name} (Price: ₹${finalPrice.toLocaleString("en-IN")})\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
      const wa = `https://wa.me/${apiConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
      window.open(wa, "_blank");
      return;
    }

    setIsSubmitting(true);
    const inquiry = { packageId: parseInt(id), packageName: packageDetails.name, finalPrice, name, email, message };

    try {
      const res = await fetch(`${apiConfig.baseURL}/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiry),
      });
      if (!res.ok) throw new Error("Failed to submit inquiry.");
      setIsSubmitted(true);
    } catch (err) {
      alert("Error submitting inquiry: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!packageDetails) {
    return (
      <div className="flex justify-center px-4 py-12 sm:py-16">
        <div className="max-w-2xl w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 sm:p-10 text-center">
          <p>Loading package details for inquiry...</p>
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
                  <br />Your discounted price is: <b>₹{(packageDetails.price * (1 - packageDetails.offer.discountPercentage / 100)).toLocaleString("en-IN")}</b>
                </>
              )}
              We’ll get back to you shortly.
            </p>
            <button
              onClick={() => navigate(`/packages/${id}`)}
              className="mt-6 w-full py-3 rounded-xl bg-secondary text-white font-semibold hover:bg-secondary/90 transition shadow-lg"
            >
              Back to Package
            </button>
          </div>
        ) : (
          <Suspense fallback={<p className="text-center text-gray-500">Loading form...</p>}>
            <InquiryForm
              packageName={packageDetails.name}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default InquiryPage;
