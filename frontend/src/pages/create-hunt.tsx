import { useState, ChangeEvent, FormEvent } from "react";
import Layout from "../components/Layout";
import { FaCheck } from "react-icons/fa";

export default function CreateHunt() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [endTime, setEndTime] = useState("");
  const [prize, setPrize] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value);
  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value);
  const handleEndTimeChange = (event: ChangeEvent<HTMLInputElement>) => setEndTime(event.target.value);
  const handlePrizeChange = (event: ChangeEvent<HTMLInputElement>) => setPrize(event.target.value);
  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => setPhoto(event.target.files?.[0] || null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("endTime", endTime);
    formData.append("prize", "0.00001"); // Hard code small amount for now
    if (photo) {
      formData.append("photo", photo);
    }

    // Send the form data to the Next.js API for processing
    const response = await fetch("/api/create-hunt", {
      method: "POST",
      body: formData,
    });
    setSubmitting(false);
    if (!response.ok) {
      console.error(response.statusText);
      return;
    }
    setSubmitted(true);
  };

  return (
    <Layout title="Create Hunt">
      <div className="container-centered">
        <h1 className="text-5xl font-extrabold font-bangers text-gray-50 mb-6 tracking-tighter">CREATE HUNT</h1>
        {submitted ? (
          <div className="pt-8 bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto flex flex-col items-center">
            <FaCheck className="text-6xl text-green-500 mb-4" />
            <p className="text-xl font-semibold text-gray-800">Hunt submitted successfully!</p>
          </div>
        ) : (
          <div className="pt-8 rounded-lg shadow-lg p-6 max-w-lg mx-auto bg-gray-50">
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
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                  Hints:
                </label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={handleDescriptionChange}
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
                <label htmlFor="photo" className="block text-gray-700 font-bold mb-2">
                  Object Photo:
                </label>
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  capture="environment"
                  onChange={handlePhotoChange}
                  className="leading-loose"
                />
              </div>

              <div className="flex items-center justify-center">
                <button type="submit" className="btn focus:outline-none focus:shadow-outline">
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
}
