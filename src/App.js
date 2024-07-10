import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [triggerConvert, setTriggerConvert] = useState(false);

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
    },
    [amount, fromCur, toCur, triggerConvert]
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={amount}
          onChange={handleInputChange}
          disabled={isLoading}
        />
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
        ➡️
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
        <button type="submit" disabled={isLoading}>
          Convert
        </button>
      </form>

      <p>{isLoading ? "Loading..." : `${converted} ${toCur}`}</p>
    </div>
  );
}
