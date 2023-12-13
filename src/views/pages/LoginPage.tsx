import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="custom__container flex__center h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control mb-6 flex flex-col">
          <label>Email</label>
          <input
            type="text"
            {...register("email", {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
            className="border-b border-black mb-4 outline-none"
          />
          {errors.email && errors.email.type === "required" && (
            <p className="text-red-600">Email is required.</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className="text-red-600">Email is not valid.</p>
          )}
        </div>

        <div className="form-control mb-6 flex flex-col">
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
            className="border-b border-black mb-4 outline-none"
          />
          {errors.password && errors.password.type === "required" && (
            <p className="text-red-600">Password is required.</p>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <p className="text-red-600">
              Password should be at-least 6 characters.
            </p>
          )}
        </div>
        <div className="form-control">
          <label></label>
          <button
            type="submit"
            className="bg-slate-500 px-7 py-2 text-white rounded-lg"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
