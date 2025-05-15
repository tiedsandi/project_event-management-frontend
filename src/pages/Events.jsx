import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Link,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { useEffect } from "react";

export default function EventsPage() {
  const data = useLoaderData();
  const events = data.events.results || [];
  const page = data.events.page;
  const totalPages = data.events.total_pages;

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const goToPage = (newPage) => {
    setSearchParams({ page: newPage });
  };

  useEffect(() => {
    if (page !== currentPage) {
      navigate(`/events?page=${currentPage}`);
    }
  }, [currentPage, navigate, page]);

  return (
    <div className="px-4 py-6">
      <h1 className="mb-6 text-3xl font-bold text-center">Daftar Event</h1>

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

          <div className="flex justify-center mt-8 space-x-4 items-center">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-30"
            >
              <ChevronLeft />
            </button>
            <span className="text-gray-700 font-medium">
              Halaman {currentPage} dari {totalPages}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-30"
            >
              <ChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

async function loadEvents(page) {
  const response = await fetch(
    `https://projectevent-management-backend-production.up.railway.app/events?page=${page}&limit=6`
  );

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
      status: 500,
    });
  }

  const resData = await response.json();
  return resData;
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;

  const events = await loadEvents(page);

  return { events };
}

export function HydrateFallback() {
  return <p>Loading Events...</p>;
}
