export const dashboardData = {
    user: {
        name: "ProGamer_Elite",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ProGamer",
        email: "elite.gamer@esportsbuzz.com",
        role: "User",
        joinedDate: "Jan 15, 2025"
    },
    followedPlayers: [
        { id: 1, name: "Faker", team: "T1", game: "League of Legends", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Faker" },
        { id: 2, name: "TenZ", team: "Sentinels", game: "Valorant", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=TenZ" },
        { id: 3, name: "s1mple", team: "NAVI", game: "Counter-Strike 2", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=s1mple" },
        { id: 4, name: "Topson", team: "OG", game: "Dota 2", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Topson" },
    ],
    followedTeams: [
        { id: 1, name: "Sentinels", game: "Valorant", logo: "S", color: "#ff4655" },
        { id: 2, name: "T1 Esports", game: "League of Legends", logo: "T1", color: "#e2012d" },
        { id: 3, name: "Natus Vincere", game: "Counter-Strike 2", logo: "NV", color: "#ffde00" },
        { id: 4, name: "OG", game: "Dota 2", logo: "OG", color: "#6cc644" },
    ],
    gameHubs: [
        { id: "freefire", name: "Free Fire", subtitle: "Survival Battle Royale", slug: "freefire", color: "#ffa500" },
        { id: "bgmi", name: "Battlegrounds Mobile India", subtitle: "Strategic Combat Royale", slug: "battlegroundsmobileindia", color: "#ffd700" },
        { id: "valorant", name: "Valorant", subtitle: "Tactical 5v5 FPS", slug: "valorant", color: "#ff4655" },
        { id: "cs2", name: "Counter-Strike 2", subtitle: "Competitive FPS", slug: "cs2", color: "#de9b35" },
        { id: "dota2", name: "Dota 2", subtitle: "Strategic MOBA", slug: "dota2", color: "#e23c30" },
        { id: "lol", name: "League of Legends", subtitle: "Champion Arena MOBA", slug: "leagueoflegends", color: "#c8aa6e" },
    ],
    trendingPlayers: [
        { id: 1, name: "Aspas", team: "LOUD", game: "Valorant", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aspas", popularity: 12400 },
        { id: 2, name: "ZywOo", team: "Vitality", game: "Counter-Strike 2", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=ZywOo", popularity: 10800 },
        { id: 3, name: "Chovy", team: "Gen.G", game: "League of Legends", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chovy", popularity: 9500 },
        { id: 4, name: "Yatoro", team: "Team Spirit", game: "Dota 2", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yatoro", popularity: 8200 },
    ],
    trendingTeams: [
        { id: 1, name: "LOUD", game: "Valorant", logo: "L", color: "#00cd4e", popularity: 25600 },
        { id: 2, name: "Vitality", game: "Counter-Strike 2", logo: "V", color: "#ffde00", popularity: 21300 },
        { id: 3, name: "Gen.G", game: "League of Legends", logo: "GG", color: "#aa8a00", popularity: 18900 },
        { id: 4, name: "Team Spirit", game: "Dota 2", logo: "TS", color: "#ff6f30", popularity: 16700 },
    ],
    notifications: [
        { id: 1, message: "Sentinels vs Gen.G is starting now!", time: "2m ago", unread: true },
        { id: 2, message: "Match Result: NAVI won against G2", time: "1h ago", unread: false },
        { id: 3, message: "Tournament Update: PGL Major seeds confirmed", time: "5h ago", unread: false },
    ]
};
