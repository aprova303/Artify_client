import React, { useState, useEffect } from "react";
import ArtsCard from "../pages/ArtsCard";
import { useLoaderData, useParams } from "react-router";

const Home = () => {
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);
  const data = useLoaderData();
  // const {artsId} = useParams()

  useEffect(() => {
    fetch("http://localhost:3000/arts")
      .then((res) => res.json())
      .then((data) => {
        setArts(data);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        console.error("Error fetching arts:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="w-full h-full bg-center flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {arts.map((art) => (
            <ArtsCard key={art._id} art={art}></ArtsCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
