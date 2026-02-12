export const cs2Data = {
    liveMatches: [
        {
            id: 'cs-live-1',
            tournament: 'PGL Major Copenhagen',
            round: 'Playoffs',
            map: 'Mirage',
            status: 'Live',
            teams: [
                { name: 'FaZe Clan', logo: 'FAZE', kills: 14, rank: 1 },
                { name: 'Natus Vincere', logo: 'NAVI', kills: 13, rank: 2 }
            ]
        }
    ],
    tournaments: [
        { id: 'cs-t1', name: 'IEM Katowice 2026', status: 'Ongoing', prizePool: '$1,000,000', teams: 24, format: 'Double Elimination' },
        { id: 'cs-t2', name: 'ESL Pro League S20', status: 'Upcoming', prizePool: '$750,000', teams: 32, format: 'Group Stage' }
    ],
    teams: [
        { id: 'faze', name: 'FaZe Clan', logo: 'FAZE', color: '#e43333', stats: { winRate: '85%', avgKills: '16.8', avgPoints: '450' }, achievements: ['Major Winners', 'Grand Slam Winners'], roster: ['karrigan', 'ropz', 'broky', 'rain', 'frozen'] },
        { id: 'navi', name: 'Natus Vincere', logo: 'NAVI', color: '#fff000', stats: { winRate: '80%', avgKills: '15.2', avgPoints: '420' }, achievements: ['Major Winners 2024'], roster: ['Aleksib', 'jL', 'iM', 'b1t', 'w0nderful'] }
    ],
    players: [
        { id: 'p3', name: 'ZywOo', team: 'Vitality', role: 'AWPer', img: 'https://img-cdn.hltv.org/playerid/11893.png', stats: { kd: '1.55', kills: '320', matches: '18', mvp: '7' }, performance: [25, 30, 22, 28, 35] },
        { id: 'p4', name: 'donk', team: 'Spirit', role: 'Rifler', img: 'https://img-cdn.hltv.org/playerid/21167.png', stats: { kd: '1.48', kills: '290', matches: '14', mvp: '5' }, performance: [28, 24, 32, 26, 30] }
    ]
};
