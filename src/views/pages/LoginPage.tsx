import { useForm } from "react-hook-form";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <section className="bg-slate-500">
      <div className="custom__container flex__center h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="min-h-[500px] text-white border p-10 rounded-md"
        >
          <h1 className="text-3xl mb-10">Login Form</h1>
          <div className="form-control mb-6 flex flex-col">
            <label>Email</label>
            <input
              type="text"
              {...register("email", {
                required: true,
                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              })}
              className="border-b border-black mb-4 outline-none bg-transparent text-white"
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
              className="border-b border-black mb-4 outline-none bg-transparent text-white"
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
          <button
            type="submit"
            className="bg-white text-black px-7 py-2 rounded-lg border w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
