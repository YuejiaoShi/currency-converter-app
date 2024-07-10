import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");

  useEffect(function () {
    async function convert() {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
      );
      const data = await res.json();
      setConverted(data.rates[toCur])
    }
    convert();
  }, []);

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(event) => setAmount(Number(event.target.value))}
      />
      <select
        value={fromCur}
        onChange={(event) => setFromCur(Number(event.target.value))}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCur}
        onChange={(event) => setToCur(Number(event.target.value))}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {converted}
        {toCur}
      </p>
    </div>
  );
}
