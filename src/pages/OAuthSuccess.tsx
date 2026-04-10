import useAuthStore from "@/auth/Store";
import { Spinner } from "@/components/ui/spinner";
import { refreshToken } from "@/service/AuthService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function OAuthSuccess() {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const changeLoginData = useAuthStore((state) => state.changeLocalLoginData);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAccessTokenAndData() {
      if (!isRefreshing) {
        setIsRefreshing(true);

        try {
          const loginResponseData = await refreshToken();
          console.log(loginResponseData);
          changeLoginData(loginResponseData.accessToken, loginResponseData.userDto, true);
          navigate("/dashboard");
        } catch (error) {
          toast.error("Error while Login!");
          console.log(error);
        } finally {
          setIsRefreshing(false);
        }
      }
    }

    getAccessTokenAndData();
  }, []);

  return (
    <div className="flex flex-col gap-3 justify-center items-center pt-32">
      <Spinner />
      <h1 className="font-semibold text-2xl">Please Wait!!</h1>
    </div>
  );
}

export default OAuthSuccess;
