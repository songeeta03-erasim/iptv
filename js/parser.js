function parseM3U(content){

    const lines = content.split('\n');

    const channels = [];

    let current = null;

    lines.forEach(line => {

        line = line.trim();

        if(line.startsWith("#EXTINF")){

            const name = line.split(",").pop()?.trim() || "Unknown Channel";

            current = {
                name: name,
                url: "",
                category: "All Channels",
                logo: ""
            };

        }
        else if(line.startsWith("http")){

            if(current){

                current.url = line;

                channels.push(current);

                current = null;

            }

        }

    });

    return channels.filter(c => c.name && c.url);
}