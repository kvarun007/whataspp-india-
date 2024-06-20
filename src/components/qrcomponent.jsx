import { data } from "autoprefixer";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

export default function History() {
  const [apiData, setApiData] = useState(null);
  async function fetchData() {
    try {
      const response = await fetch("http://localhost:4100/", {
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();
      //console.log(data.message);
      //console.log(data);
      setApiData(data);
      console.log(data);
      console.log(data[0]);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  async function handleDelect() {
    try {
      const response = await fetch("http://localhost:4100/delete", {
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setApiData(null);
        //window.history.back();
      } else {
        console.error("Delete failed:", response.statusText);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="bg-[#ACE1AF] min-h-dvh pt-8">
        <div className="border w-96 min-h-96 mx-auto rounded-lg bg-[white] flex flex-col items-center my-4 shadow-2xl shadow-[#20b778] border-[white]">
          <div className="border w-full min-h-12 rounded-t-lg bg-[#BFF6C3] border-[#BFF6C3]">
            <div className="float-left">
              <button
                className="font-bold border text-white bg-[#25D366] mt-2 ml-2 w-32 rounded-lg py-auto"
                onClick={handleDelect}
              >
                Delect History
              </button>
            </div>
            <div className="float-right">
              {/*<div className=" w-4 h-4 bg-[#FE9247] border rounded-full mx- auto mr-2"></div>
              <div className=" w-4 h-4 bg-[#FD383F] border rounded-full mx- auto mr-1"></div>
              <div className=" w-4 h-4 bg-[#2DDAC7] border rounded-full mx- auto mr-1"></div>*/}
              <Link to="/" state={{ testValue: null }}>
                <button className="font-bold border text-white bg-[#25D366] mt-2 mx-2 w-20 rounded-lg py-auto">
                  Back
                </button>
              </Link>
            </div>
          </div>
          {apiData != null ? (
            apiData.length == 0 ? (
              <p className="font-bold pt-6">No history found </p>
            ) : (
              apiData.toReversed().map((items) => (
                <p className="border my-1 w-72 py-1 rounded-md font-bold flex flex-col items-center   border-[#25D366]">
                  <Link to="/" state={{ testValue: items.number }}>
                    {items.number}
                  </Link>
                </p>
              ))
            )
          ) : (
            <p className="font-bold pt-6">No history found </p>
          )}
        </div>
      </div>
    </>
  );
}
