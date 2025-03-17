"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function BookingApp() {
  const [slots, setSlots] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      date: "",
      timeSlot: "",
      name: "",
      phone: "",
    },
  });

  const date = watch("date");

  useEffect(() => {
    if (date) {
      axios
        .get(`http://localhost:5000/slots?date=${date}`)
        .then((res) => setSlots(res.data.availableSlots))
        .catch((err) => console.error(err));
    }
  }, [date]);

  const onSubmit = async (data: {
    date: string;
    timeSlot: string;
    name: string;
    phone: string;
  }) => {
    try {
      await axios.post("http://localhost:5000/book", data);
      setMessage("✅ Appointment booked successfully!");
      reset();
      setSlots(slots.filter((slot) => slot !== data.timeSlot));
      setValue("timeSlot", "");
    } catch (error) {
      setMessage(
        (error as Error).message || "❌ Booking failed. Please try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Book an Appointment</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Date Input */}
          <div className="mb-2">
            <input
              type="date"
              className="w-full p-2 border rounded"
              {...register("date", { required: "⚠️ Date is required" })}
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date.message}</p>
            )}
          </div>

          {/* Time Slot Selection */}
          <div className="mb-2">
            <select
              className="w-full p-2 border rounded"
              {...register("timeSlot", {
                required: "⚠️ Time slot is required",
              })}
            >
              <option value="">Select a time slot</option>
              {slots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            {errors.timeSlot && (
              <p className="text-red-500 text-sm">{errors.timeSlot.message}</p>
            )}
          </div>

          {/* Name Input */}
          <div className="mb-2">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 border rounded"
              {...register("name", { required: "⚠️ Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Phone Number Input */}
          <div className="mb-2">
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full p-2 border rounded"
              {...register("phone", {
                required: "⚠️ Phone number is required",
                minLength: {
                  value: 10,
                  message: "⚠️ Phone number must be at least 10 digits",
                },
              })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Book Appointment
          </button>
        </form>

        {/* Success / Error Message */}
        {message && (
          <p className="mt-2 text-center text-green-500">{message}</p>
        )}
      </div>
    </div>
  );
}
