import { Form, useActionData, useNavigation } from "react-router-dom";

export default function EventForm({ onCancel }) {
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
        <input type="text" name="title" required className="input" />
      </label>

      <label className="flex flex-col">
        <span className="mb-1 text-sm font-medium">Description</span>
        <textarea name="description" rows={3} className="input" />
      </label>

      <label className="flex flex-col">
        <span className="mb-1 text-sm font-medium">Date</span>
        <input type="date" name="date" required className="input" />
      </label>

      <label className="flex flex-col">
        <span className="mb-1 text-sm font-medium">Location</span>
        <input type="text" name="location" required className="input" />
      </label>

      <label className="flex flex-col">
        <span className="mb-1 text-sm font-medium">Participant Quota</span>
        <input type="number" name="maximum" required className="input" />
      </label>

      <label className="flex flex-col">
        <span className="mb-1 text-sm font-medium">Event Image</span>
        <input
          type="file"
          name="image"
          accept="image/*"
          required
          className="input"
        />
      </label>

      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}
