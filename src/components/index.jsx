import React, { useState } from "react";
import whatsapptext from "../logo/whatsapptext.png";
import QRCode from "react-qr-code";
import { Outlet, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Box() {
  const url = "https://api.whatsapp.com/send/?phone=91";
  const [inputValue, setInputValue] = useState("");
  const [phnNum, setPhnNum] = useState(null);
  const [prevNum, setPrevNum] = useState(null);

  const location = useLocation();
  const { testValue } = location.state || {};
  //handleAdd(testValue);
  useEffect(() => {
    delcache();
  }, []);

  function delcache() {
    if (testValue == null) {
      console.log("testingggggggggggggggggg null");
      // setInputValue("");
      // setPhnNum(null);
      handleClick();
    } else if (testValue !== null) {
      console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
      handleAdd(testValue);
    }
  }

  const handleChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      if (value.length < 10) {
        setInputValue(value);
        setPhnNum(null);
      } else if (value.length === 10) {
        //setInputValue(value);
        //setPhnNum(url + inputValue);
        console.log(value);
        handleAdd(value);

        //console.log(phnNum);
      } else {
        alert("Input cannot exceed 10 numbers");
      }
    }
  };

  async function handleAdd(value) {
    try {
      const response = await fetch(
        `http://localhost:4100/add?number=${value}`,
        {
          method: "GET",
          //mode: "no-cors",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        //fetchData(); // Refresh the data after adding
        //console.log("the vlaue is " + value);
        setInputValue(value);
        setPhnNum(url + value);
        // console.log("the url " + url);
        // console.log("the url with num " + phnNum);
        //console.error("Add failed:", response.statusText);
      }
    } catch (err) {
      console.log("error");
      console.error("Add error:", err);
    }
  }

  function handleClick() {
    setInputValue("");
    setPhnNum(null);
    //setPrevNum(null);
  }

  function handleHistory() {}

  return (
    <>
      <div className="bg-[#25D366] min-h-dvh pt-8">
        <div className="border w-96 min-h-96 mx-auto rounded-lg bg-[white] flex flex-col items-center my-4 shadow-2xl shadow-[#20b778] ">
          <div className="border w-full min-h-12 rounded-t-lg bg-[#DBE0E3] ">
            <div className="float-left">
              <button
                className="font-bold border text-white bg-[#25D366] mt-2 ml-2 w-20 rounded-lg py-auto"
                onClick={handleClick}
              >
                Reset
              </button>
            </div>
            <div className="float-right flex flex-row-reverse pt-0">
              {/*<div className=" w-4 h-4 bg-[#FE9247] border rounded-full mx- auto mr-2"></div>
            <div className=" w-4 h-4 bg-[#FD383F] border rounded-full mx- auto mr-1"></div>
            <div className=" w-4 h-4 bg-[#2DDAC7] border rounded-full mx- auto mr-1"></div>
            <button
              className="font-bold border text-white bg-[#25D366] mt-2 ml-2 w-20 rounded-lg py-auto"
              onClick={handleHistory}
            >
              History
            </button>*/}
              <Link
                to="/history"
                className="font-bold border text-white bg-[#25D366] mt-2 mx-2 w-20 rounded-lg pl-2"
              >
                History
              </Link>
            </div>
          </div>
          <img src={whatsapptext} className=" object-cover h-12 w-30 mt-4" />
          <PhoneInput></PhoneInput>
          <input
            className="border-2 border-[#20B794] rounded-lg mt-6 "
            placeholder="Enter the Number"
            type="text"
            value={inputValue}
            onChange={handleChange}
          />
          {phnNum != null ? (
            <>
              <div className="mt-4 font-bold">Scan the Below QR code </div>
              <QRCode value={phnNum} className=" h-40 mt-2 mb-2" />

              <a className="font-bold" href={phnNum}>
                Click here for the Link
              </a>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
