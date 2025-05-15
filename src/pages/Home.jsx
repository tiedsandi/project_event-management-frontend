/* eslint-disable react-refresh/only-export-components */

import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Link, useLoaderData } from "react-router-dom";

import { Carousel } from "react-responsive-carousel";
import { getAuthToken } from "../utils/auth";

export default function HomePage() {
  const { events, myEvents, isLoggedIn, totalEvents } = useLoaderData();

  return (
    <div className="px-4 py-6 space-y-10 max-w-6xl mx-auto">
      {/* Welcome Section */}
      <section className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to Ement</h1>
        <p className="text-gray-600">
          Discover and manage your events easily with our powerful platform.
        </p>
      </section>

      {/* Featured Event */}
      {events.length > 0 && (
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          showStatus={false}
          interval={3000}
          className="rounded-xl overflow-hidden shadow-lg"
        >
          {events.map((item) => (
            <Link to={`/events/${item._id}`} key={item._id} className="group">
              <div className="relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-[400px] w-full object-cover group-hover:opacity-90 transition"
                />
                <div className="absolute bottom-0 left-0 w-full pb-8 bg-black/60 text-white p-4 space-y-1">
                  <h2 className="text-2xl font-bold">{item.title}</h2>
                  <p>📍 {item.location}</p>
                  <p>📅 {new Date(item.date).toLocaleDateString("id-ID")}</p>
                  <p>👥 {item.registerCount ?? 0} participants</p>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      )}

      {/* Statistics Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-100 p-5 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-bold mb-2">📊 Total Events</h3>
          <p className="text-2xl font-semibold text-blue-700">{totalEvents}</p>
          <p className="text-gray-600 text-sm mt-1">
            Events available on our platform
          </p>
        </div>

        {isLoggedIn ? (
          <div className="bg-green-100 p-5 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-2">🎟️ My Events</h3>
            <p className="text-2xl font-semibold text-green-700">
              {myEvents.length}
            </p>
            <p className="text-gray-600 text-sm mt-1">
              Events you are organizing or attending
            </p>
          </div>
        ) : (
          <div className="bg-yellow-100 p-5 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-2">🔐 Get Started</h3>
            <p className="text-gray-700 mb-3">
              Sign in to manage and join events
            </p>
            <Link
              to="/login"
              className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
            >
              Login / Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export async function loaderHome() {
  const token = getAuthToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  try {
    const allEventsRes = await fetch(
      `https://projectevent-management-backend-production.up.railway.app/events`
    );
    const allEventsData = await allEventsRes.json();

    let myEvents = [];
    let isLoggedIn = false;

    if (token) {
      isLoggedIn = true;
      const myEventsRes = await fetch(
        `https://projectevent-management-backend-production.up.railway.app/events/my-events`,
        { headers }
      );
      myEvents = await myEventsRes.json();
    }

    const events = allEventsData.results?.slice(0, 3) || [];
    const totalEvents = allEventsData.total_results || 0;

    return { events, myEvents, isLoggedIn, totalEvents };
  } catch (err) {
    console.error("Failed to load home data:", err);
    return { event: null, myEvents: [], isLoggedIn: !!token, totalEvents: 0 };
  }
}
