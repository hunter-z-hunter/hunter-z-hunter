import { useState, ChangeEvent, FormEvent } from "react";
import Layout from "../../components/Layout";

export default function Hunt() {
  const [address, setAddress] = useState("");
  const [objectPhoto, setObjectPhoto] = useState<File | null>(null);
  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => setAddress(event.target.value);
  const handleObjectPhotoChange = (event: ChangeEvent<HTMLInputElement>) =>
    setObjectPhoto(event.target.files?.[0] || null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("address", address);
    if (objectPhoto) {
      formData.append("objectPhoto", objectPhoto);
    }

    // Send the form data to the Next.js API for processing
    const response = await fetch("/api/process-image", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      console.error(response.statusText);
      return;
    }
  };

  return (
    <Layout title="Submit Photo">
      <div className="pt-8">
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="prize" className="block text-gray-700 font-bold mb-2">
              Address:
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={handleAddressChange}
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
