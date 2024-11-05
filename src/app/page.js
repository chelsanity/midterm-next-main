"use client"; // enables react strict mode for client components

import { useState } from "react";
import localFont from "next/font/local";
import "./globals.css"; // Import global styles

// Font setup
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const [characterData, setCharacterData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCharacterData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.disneyapi.dev/character");
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      const data = await response.json();
      setCharacterData(data.data.sort(() => 0.5 - Math.random()).slice(0, 6)); // Show 6 characters
    } catch (error) {
      console.error("Error fetching character data:", error);
      setCharacterData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ backgroundColor: '#1a1a1a' }} // Dark grey color
      className={`min-h-screen p-8 ${geistSans.variable} ${geistMono.variable}`}
    >
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-white">Your Favourite Disney Characters!</h1>
        <p className="text-white mb-4 italic">Once Upon A Midterm — Chelsea Woo</p>
        <div>
          <button
            style={{ backgroundColor: '#D35C84' }} // Inline style for custom color
            className="text-white font-semibold py-2 px-4 rounded-full mr-2 hover:bg-pink-600"
            onClick={fetchCharacterData}
          >
            See Disney Characters!
          </button>
          <button
            className="bg-transparent border border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-2 px-4 rounded-full"
            onClick={() => setCharacterData([])}
          >
            Clear Characters
          </button>
        </div>
      </header>
      {loading ? (
        <div className="text-center text-white">Making Magic Happen, Just a Moment!</div>
      ) : characterData.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {characterData.map((character, i) => (
            <li key={i} className="flex flex-col justify-between rounded-lg shadow-lg overflow-hidden bg-gray-800">
              {character.imageUrl ? (
                <img
                  src={character.imageUrl}
                  alt={character.name}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gray-700 flex items-center justify-center">
                  <p className="text-sm italic text-white">Hakuna matata—nothing to see!</p>
                </div>
              )}
              <div style={{ backgroundColor: '#D35C84' }} className="text-white p-4 h-24">
                <h1 className="font-bold text-lg">{character.name}</h1>
                <p className="text-sm">
                  {character.films.length > 0
                    ? `Films: ${character.films.join(", ")}`
                    : character.tvShows.length > 0
                    ? `TV Shows: ${character.tvShows.join(", ")}`
                    : "No films or TV shows listed"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-white mt-4">Your Disney pals are napping! Wake them up by clicking the button!</div>
      )}
    </div>
  );
}
