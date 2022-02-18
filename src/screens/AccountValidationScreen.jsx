import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const AccountValidationScreen = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("t");

  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/auth/validate", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      const text = await response.text();
      const data = await text.toJson();
      setMessage({
        color: data.completed ? "alert-success" : "alert-danger",
        text: data.message,
      });
      if (data.completed) {
        setTimeout(() => navigate("/login"), 4000);
        // document
        //   .querySelector(".alert")
        //   .addEventListener("closed.bs.alert", function () {
        //     navigate("/login");
        //   });
      }
    };
    fetchData().catch(console.error);
  },[]);

  return (
    <>
      <h1>AccountValidationScreen</h1>
      {message && (
        <div
          className={`alert ${message.color} alert-dismissible fade show mt-1`}
          role="alert"
        >
          {message.text}
          {/* <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button> */}
        </div>
      )}
    </>
  );
};

export default AccountValidationScreen;
