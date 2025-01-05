Deno.serve(
  {
    port: +Deno.env.toObject().API_PORT,
  },
  (req: Request) =>
    req
      .text()
      .then(
        (x) =>
          new Deno.Command("curl", {
            args: [
              `https://app.maiamechanics.com/api-v2/api/web-calculator/server-side-generation`,
              `-H`,
              `Accept: application/json, text/plain, */*`,
              `-H`,
              `Accept-Language: en-US,en;q=0.9,zh-TW;q=0.8,zh;q=0.7`,
              `-H`,
              `Connection: keep-alive`,
              `-H`,
              `Content-Type: application/json`,
              `-H`,
              `Origin: https://humandesign-galaxy.com`,
              `-H`,
              `Referer: https://humandesign-galaxy.com/`,
              `-H`,
              `Sec-Fetch-Dest: empty`,
              `-H`,
              `Sec-Fetch-Mode: cors`,
              `-H`,
              `Sec-Fetch-Site: cross-site`,
              `-H`,
              `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0`,
              `-H`,
              `calculator-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZGVjNmYzMi00YzhjLTQyNzUtYTYwZC00YjdkY2RiY2QxOTEiLCJ3ZWJzaXRlVXJsIjoiaHR0cHM6Ly9odW1hbmRlc2lnbi1nYWxheHkuY29tIiwiaWF0IjoxNjkxNTcwMjU1fQ.mDRPEURo3d7LyjMl2Hl7xIh3zZuwrLQUvCYfyHnE8ok`,
              `-H`,
              `sec-ch-ua: "Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"`,
              `-H`,
              `sec-ch-ua-mobile: ?0`,
              `-H`,
              `sec-ch-ua-platform: "Windows"`,
              `--data-raw`,
              x,
              `-k`,
            ],
            stdin: "piped",
            stdout: "piped",
          }),
      )
      .then((x) => x.spawn().output())
      .then((x) => new TextDecoder().decode(x.stdout))
      .then(
        (x) =>
          new Response(x, {
            headers: {
              "Access-Control-Allow-Headers": "*",
              "Access-Control-Allow-Origin": "*",
            },
          }),
      ),
);
