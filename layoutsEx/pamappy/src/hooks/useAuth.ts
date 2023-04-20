import { useCallback, useEffect, useState } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";

import { LOCAL_STORAGE_KEY } from "../api/config";
import { clear, loadString, saveString } from "../utils";

/**
 * Returns the auth info and some auth strategies.
 *
 */

export let accessToken: string | null;

const authState = atom({
  key: "authAtom", // unique ID (with respect to other atoms/selectors)
  default: false,
});

export const useAuth = () => {
  const [authenticated, setAuthenticated] = useRecoilState(authState);
  const [initialized, setInitialized] = useState(false);

  // fetch user profile
  useEffect(() => {
    const fetchToken = async () => {
      if (!accessToken) {
        try {
          const savedToken = await loadString(LOCAL_STORAGE_KEY);
          if (savedToken && savedToken !== "") {
            accessToken = savedToken;
            setAuthenticated(true);
          }
        } catch (err) {
        } finally {
          setInitialized(true);
        }
      } else {
        setInitialized(true);
        setAuthenticated(true);
      }
    };

    fetchToken();
  }, []);

  return {
    accessToken,
    authenticated,
    initialized,
    saveToken: useCallback((token) => {
      saveString(LOCAL_STORAGE_KEY, token);
    }, []),
    logout: () => {
      accessToken = null;
      setAuthenticated(false);
      clear();
    },
  };
};

export const useAuthStateValue = () => useRecoilValue(authState);
