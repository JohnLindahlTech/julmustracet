import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import { LogIn } from "../routes";
import { Url } from "../types/url";
import useLangRouter from "./useLangRouter";

export const LOGGED_IN = true;
export const LOGGED_OUT = false;

const useEnsureSession = (
  fallbackUrl: Url = LogIn.href,
  sessionState = LOGGED_IN
): [boolean, boolean] => {
  const [approved, setApproved] = useState(false);
  const router = useLangRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (!session === sessionState && !loading) {
      router.push(fallbackUrl);
    }
    if (!!session === sessionState && !loading) {
      setApproved(true);
    }
  }, [session, fallbackUrl, router, loading, sessionState]);

  return [approved, loading];
};
export default useEnsureSession;
