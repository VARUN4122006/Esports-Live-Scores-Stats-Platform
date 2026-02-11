export const lolData = {
    liveMatches: [
        {
            id: 'l-live-1',
            tournament: 'Worlds 2026',
            round: 'Semifinals',
            map: 'Summoners Rift',
            status: 'Live',
            teams: [
                { name: 'T1', logo: 'T1', kills: 18, rank: 1 },
                { name: 'Gen.G', logo: 'GEN', kills: 12, rank: 2 }
            ]
        }
    ],
    tournaments: [
        { id: 'l-t1', name: 'LCK Summer 2026', status: 'Ongoing', prizePool: '$375,000', teams: 10, format: 'Double RR' },
        { id: 'l-t2', name: 'MSI 2026', status: 'Upcoming', prizePool: '$250,000', teams: 12, format: 'Bracket' }
    ],
    teams: [
        { id: 't1', name: 'T1', logo: 'T1', color: '#e2012d', stats: { winRate: '90%', avgKills: '17', avgPoints: '1500' }, achievements: ['4x Worlds Winner'], roster: ['Zeus', 'Oner', 'Faker', 'Gumayusi', 'Keria'] },
        { id: 'geng', name: 'Gen.G', logo: 'GEN', color: '#aa8a31', stats: { winRate: '85%', avgKills: '15', avgPoints: '1400' }, achievements: ['LCK Champions x3'], roster: ['Kiin', 'Canyon', 'Chovy', 'Peyz', 'Lehends'] }
    ],
    players: [
        { id: 'p7', name: 'Faker', team: 'T1', role: 'Mid', img: 'https://liquipedia.net/commons/images/8/82/Faker_Worlds_2023.png', stats: { kd: '4.5', kills: '210', matches: '20', mvp: '8' }, performance: [25, 22, 28, 30, 35] },
        { id: 'p8', name: 'Chovy', team: 'Gen.G', role: 'Mid', img: 'https://liquipedia.net/commons/images/a/a2/Chovy_LCK_Spring_2024.png', stats: { kd: '4.8', kills: '190', matches: '18', mvp: '6' }, performance: [28, 25, 32, 27, 30] }
    ]
};
