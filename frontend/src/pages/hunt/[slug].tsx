import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function Hunt() {
  const router = useRouter();
  const { slug } = router.query;
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [matched, setMatched] = useState<boolean>(false);

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => setAddress(event.target.value);
  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => setPhoto(event.target.files?.[0] || null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    const formData = new FormData();
    formData.append("address", address);
    formData.append("huntId", slug as string | Blob);
    if (photo) {
      formData.append("photo", photo);
    }
    // Send the form data to the Next.js API for processing
    const response = await fetch("/api/submit-photo", {
      method: "POST",
      body: formData,
    });

    console.log("Response: ", response);

    if (!response.ok) {
      console.error("Response: ", response.statusText);
      setSubmitting(false);
      return;
    } else {
      const result = await response.json();
      const isMatched: boolean = result.result;
      console.log("Response: ", response);
      console.log("isMatched: ", isMatched);
      setMatched(isMatched);
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <Layout title="Submit Photo">
      <div className="container-centered">
        <h1 className="text-5xl font-extrabold font-bangers text-gray-50 mb-6 tracking-tighter">SUBMIT PHOTO</h1>
        {submitted ? (
          <div className="pt-8 bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto flex flex-col items-center">
            {matched ? (
              <>
                <FaCheck className="text-6xl text-green-500 mb-4" />
                <p className="text-xl font-semibold text-gray-800">It's a match!</p>
              </>
            ) : (
              <>
                <FaTimes className="text-6xl text-red-500 mb-4" />
                <p className="text-xl font-semibold text-gray-800">No match</p>
              </>
            )}
          </div>
        ) : (
          <div className="pt-8 bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
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
                <label htmlFor="photo" className="block text-gray-700 font-bold mb-2">
                  Object Photo:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  id="photo"
                  onChange={handlePhotoChange}
                  className="leading-loose text-gray-700"
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
