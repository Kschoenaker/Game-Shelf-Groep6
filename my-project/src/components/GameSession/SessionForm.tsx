
import { useForm } from "react-hook-form";
import type {
  GameSession,
  SessionPlace,
} from "../../types/GameSessionTypes/indexGameSession";

type SessionFormValues = {
  title: string;
  description: string;
  address: string;
  place: SessionPlace;
};

type SessionFormProps = {
  onCreate: (data: SessionFormValues) => void;
};

export default function SessionForm({ onCreate }: SessionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SessionFormValues>({
    defaultValues: {
      title: "",
      description: "",
      address: "",
      place: "club_room",
    },
  });

  function submitForm(data: SessionFormValues) {
    onCreate(data);
  }

  return (
    <form
      className="formSection"
      onSubmit={handleSubmit(submitForm)}
    >
      <label htmlFor="title">Title</label>
      <input
        id="title"
        {...register("title", {
          required: "Title is required",
        })}
        placeholder="Title"
      />
      {errors.title && <p>{errors.title.message}</p>}

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        {...register("description", {
          required: "Description is required",
        })}
        placeholder="Description"
      />
      {errors.description && <p>{errors.description.message}</p>}

      <label htmlFor="address">Address</label>
      <input
        id="address"
        {...register("address", {
          required: "Address is required",
        })}
        placeholder="Address"
      />
      {errors.address && <p>{errors.address.message}</p>}

      <label htmlFor="place">Location</label>
      <select id="place" {...register("place")}>
        <option value="club_room">Club room</option>
        <option value="home">Home</option>
      </select>

      <button type="submit">Create</button>
    </form>
  );
}
