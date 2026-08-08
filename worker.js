export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Content-Type": "application/json; charset=utf-8"
    };
    if (request.method === "OPTIONS") return new Response(null,{headers});
    if (!env.SPORTMONKS_TOKEN)
      return new Response(JSON.stringify({error:"SPORTMONKS_TOKEN is not configured"}),{status:500,headers});

    if (url.pathname === "/fixtures") {
      const from=url.searchParams.get("from");
      const to=url.searchParams.get("to") || from;
      if (!from) return new Response(JSON.stringify({error:"from is required"}),{status:400,headers});

      const includes=[
        "participants","league","state","scores",
        "expectedLineups","lineups.player","statistics"
      ].join(";");

      // SportMonks v3 fixtures endpoint with between filter.
      const api=new URL("https://api.sportmonks.com/v3/football/fixtures");
      api.searchParams.set("api_token",env.SPORTMONKS_TOKEN);
      api.searchParams.set("include",includes);
      api.searchParams.set("filters","fixtureLeagues:8,9,12,14,17,20,23,24,27,39,82,208,301");
      api.searchParams.set("filter","between:"+from+","+to);
      api.searchParams.set("per_page","100");

      const all=[];
      let page=1;
      while(page<=10){
        api.searchParams.set("page",String(page));
        const r=await fetch(api.toString(),{headers:{"Accept":"application/json"}});
        const j=await r.json();
        if(!r.ok) return new Response(JSON.stringify(j),{status:r.status,headers});
        all.push(...(j.data||[]));
        if(!j.pagination?.has_more) break;
        page++;
      }
      return new Response(JSON.stringify({data:all}),{headers});
    }
    return new Response(JSON.stringify({ok:true}),{headers});
  }
};
