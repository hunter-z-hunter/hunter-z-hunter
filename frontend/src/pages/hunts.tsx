import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { huntsDocument, huntsQuery, execute } from "../../.graphclient";
import { ethers } from "ethers";
import { useMemo } from "react";

export default function Hunts() {
  const [data, setData] = useState<huntsQuery>();
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    execute(huntsDocument, {}).then((result) => {
      setData(result?.data);
    });
  }, [setData]);

  useMemo(() => {
    if (data?.huntAddeds) {
      const interval = setInterval(() => {
        const currentTime = new Date().getTime() / 1000;
        const newHunts = data.huntAddeds.map((hunt) => {
          const timeLeft = Math.max(hunt.endTime - currentTime, 0);
          return {
            ...hunt,
            timeLeft,
          };
        });
        setData({
          ...data,
          huntAddeds: newHunts,
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [data, setData]);

  const formatTime = (time: number) => {
    const days = Math.floor(time / (24 * 60 * 60));
    const hours = Math.floor((time % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((time % (60 * 60)) / 60);
    const seconds = Math.floor(time % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <Layout title="Hunter Z Hunter">
      <div className="container-centered">
        <h1 className="text-5xl font-extrabold font-bangers text-gray-50 mb-6 tracking-tighter">HUNTS</h1>
        {/* <p className="text-lg mb-4">Come find me sucka!</p> */}
        {data?.huntAddeds.map((hunt, index) => (
          <div key={hunt.huntId} className=" bg-gray-50  rounded-lg shadow-lg p-6 mb-4 mx-4 w-[340px]">
            <div className="flex items-start mb-4">
              <div className="bg-brandblue-500 text-white rounded-full p-3">
                <svg
                  className="align-top"
                  width="50px"
                  height="50px"
                  viewBox="-0.5 0 46 46"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs></defs>
                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Artboard" transform="translate(-628.000000, -741.000000)">
                      <g id="011-Treasure" transform="translate(628.000000, 741.000000)">
                        <path
                          d="M17.763,2.1341 C13.851,1.7411 11.254,2.6021 8.615,4.6301 C-0.567,11.6841 3.862,32.9021 4.709,34.7501 C5.965,37.4911 23.742,45.1861 26.888,45.4941 C30.035,45.8021 42.043,14.3411 42.043,14.3411 C42.043,14.3411 25.426,2.9041 17.763,2.1341"
                          id="Fill-1362"
                          fill="#9A5F5F"
                        ></path>
                        <path
                          d="M36.9991,13.6965 C22.8071,19.5395 25.8871,44.9935 26.8881,45.4945 C27.8891,45.9945 40.5191,39.3895 41.0191,38.7345 C41.5201,38.0805 50.5011,8.1375 36.9991,13.6965"
                          id="Fill-1364"
                          fill="#C27D78"
                        ></path>
                        <path
                          d="M36.4779,13.9304 C39.3339,12.5744 41.2079,12.8724 42.4199,14.0574 L42.4259,14.0544 C42.4259,14.0544 40.5509,10.8614 37.1229,10.8614 C33.9619,10.8614 24.5019,14.2644 22.9999,31.7084 C22.9999,31.7084 14.2849,27.5884 11.2989,26.0094 C8.3129,24.4294 2.5969,20.9154 2.5969,20.9154 C2.5969,20.9154 1.3969,1.3254 17.7629,2.1344 C17.7629,2.1344 15.3659,0.6354 13.0059,0.7094 C-1.5401,1.1624 0.2419,22.8904 0.2419,22.8904 C0.2419,22.8904 5.2089,27.1254 11.7939,30.3604 C18.9999,33.9004 27.2749,36.6074 27.2749,36.6074 C26.1189,35.9144 26.4149,18.7094 36.4779,13.9304"
                          id="Fill-1366"
                          fill="#F1A969"
                        ></path>
                        <path
                          d="M2.5969,20.9151 L4.2849,20.3101 C4.2849,20.3101 2.5969,5.9081 17.7629,2.1341 C1.3969,1.3251 2.5969,20.9151 2.5969,20.9151"
                          id="Fill-1368"
                          fill="#F7BF6D"
                        ></path>
                        <path
                          d="M23.0001,31.7083 L23.2001,29.8173 L4.2851,20.3103 L2.5971,20.9153 C2.5971,20.9153 8.3131,24.4293 11.2991,26.0093 C14.2841,27.5883 23.0001,31.7083 23.0001,31.7083"
                          id="Fill-1370"
                          fill="#FBDF89"
                        ></path>
                        <path
                          d="M39.9739,26.1145 C33.9079,29.6415 28.8179,31.3915 28.8179,31.3915 C28.8179,31.3915 29.7369,32.2675 30.4909,32.2695 C32.6249,32.2735 41.1999,27.3495 41.5329,26.4965 L39.9739,26.1145 Z"
                          id="Fill-1372"
                          fill="#F7BF6D"
                        ></path>
                        <path
                          d="M40.4423,17.3908 C40.4423,17.3908 41.2823,21.4118 39.9743,26.1148 L41.5333,26.4968 C41.5333,26.4968 43.4283,19.1618 40.4423,17.3908"
                          id="Fill-1374"
                          fill="#F1A969"
                        ></path>
                        <path
                          d="M41.5328,26.4967 C41.1728,27.1137 31.2008,32.8007 30.2568,32.2337 C29.3568,31.6937 31.1108,20.6817 37.0028,17.6777 C43.7698,14.2277 41.8928,25.8797 41.5328,26.4967 M36.4778,13.9307 C26.4148,18.7087 25.9268,35.8667 27.0818,36.5607 C28.2938,37.2867 43.1008,29.3977 43.5638,28.6067 C44.0258,27.8147 47.4528,8.7187 36.4778,13.9307"
                          id="Fill-1376"
                          fill="#FBDF89"
                        ></path>
                        <path
                          d="M16.4307,32.4809 L15.8357,38.1959 C15.8357,38.1959 17.1377,37.8119 17.5757,37.3119 C18.0127,36.8109 17.8537,33.0809 17.8537,33.0809 L16.4307,32.4809 Z"
                          id="Fill-1378"
                          fill="#FBDF89"
                        ></path>
                        <path
                          d="M8.7737,28.7536 C8.7737,28.7536 8.6367,34.1346 9.1757,34.9816 C9.7147,35.8286 15.2967,38.5806 15.8357,38.1956 C16.3747,37.8106 16.4307,32.4806 16.4307,32.4806 L8.7737,28.7536 Z"
                          id="Fill-1380"
                          fill="#F1A969"
                        ></path>
                        <path
                          d="M13.152,35.6534 L12.949,34.0314 C13.12,33.9994 13.283,33.9384 13.41,33.8114 C13.788,33.4334 13.737,32.7674 13.294,32.3244 C12.851,31.8824 12.186,31.8304 11.807,32.2084 C11.428,32.5874 11.48,33.2534 11.923,33.6954 C11.949,33.7214 11.981,33.7324 12.008,33.7564 L11.526,34.8184 L13.152,35.6534 Z"
                          id="Fill-1382"
                          fill="#4E433A"
                        ></path>
                        <polygon
                          id="Fill-1384"
                          fill="#7F5253"
                          points="4.59 15.3477 4.392 16.5667 21.423 24.3187"
                        ></polygon>
                        <polygon
                          id="Fill-1386"
                          fill="#7F5253"
                          points="6.5085 10.0889 5.9615 11.1389 23.2005 18.9849"
                        ></polygon>
                        <polygon
                          id="Fill-1388"
                          fill="#7F5253"
                          points="10.2982 5.6616 9.3452 6.4856 26.4702 14.2796"
                        ></polygon>
                        <polygon
                          id="Fill-1390"
                          fill="#7F5253"
                          points="14.963 3.0182 13.758 3.5342 30.585 11.3432"
                        ></polygon>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <div className="ml-3">
                <h2 className="font-bangers text-2xl font-semibold text-gray-900 tracking-tighter">{hunt.name}</h2>
                <p className="text-gray-700 text-sm mb-4">{hunt.description}</p>
                <p>Prize: {ethers.utils.formatEther(hunt.prize)} ETH</p>
                <p className="mb-4 font-semibold">{formatTime((hunt as any).timeLeft)} left</p>
                <a href={`/hunt/${hunt.huntId}`} className="btn">
                  Submit Photo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
