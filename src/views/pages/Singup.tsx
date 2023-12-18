import { useForm } from "react-hook-form";
import ThemeContainer from "../../components/layout/ThemeContainer";
import TextError from "../../components/shared/TextError";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <ThemeContainer>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-h-[500px] text-white border p-10 rounded-md"
      >
        <h1 className="text-3xl mb-10">Signup Form</h1>
        <div className="mb-6 flex flex-col">
          <label>Username</label>
          <input
            type="text"
            {...register("username", {
              required: true,
              validate: (value) => isNaN(value),
            })}
            className="border-b border-black mb-4 outline-none bg-transparent text-white"
            autoComplete="off"
            spellCheck={false}
          />
          {errors.username && errors.username.type === "required" && (
            <TextError msg="Username is required" />
          )}
          {errors.username && errors.username.type === "validate" && (
            <TextError msg="Numbers are not allowed" />
          )}
        </div>
        <div className="form-control mb-6 flex flex-col">
          <label>Email</label>
          <input
            type="text"
            {...register("email", {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
            className="border-b border-black mb-4 outline-none bg-transparent text-white"
            autoComplete="off"
            spellCheck={false}
          />
          {errors.email && errors.email.type === "required" && (
            <TextError msg="Email is required." />
          )}
          {errors.email && errors.email.type === "pattern" && (
            <TextError msg="Email is not valid." />
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
            autoComplete="off"
            spellCheck={false}
          />
          {errors.password && errors.password.type === "required" && (
            <TextError msg="Password is required." />
          )}
          {errors.password && errors.password.type === "minLength" && (
            <TextError msg="Password should be at-least 6 characters." />
          )}
        </div>{" "}
        <div className="mb-6 flex flex-col">
          <label>Contact Number</label>
          <input
            type="text"
            {...register("contact", {
              required: true,
              max: 10,
            })}
            className="border-b border-black mb-4 outline-none bg-transparent text-white"
            autoComplete="off"
            spellCheck={false}
          />
          {errors.contact && errors.contact.type === "required" && (
            <TextError msg="Contact number is required" />
          )}
          {errors.contact && errors.contact.type === "max" && (
            <TextError msg="Contact number should not contain more than 10 digits." />
          )}
        </div>
        <button
          type="submit"
          className="bg-white text-black px-7 py-2 rounded-lg border w-full"
        >
          Submit
        </button>
      </form>
    </ThemeContainer>
  );
};

export default SignupPage;
