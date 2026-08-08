export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Content-Type": "application/json; charset=utf-8"
    };
    if (request.method === "OPTIONS") return new Response(null, {headers:cors});
    if (!env.SPORTMONKS_TOKEN) {
      return new Response(JSON.stringify({error:"SPORTMONKS_TOKEN is not configured"}), {status:500, headers:cors});
    }
    try {
      if (url.pathname === "/fixtures") {
        const date = url.searchParams.get("date");
        if (!date) return new Response(JSON.stringify({error:"date is required"}), {status:400, headers:cors});

        // Expected lineups are returned before official team sheets.
        // Official lineups and player statistics replace/augment them when available.
        const includes = [
          "participants",
          "league",
          "state",
          "scores",
          "expectedLineups",
          "lineups.player",
          "statistics"
        ].join(";");

        const api = new URL(`https://api.sportmonks.com/v3/football/fixtures/date/${date}`);
        api.searchParams.set("api_token", env.SPORTMONKS_TOKEN);
        api.searchParams.set("include", includes);

        const res = await fetch(api.toString(), {
          headers: {"Accept":"application/json"},
          cf: {cacheTtl: 60, cacheEverything: true}
        });
        const body = await res.text();
        return new Response(body, {status:res.status, headers:cors});
      }

      return new Response(JSON.stringify({ok:true, endpoints:["/fixtures?date=YYYY-MM-DD"]}), {headers:cors});
    } catch (e) {
      return new Response(JSON.stringify({error:String(e)}), {status:500, headers:cors});
    }
  }
};
