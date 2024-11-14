import React, { useState } from "react";
import EnrichmentForm from "../components/EnrichmentForm";
import EnrichedData from "../components/EnrichedData";
import { useUser } from "../contexts/userContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { redirect } from "react-router-dom";


const Dashboard = () => {
  const { user } = useUser();
  const [result, setResult] = useState(null);

  useState(() => {
    if (!user) {
      signOut(auth).then(() => {
        redirect("/");
      });
    }
  }, []);

  return (
    <section className="bg-[url('https://img.freepik.com/free-vector/abstract-banner-with-network-communications-design-with-connecting-lines-dots_1048-20185.jpg')] py-10 flex flex-col gap-10 w-full">
      <EnrichmentForm setResult={setResult} />
      <EnrichedData data={result} />
    </section>
  );
};

export default Dashboard;
