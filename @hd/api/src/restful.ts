import { ApiRes } from "@hd/core/types";

export function restful(origin: string, token: string) {
  return {
    serverSideGeneration: (name: string, time: string, timezone: string) =>
      fetch(`${origin}/api-v2/api/web-calculator/server-side-generation`, {
        headers: {
          "calculator-token": token,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          tzData: {
            timezone,
            timeInUtc: false,
            time,
          },
          data: {
            name,
          },
        }),
        method: "POST",
      }).then((x) => x.json() as Promise<ApiRes>),
  };
}
