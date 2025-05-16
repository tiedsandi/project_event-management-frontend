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
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage });
    }
  };

  useEffect(() => {
    if (page !== currentPage) {
      navigate(`/events?page=${currentPage}`);
    }
  }, [currentPage, navigate, page]);

  const getEventStatus = (event) => {
    const now = new Date();
    const eventDate = new Date(event.date);
    const isExpired = eventDate < now;
    const isFull = event.registerCount >= event.maximum;

    if (isExpired) return { label: "Expired", color: "bg-gray-400 text-white" };
    if (isFull) return { label: "Full", color: "bg-red-500 text-white" };
    return { label: "Available", color: "bg-green-500 text-white" };
  };

  return (
    <div className="px-4 py-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">Browse Events</h1>

      {events.length === 0 ? (
        <p className="text-gray-500 text-center">
          No events available at the moment.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              const status = getEventStatus(event);

              return (
                <Link
                  to={`/events/${event._id}`}
                  key={event._id}
                  className="relative overflow-hidden bg-white rounded-2xl shadow hover:shadow-lg transition group"
                >
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />

                  {/* Status Badge */}
                  <div
                    className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full ${status.color}`}
                  >
                    {status.label}
                  </div>

                  <div className="p-4 space-y-2">
                    <h2 className="text-xl font-semibold text-gray-800 truncate">
                      {event.title}
                    </h2>

                    <p className="text-sm text-gray-500">
                      📅{" "}
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="text-sm text-gray-600">
                      <span>📍 {event.location}</span>
                      <br />
                      <span>
                        👥 {event.registerCount ?? 0}/{event.maximum}{" "}
                        Participants
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40"
              title="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-gray-700 font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40"
              title="Next page"
            >
              <ChevronRight className="w-5 h-5" />
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
  return <p className="text-center text-gray-500 py-8">Loading events...</p>;
}
