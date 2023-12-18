import { useForm } from "react-hook-form";
import ThemeContainer from "../../components/layout/ThemeContainer";
import TextError from "../../components/shared/TextError";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import { sendNotification } from "../../utils/notifications";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      let res = await api.post("/auth/register", { ...data });
      console.log(res, "res<<<<<<<<<<<<<");

      if (res.status === 201) {
        sendNotification("success", res.data.message);
        navigate("/login");
      } else {
        sendNotification("warning", res.data.message);
      }
    } catch (error: any) {
      console.log(error);
      sendNotification("warning", error.response.data.message);
    }
  };

  return (
    <ThemeContainer isCenter={true}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-h-[500px] text-white border p-10 rounded-md"
      >
        <h1 className="text-3xl mb-10">Signup Form</h1>
        <div className="mb-6 flex flex-col">
          <label>Username</label>
          <input
            type="text"
            {...register("name", {
              required: true,
              validate: (value) => isNaN(value),
            })}
            className="border-b border-black mb-4 outline-none bg-transparent text-white"
            autoComplete="off"
            spellCheck={false}
          />
          {errors.name && errors.name.type === "required" && (
            <TextError msg="Username is required" />
          )}
          {errors.name && errors.name.type === "validate" && (
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
              minLength: 3,
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
            {...register("phone", {
              required: true,
              maxLength: 10,
            })}
            className="border-b border-black mb-4 outline-none bg-transparent text-white"
            autoComplete="off"
            spellCheck={false}
          />
          {errors.phone && errors.phone.type === "required" && (
            <TextError msg="Contact number is required" />
          )}
          {errors.phone && errors.phone.type === "maxLength" && (
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
