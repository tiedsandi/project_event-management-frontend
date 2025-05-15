import { Link, redirect, useLoaderData, useSubmit } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { getAuthToken } from "../utils/auth";

export default function EventPage() {
  const { event, isRegistered, userId } = useLoaderData();

  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const submit = useSubmit();

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmed) {
      submit(null, {
        method: "delete",
        action: `/events/${event._id}/delete`,
      });
    }
  }

  useEffect(() => {
    const token = getAuthToken();
    const userData = JSON.parse(localStorage.getItem("user") || "{}");

    setIsLogin(!!token);
    setIsAdmin(userData.role === "admin");
  }, []);

  const isCreator = isAdmin && userId === event.created_by;

  return (
    <div className="max-w-4xl px-4 py-10 mx-auto">
      <img
        src={event.imageUrl}
        alt={event.title}
        className="object-cover w-full h-64 rounded-xl"
      />

      <h1 className="mt-6 text-3xl font-bold text-gray-800">{event.title}</h1>
      <p className="mt-2 text-sm text-gray-500">
        📅{" "}
        {new Date(event.date).toLocaleDateString("en-US", {
          dateStyle: "long",
        })}
      </p>

      <p className="mt-4 text-gray-700">{event.description}</p>

      <div className="mt-4 text-gray-600 space-y-1">
        <p>📍 Location: {event.location}</p>
        <p>👥 Maximum Capacity: {event.maximum}</p>
        <p>✅ Registered: {event.register_count}</p>
      </div>

      <div className="mt-6">
        {!isLogin ? (
          <Link
            to="/login"
            className="inline-block px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Login to order
          </Link>
        ) : isCreator ? (
          <div className="flex gap-2">
            <Link
              to={`/events/${event._id}/edit`}
              className="inline-flex items-center gap-2 px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
            >
              <Pencil size={16} />
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-2 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        ) : isAdmin ? (
          <></>
        ) : isRegistered ? (
          <button
            disabled
            className="px-4 py-2 text-white bg-gray-400 rounded-md cursor-not-allowed"
          >
            Already Registered
          </button>
        ) : (
          <button className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700">
            Order Ticket
          </button>
        )}
      </div>
    </div>
  );
}

async function loadEvent(id) {
  const token = getAuthToken();
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = userData.id || userData._id || null;

  const [eventRes, registrationRes] = await Promise.all([
    fetch(
      `https://projectevent-management-backend-production.up.railway.app/events/${id}`
    ),
    fetch(
      `https://projectevent-management-backend-production.up.railway.app/registration/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  ]);

  if (!eventRes.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch event." }), {
      status: 500,
    });
  }

  const eventData = await eventRes.json();
  const registrationData = registrationRes.ok
    ? await registrationRes.json()
    : { data: [] };

  const isRegistered =
    registrationData?.success &&
    Array.isArray(registrationData.data) &&
    registrationData.data.length > 0;

  return {
    event: eventData,
    isRegistered,
    userId,
  };
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  const id = params.idEvent;
  return await loadEvent(id);
}

export function HydrateFallback() {
  return <p>Loading Event...</p>;
}

// eslint-disable-next-line react-refresh/only-export-components
export async function deleteEventAction({ params }) {
  const token = getAuthToken();
  const { idEvent } = params;

  const response = await fetch(
    `https://projectevent-management-backend-production.up.railway.app/events/${idEvent}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    return new Response(
      JSON.stringify({ error: "Failed to delete the event." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return redirect("/my-events");
}
