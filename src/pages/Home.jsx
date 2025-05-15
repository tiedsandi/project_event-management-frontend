/* eslint-disable react-refresh/only-export-components */

import { Link, useLoaderData } from "react-router-dom";

import { getAuthToken } from "../utils/auth";

export default function HomePage() {
  const { event, myEvents, isLoggedIn, totalEvents } = useLoaderData();

  return (
    <div className="px-4 py-6 space-y-8">
      {event && (
        <Link to={`/events/${event._id}`} className="block group">
          <div className="relative w-full max-h-[400px] rounded-lg overflow-hidden shadow-lg">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-[400px] object-cover group-hover:opacity-90 transition duration-300"
            />
            <div className="absolute top-0 left-0 bg-black/60 text-white p-4 text-sm rounded-br-lg">
              <p>📍 {event.location}</p>
              <p>👥 {event.registerCount ?? 0} peserta</p>
              <p>📅 {new Date(event.date).toLocaleDateString("id-ID")}</p>
            </div>
            <div className="absolute bottom-0 left-0 bg-white/90 px-4 py-2 w-full">
              <h2 className="text-lg font-semibold text-gray-800">
                {event.title}
              </h2>
            </div>
          </div>
        </Link>
      )}

      {isLoggedIn && (
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">🎫 My Events</h3>
          <p>
            Total Event:{" "}
            <span className="font-semibold text-blue-800">
              {myEvents.length}
            </span>
          </p>
        </div>
      )}

      {!isLoggedIn && (
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">🎫 Total Events</h3>
          <p>
            Total Event:{" "}
            <span className="font-semibold text-blue-800">{totalEvents}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export async function loaderHome() {
  const token = getAuthToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const allEventsPromise = fetch(
    `https://projectevent-management-backend-production.up.railway.app/events`
  ).then((res) => res.json());

  let myEventsPromise = Promise.resolve([]);
  let isLoggedIn = false;

  if (token) {
    isLoggedIn = true;
    myEventsPromise = fetch(
      `https://projectevent-management-backend-production.up.railway.app/events/my-events`,
      { headers }
    ).then((res) => res.json());
  }

  const [allEventsData, myEvents] = await Promise.all([
    allEventsPromise,
    myEventsPromise,
  ]);

  const event = allEventsData.results?.[0];
  const totalEvents = allEventsData.total_results || 0;

  return {
    event,
    myEvents,
    isLoggedIn,
    totalEvents,
  };
}
