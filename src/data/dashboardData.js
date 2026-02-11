export const dashboardData = {
    user: {
        name: "ProGamer_Elite",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ProGamer",
        email: "elite.gamer@esportsbuzz.com",
        rank: "Immortal",
        points: 2450
    },
    followedTeams: [
        { id: 1, name: "Sentinels", game: "Valorant", gameIcon: "V", logo: "https://logo.com/placeholder1", followers: "1.2M" },
        { id: 2, name: "T1 Esports", game: "League of Legends", gameIcon: "LoL", logo: "https://logo.com/placeholder2", followers: "2.5M" },
        { id: 3, name: "Natus Vincere", game: "Counter-Strike 2", gameIcon: "CS2", logo: "https://logo.com/placeholder3", followers: "1.8M" },
    ],
    followedPlayers: [
        { id: 1, name: "Faker", team: "T1", game: "League of Legends", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Faker" },
        { id: 2, name: "TenZ", team: "Sentinels", game: "Valorant", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=TenZ" },
        { id: 3, name: "s1mple", team: "NAVI", game: "Counter-Strike 2", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=s1mple" },
    ],
    matchHistory: [
        {
            id: 1,
            title: "Grand Finals: VCT Masters",
            game: "Valorant",
            teams: ["Sentinels", "Gen.G"],
            status: "Completed",
            result: "2 - 1",
            date: "Feb 05, 2026",
            time: "18:00 UTC"
        },
        {
            id: 2,
            title: "Group Stage: PGL Major",
            game: "Counter-Strike 2",
            teams: ["NAVI", "FaZe Clan"],
            status: "Live",
            result: "1 - 0",
            date: "Today",
            time: "Ongoing"
        },
        {
            id: 3,
            title: "LPL Spring Split",
            game: "League of Legends",
            teams: ["JDG", "Bilibili"],
            status: "Completed",
            result: "0 - 2",
            date: "Feb 04, 2026",
            time: "14:00 UTC"
        },
        {
            id: 4,
            title: "The International Qualifiers",
            game: "Dota 2",
            teams: ["Team Spirit", "LGD"],
            status: "Completed",
            result: "2 - 0",
            date: "Feb 03, 2026",
            time: "20:00 UTC"
        }
    ],
    notifications: [
        { id: 1, message: "Sentinels vs Gen.G is starting now!", time: "2m ago", unread: true },
        { id: 2, message: "Match Result: NAVI won against G2", time: "1h ago", unread: false },
        { id: 3, message: "Tournament Update: PGL Major seeds confirmed", time: "5h ago", unread: false },
    ]
};
