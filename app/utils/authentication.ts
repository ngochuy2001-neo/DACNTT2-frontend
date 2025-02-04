/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/auth.ts
import axios from "axios";

export async function getTokenAndAuth(token: string, router: any) {
  console.log(token);
  if (!token) {
    router.push("/login");
    return false;
  }

  try {
    await axios.post(
      process.env.NEXT_PUBLIC_LOCAL_API_URL + "/api/user/authorize",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return true;
  } catch (error) {
    console.log(error);
    router.push("/login");
    return false;
  }
}
