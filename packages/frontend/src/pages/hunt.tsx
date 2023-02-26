import { useState, ChangeEvent, FormEvent } from "react";
import Layout from "../components/Layout";

export default function Hunt() {
  const [name, setName] = useState("");
  const [endTime, setEndTime] = useState("");
  const [prize, setPrize] = useState("");
  const [objectPhoto, setObjectPhoto] = useState<File | null>(null);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value);
  const handleEndTimeChange = (event: ChangeEvent<HTMLInputElement>) => setEndTime(event.target.value);
  const handlePrizeChange = (event: ChangeEvent<HTMLInputElement>) => setPrize(event.target.value);
  const handleObjectPhotoChange = (event: ChangeEvent<HTMLInputElement>) =>
    setObjectPhoto(event.target.files?.[0] || null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("endTime", endTime);
    formData.append("prize", prize);
    if (objectPhoto) {
      formData.append("objectPhoto", objectPhoto);
    }

    // Send the form data to the Next.js API for processing
    const response = await fetch("/api/scavenger-hunt", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      console.error(response.statusText);
      return;
    }
  };

  return (
    <Layout title="Add New Hunt">
      <div className="mb-4">
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Hunt Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="endTime" className="block text-gray-700 font-bold mb-2">
              End Time:
            </label>
            <input
              type="datetime-local"
              id="endTime"
              value={endTime}
              onChange={handleEndTimeChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="prize" className="block text-gray-700 font-bold mb-2">
              Prize:
            </label>
            <input
              type="text"
              id="prize"
              value={prize}
              onChange={handlePrizeChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="objectPhoto" className="block text-gray-700 font-bold mb-2">
              Object Photo:
            </label>
            <input type="file" id="objectPhoto" onChange={handleObjectPhotoChange} className="leading-loose" />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
