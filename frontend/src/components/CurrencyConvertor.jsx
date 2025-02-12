import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdSwap } from "react-icons/io";

export const CurrencyConvertor = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [singleCurrency, setSingleCurrency] = useState(null);

  const apiUrl = import.meta.env.VITE_CURRENCY_API_URL;
  const backendUrl = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(`${apiUrl}`);
        const currencyCodes = Object.keys(response.data.rates);
        setCurrencies(currencyCodes);
      } catch (error) {
        alert("Error in fetching currencies:", error);
        console.error("Error fetching currencies:", error);
        alert();
      }
    };
    fetchCurrencies();
  }, []);

  // Converting the currency

  const handleConvert = async () => {
    if (!fromCurrency || !toCurrency || !amount) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/currency_convertor/convert`,
        {
          from: fromCurrency,
          to: toCurrency,
          amount: parseFloat(amount),
        }
      );

      await getSingleCurrency();

      setConvertedAmount(response.data.convertedAmount);
    } catch (error) {
      console.error("Error during conversion:", error);
      alert("Failed to convert currency. Please try again.");
    }
  };

  // Fetching single currency value
  const getSingleCurrency = async () => {
    if (!fromCurrency || !toCurrency || !amount) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/currency_convertor/convert`,
        {
          from: fromCurrency,
          to: toCurrency,
          amount: parseFloat(1),
        }
      );

      setSingleCurrency(response.data.convertedAmount);
    } catch (error) {
      console.error("Error during conversion:", error);
    }
  };

  // Swapping the currency
  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <>
      <div className="h-screen">
        {/* Header */}
        <div className="text-center p-5 bg-[#2FE6CC]">
          <h1 className="text-4xl font-bold">Currency Convertor</h1>
        </div>

        {/* Currency Convertor */}
        <div className="flex justify-center items-center w-full">
          <div className="main  mt-28 w-full mx-4 md:w-2/4 p-10 border-1 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] rounded-md bg-[#e9fffb]">
            <div className="w-full flex flex-col gap-6">
              <p className=" font-bold">Choose Currency: </p>
              <div className="flex gap-5 w-full">
                <select
                  name="from currency"
                  id="from-currency"
                  placeholder="select currency"
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="border-2 px-2 py-1.5 w-1/2 rounded-md focus:outline-3 focus:outline-[#2FE6CC] focus:border-none"
                >
                  {currencies.map((currency) => {
                    return (
                      <option value={currency} key={currency}>
                        {currency}
                      </option>
                    );
                  })}
                </select>
                <button className="cursor-pointer" onClick={handleSwap}>
                  <IoMdSwap />
                </button>

                <select
                  name="from currency"
                  id="to-currency"
                  placeholder="select currency"
                  className="border-2 px-2 py-1.5 w-1/2 rounded-md focus:outline-3  focus:outline-[#2FE6CC] focus:border-none"
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                >
                  {currencies.map((currency) => {
                    return (
                      <option value={currency} key={currency}>
                        {currency}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="border-2 rounded-md">
                <input
                  type="number"
                  name="from"
                  id="from"
                  placeholder="From"
                  className="w-full focus:outline-none p-2"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="flex justify-center w-1/2 mx-auto">
                <button
                  onClick={handleConvert}
                  className="bg-[#2FE6CC] py-2.5 w-full border rounded-md font-bold text-md hover:border-2 border-[#2FE6CC] hover:bg-transparent cursor-pointer"
                >
                  Convert
                </button>
              </div>
              {singleCurrency && (
                <div>
                  <p className="text-center font-bold">
                    Converted Amount: 1 {fromCurrency} ={" "}
                    {singleCurrency.toFixed(2)} {toCurrency}
                  </p>
                </div>
              )}

              {convertedAmount && (
                <div>
                  <p className="text-center font-bold">
                    Converted Amount: {amount} {fromCurrency} ={" "}
                    {convertedAmount.toFixed(2)} {toCurrency}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
