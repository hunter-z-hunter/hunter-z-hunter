import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { huntsDocument, huntsQuery, execute } from "../../.graphclient";
import { ethers } from "ethers";
import { useMemo } from "react";

export default function Home() {
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
      <div className="flex flex-col items-center justify-center mt-6">
        <h1 className="text-2xl font-bold mb-2">HZH Hunts</h1>
        <p className="text-lg mb-4">Come find me sucka!</p>
        {data?.huntAddeds.map((hunt) => (
          <div key={hunt.huntId} className="w-96 border p-4 mb-4">
            <div>
              <a href={`/hunt/${hunt.huntId}`} className="text-lg font-bold">
                {hunt.name}
              </a>
            </div>
            <div className="text-gray-500 text-sm mb-2">{ethers.utils.formatEther(hunt.prize)} ETH</div>
            <div className="text-gray-500 text-sm mb-8">{formatTime(hunt.timeLeft)} left</div>
            <a
              href={`/hunt/${hunt.huntId}`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit Photo
            </a>
          </div>
        ))}
      </div>
    </Layout>
  );
}
