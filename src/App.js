import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [triggerConvert, setTriggerConvert] = useState(false);
  const [date, setDate] = useState("");
  const [showDate, setShowDate] = useState(false);

  useEffect(
    function () {
      async function convert() {
        setIsLoading(true);
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
          );
          const data = await res.json();
          setConverted(data.rates[toCur]);
          setDate(data.date);
          setShowDate(true);
        } catch (error) {
          console.error("Error fetching conversion rate:", error);
          setConverted("Error");
        } finally {
          setIsLoading(false);
        }
      }
      if (fromCur === toCur) {
        setConverted(amount);
      } else if (triggerConvert) {
        convert();
      }

      if (showDate) {
      }
    },
    [amount, fromCur, toCur, triggerConvert, showDate]
  );

  function handleSubmit(event) {
    event.preventDefault();
    setTriggerConvert(!triggerConvert);
  }

  function handleInputChange(event) {
    setAmount(Number(event.target.value));
    setTriggerConvert(false);
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            type="text"
            value={amount}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>
        <div className="selection">
          <select
            value={fromCur}
            onChange={(event) => setFromCur(event.target.value)}
            disabled={isLoading}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
          </select>
          <span className="convert-arrow">➡️</span>
          <select
            value={toCur}
            onChange={(event) => setToCur(event.target.value)}
            disabled={isLoading}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
          </select>
        </div>

        <button type="submit" disabled={isLoading}>
          Convert
        </button>
      </form>

      <p className="output">
        {isLoading ? "Loading..." : `${converted} ${toCur}`}
      </p>
      <i className="date">{showDate ? `Last updated at ${date}` : ""}</i>
    </div>
  );
}
