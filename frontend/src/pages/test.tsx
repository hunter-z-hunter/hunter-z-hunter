import { useState, ChangeEvent, FormEvent } from "react";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout title="Hunter Z Hunter">
      <div className="container-centered">
        <h1 className="text-5xl font-extrabold font-bangers text-gray-50 mb-4 tracking-tighter">TESTS</h1>
        <p className="mb-8 text-gray-300 text-xl ">Z is the new X</p>
      </div>
    </Layout>
  );
}
