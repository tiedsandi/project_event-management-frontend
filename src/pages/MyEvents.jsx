import { Link, redirect, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

import EventForm from "../components/EventForm";
import Modal from "../components/Modal";
import { getAuthToken } from "../utils/auth";

/* eslint-disable react-refresh/only-export-components */
export default function MyEventsPage() {
  const data = useLoaderData();
  const events = data.events || [];
  // console.log(events);
  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModalHandler = () => {
    setModalIsOpen(true);
  };
  const closeModalHandler = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    setModalIsOpen(false);
  }, []);

  return (
    <div className="px-4 py-6">
      <h1 className="mb-6 text-3xl font-bold text-center">Daftar Event</h1>
      <div className="flex items-center justify-end mb-6">
        {userData.role === "admin" && (
          <button
            onClick={openModalHandler}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 "
          >
            + Add New Event
          </button>
        )}
      </div>
      <Modal open={modalIsOpen} onClose={closeModalHandler}>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Tambah Event Baru</h2>
          <EventForm onCancel={closeModalHandler} />
        </div>
      </Modal>
      {events.length === 0 ? (
        <p className="text-gray-500 text-center">Tidak ada event tersedia.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Link
                to={`/events/${event._id}`}
                key={event._id}
                className="overflow-hidden transition-shadow duration-200 bg-white shadow-md rounded-2xl hover:shadow-lg"
              >
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="object-cover w-full h-48"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {event.title}
                  </h2>
                  <p className="mb-2 text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString("id-ID")}
                  </p>
                  <p className="mb-2 text-sm text-gray-700">
                    {event.description}
                  </p>
                  <div className="text-sm text-gray-600">
                    <span className="block">📍 {event.location}</span>
                    <span className="block">👥 Kuota: {event.maximum}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

async function loadMyEvent() {
  const token = getAuthToken();

  const response = await fetch(
    `https://projectevent-management-backend-production.up.railway.app/events/my-events`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
      status: 500,
    });
  }

  const resData = await response.json();
  return resData;
}

export async function loader() {
  const events = await loadMyEvent();
  return { events };
}

export function HydrateFallback() {
  return <p>Loading My Events...</p>;
}

export async function action({ request }) {
  const token = getAuthToken();
  const formData = await request.formData();

  // console.log(formData);

  const response = await fetch(
    "https://projectevent-management-backend-production.up.railway.app/events/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const resData = await response.json();

  if (!response.ok) {
    const errorMessage =
      Array.isArray(resData.errors) && resData.errors.length > 0
        ? resData.errors[0].msg
        : "Something went wrong";

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return redirect("/my-events");
}
