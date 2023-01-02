export default defineEventHandler((event) => {
  // proxy only "/api" requests
  if (!event.req.url?.startsWith("/api/")) return;

  const apiBaseUrl = "http://localhost:4000/";
  console.log(event.req.url);
  const target = new URL(event.req.url, apiBaseUrl);

  return proxyRequest(event, target.toString(), {
    headers: {
      host: target.host, // if you need to bypass host security
    },
  });
});
