import { useState, useEffect } from "react";
import BgAnimation from "./BgAnimation";

import "./App.css";

function App() {
  const [returnPayment, setReturnPayment] = useState(0);

  const [data, setData] = useState({
    billAmount: 0,
    cashGiven: 0,
  });
  const [btnInVisible, setBtnInVisible] = useState(false);
  const [error, setError] = useState();
  // Rupees
  let [thousand, setThousand] = useState(0);
  let [fiveHundred, setFiveHundred] = useState(0);
  let [hundred, setHundred] = useState(0);
  let [fifty, setFifty] = useState(0);
  let [twenty, setTwenty] = useState(0);
  let [ten, setTen] = useState(0);
  let [five, setFive] = useState(0);
  let [one, setOne] = useState(0);

  useEffect(() => {
    setOne(0);
    setFive(0);
    setTen(0);
    setTwenty(0);
    setFifty(0);
    setHundred(0);
    setFiveHundred(0);
    setThousand(0);
    setReturnPayment(0);
    setBtnInVisible(false);
  }, [data]);

  const calculation = (returnPayment) => {
    for (let i = 0; i <= returnPayment; i--) {
      if (returnPayment <= 0) {
        return;
      } else {
        if (returnPayment >= 1000) {
          setThousand((thousand += 1));
          returnPayment -= 1000;
        } else if (returnPayment >= 500) {
          setFiveHundred((fiveHundred += 1));
          returnPayment -= 500;
        } else if (returnPayment >= 100) {
          setHundred((hundred += 1));
          returnPayment -= 100;
        } else if (returnPayment >= 50) {
          setFifty((fifty += 1));
          returnPayment -= 50;
        } else if (returnPayment >= 20) {
          setTwenty((twenty += 1));
          returnPayment -= 20;
        } else if (returnPayment >= 10) {
          setTen((ten += 1));
          returnPayment -= 10;
        } else if (returnPayment >= 5) {
          setFive((five += 1));
          returnPayment -= 5;
        } else if (returnPayment >= 1) {
          setOne((one += 1));
          returnPayment -= 1;
        }
      }
    }
  };

  const handleCheck = () => {
    const { cashGiven, billAmount } = data;

    if (cashGiven < billAmount) {
      setError("Given Cash is less than Bill Amount! Pay more");
      return;
    }

    if (cashGiven < 0 || billAmount < 0) {
      setError("Given Cash & Bill Amount not less than 0!");
      return;
    }

    if (cashGiven.toString().length > 9 || billAmount.toString().length > 9) {
      setError(
        "Given Cash & Bill Amount less than or equal to 10 digit & not equal to e"
      );
      return;
    }

    if (billAmount && cashGiven) {
      let returnPayment = cashGiven - billAmount;
      setReturnPayment(returnPayment);
      calculation(returnPayment);
      setBtnInVisible(true);
    } else {
      setError("Please enter Bill Amount & Cash Given first!");
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    setError("");
    setBtnInVisible(false);

    data[input.name] = parseFloat(input.value);
    let oldData = { ...data };
    setData(oldData);
  };

  return (
    <>
      <div className="App">
        <h1>Bill Collecting System</h1>
        <h4>Enter the Bill amount and cash given by customer</h4>
        <div>
          <input
            type="number"
            name="billAmount"
            placeholder="Bill Amount"
            onChange={handleChange}
          />
          <br />
          <input
            type="number"
            name="cashGiven"
            placeholder="Cash Given"
            onChange={handleChange}
          />
          <hr />
          <button
            className="action-button shadow animate blue"
            disabled={btnInVisible}
            onClick={handleCheck}
          >
            Check
          </button>
          <h4>Return:{returnPayment}</h4>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>

        <table className="styled-table">
          <thead>
            <tr>
              <th>Note Value</th>
              <th>1000</th>
              <th>500</th>
              <th>100</th>
              <th>50</th>
              <th>20</th>
              <th>10</th>
              <th>5</th>
              <th>1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>No. of Notes</b>
              </td>
              <td>{thousand}</td>
              <td>{fiveHundred}</td>
              <td>{hundred}</td>
              <td>{fifty}</td>
              <td>{twenty}</td>
              <td>{ten}</td>
              <td>{five}</td>
              <td>{one}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="animatePic">
        <BgAnimation />
      </div>
    </>
  );
}

export default App;
