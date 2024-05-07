import { localStorageGetter } from "@/api/auth";

export function authHeader() {
  const getToken: any = localStorageGetter("mangomis_login_token");
  if (getToken) {
    return { "x-access-token": `${getToken}` };
  } else {
    return {};
  }
}
