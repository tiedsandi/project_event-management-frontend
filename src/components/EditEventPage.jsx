/* eslint-disable react-refresh/only-export-components */

import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";

import { getAuthToken } from "../utils/auth";

export default function EditEventPage() {
  const { event } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const actionData = useActionData();

  return (
    <Form
      method="post"
      encType="multipart/form-data"
      className="flex flex-col gap-4"
    >
      {actionData?.error && (
        <p className="text-sm text-red-500">{actionData.error}</p>
      )}

      <label className="flex flex-col">
        <span className="mb-1 text-sm font-medium">Title</span>
        <input
          type="text"
          name="title"
          required
          className="input"
          defaultValue={event.title}
        />
      </label>

      <label className="flex flex-col">
        <span className="mb-1 text-sm font-medium">Description</span>
        <textarea
          name="description"
          rows={3}
          className="input"
          defaultValue={event.description}
        />
      </label>

      <label className="flex flex-col">
        <span className="mb-1 text-sm font-medium">Date</span>
        <input
          type="date"
          name="date"
          required
          className="input"
          defaultValue={event.date.split("T")[0]}
        />
      </label>

      <label className="flex flex-col">
        <span className="mb-1 text-sm font-medium">Location</span>
        <input
          type="text"
          name="location"
          required
          className="input"
          defaultValue={event.location}
        />
      </label>

      <label className="flex flex-col">
        <span className="mb-1 text-sm font-medium">Participant Quota</span>
        <input
          type="number"
          name="maximum"
          required
          className="input"
          defaultValue={event.maximum}
        />
      </label>

      <label className="flex flex-col">
        <span className="mb-1 text-sm font-medium">Event Image (optional)</span>
        <input type="file" name="image" accept="image/*" className="input" />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        {isSubmitting ? "Updating..." : "Update Event"}
      </button>
    </Form>
  );
}

export async function editEventLoader({ params }) {
  const response = await fetch(
    `https://projectevent-management-backend-production.up.railway.app/events/${params.idEvent}`
  );

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch event." }), {
      status: 500,
    });
  }

  const event = await response.json();
  return { event };
}

export async function updateEventAction({ request, params }) {
  const token = getAuthToken();
  const formData = await request.formData();

  const response = await fetch(
    `https://projectevent-management-backend-production.up.railway.app/events/${params.idEvent}`,
    {
      method: "PUT",
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

  return redirect(`/events/${params.idEvent}`);
}
