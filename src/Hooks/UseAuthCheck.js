import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogedIn } from "../features/Auth/AuthSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();

  const [authCheck, setAuthChecked] = useState(false);

  useEffect(() => {
    const authFromLocal = localStorage?.getItem("Auth");
    if (authFromLocal) {
      const auth = JSON.parse(authFromLocal);
      if (auth?.accessToken && auth?.user) {
        dispatch(
          userLogedIn({
            accessToken: auth.accessToken,
            user: auth.user,
          })
        );
      }
    }
    setAuthChecked(true);
  }, [dispatch, authCheck]);

  return authCheck;
}
