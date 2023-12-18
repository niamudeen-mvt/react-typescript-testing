import { useForm } from "react-hook-form";
import ThemeContainer from "../../components/layout/ThemeContainer";
import TextError from "../../components/shared/TextError";
import api from "../../utils/axios";
import { sendNotification } from "../../utils/notifications";
import { useNavigate } from "react-router-dom";
import { storeAccessTokenLS, storeRefreshTokenLS } from "../../utils/helper";
import { useAuth } from "../../context/authContext";
import { loginUser } from "../../services/api/auth";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setIsLoggedIn } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      let res = await loginUser(data);

      if (res.status === 200) {
        sendNotification("success", res.data.message);
        setIsLoggedIn(true);
        storeAccessTokenLS(res.data.access_token);
        storeRefreshTokenLS(res.data.refresh_token);
        navigate("/tasks");
      }
    } catch (error) {}
  };

  return (
    <ThemeContainer>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-h-[500px] text-white border p-10 rounded-md relative -z-0"
      >
        <h1 className="text-3xl mb-10">Login Form</h1>
        <div className="form-control mb-6 flex flex-col">
          <label>Email</label>
          <input
            type="text"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required.",
              },
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid.",
              },
            })}
            autoComplete="off"
            spellCheck={false}
            className="border-b border-black mb-4 outline-none bg-transparent text-white"
          />
          {errors.email && <TextError msg={errors.email.message} />}
        </div>
        <div className="form-control mb-6 flex flex-col">
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required.",
              },
              minLength: {
                value: 3,
                message: "Password should be at-least 3 characters.",
              },
            })}
            autoComplete="off"
            spellCheck={false}
            className="border-b border-black mb-4 outline-none bg-transparent text-white"
          />
          {errors.password && <TextError msg={errors.password.message} />}
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

export default LoginPage;
