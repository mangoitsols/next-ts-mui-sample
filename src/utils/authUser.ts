import { localStorageGetter } from "@/api/auth";

export const authUser = () => {
  if (typeof window !== "undefined") {
    const userDet: any = localStorageGetter("mangomis_user_details");
    return JSON.parse(userDet);
  }
};
