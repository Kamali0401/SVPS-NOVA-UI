import { useState } from "react";
import axios from "axios";
 
export default function AccountDeletionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
 
    try {
      // Make API call to delete account
      await axios.post("http://103.53.52.215:90/api/DeleteuserAccount?id=2");
      setIsSuccess(true);
    } catch (err) {
      setError(
        "An error occurred while processing your request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
 
  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f0f0",
  };
 
  const containerStyle = {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "30px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  };
 
  const headingStyle = {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  };
 
  const paragraphStyle = {
    marginBottom: "20px",
    lineHeight: "1.5",
    color: "#666",
  };
 
  const formStyle = {
    display: "flex",
    flexDirection: "column",
  };
 
  const buttonStyle = {
    backgroundColor: "#ff4444",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "10px 15px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };
 
  const successStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "15px",
    borderRadius: "4px",
    marginTop: "20px",
    textAlign: "center",
  };
 
  const errorStyle = {
    backgroundColor: "#ff4444",
    color: "white",
    padding: "15px",
    borderRadius: "4px",
    marginTop: "20px",
    textAlign: "center",
  };
 
  return (
<div style={pageStyle}>
<div style={containerStyle}>
<h1 style={headingStyle}>Delete Your Account</h1>
        {!isSuccess ? (
<>
<p style={paragraphStyle}>
              We're sorry to see you go. Please note that this action is
              irreversible and will permanently delete your account and all
              associated data.
</p>
<form onSubmit={handleSubmit} style={formStyle}>
<button
                type="submit"
                style={{
                  ...buttonStyle,
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                }}
                disabled={isSubmitting}
>
                {isSubmitting ? "Processing..." : "Request Account Deletion"}
</button>
</form>
</>
        ) : (
<div style={successStyle}>
<p>
              Your account deletion request has been received. Your account will
              be permanently deleted within 5-7 working days.
</p>
</div>
        )}
        {error && <div style={errorStyle}>{error}</div>}
</div>
</div>
  );
}

 