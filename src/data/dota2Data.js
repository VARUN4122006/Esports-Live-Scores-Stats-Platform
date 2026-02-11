export const dota2Data = {
    liveMatches: [
        {
            id: 'd-live-1',
            tournament: 'The International 2026',
            round: 'Upper Bracket Final',
            map: 'Radiant/Dire',
            status: 'Live',
            teams: [
                { name: 'Team Spirit', logo: 'SPIRIT', kills: 35, rank: 1 },
                { name: 'Gaimin Gladiators', logo: 'GG', kills: 28, rank: 2 }
            ]
        }
    ],
    tournaments: [
        { id: 'd-t1', name: 'DreamLeague S24', status: 'Ongoing', prizePool: '$1,000,000', teams: 16, format: 'Group Stage' },
        { id: 'd-t2', name: 'Riyadh Masters', status: 'Upcoming', prizePool: '$5,000,000', teams: 20, format: 'Swiss' }
    ],
    teams: [
        { id: 'spirit', name: 'Team Spirit', logo: 'SPIRIT', color: '#00d1ff', stats: { winRate: '88%', avgKills: '32', avgPoints: '1200' }, achievements: ['TI10 Winner', 'TI12 Winner'], roster: ['Yatoro', 'Larl', 'Collapse', 'Mira', 'Miposhka'] },
        { id: 'gg', name: 'Gaimin Gladiators', logo: 'GG', color: '#d8b05c', stats: { winRate: '83%', avgKills: '28', avgPoints: '1100' }, achievements: ['Major Winners x3'], roster: ['dyrachyo', 'Quinn', 'Ace', 'tOfu', 'Seleri'] }
    ],
    players: [
        { id: 'p5', name: 'Yatoro', team: 'Team Spirit', role: 'Carry', img: 'https://liquipedia.net/commons/images/0/0/Yatoro_TI12.png', stats: { kd: '4.2', kills: '450', matches: '25', mvp: '10' }, performance: [40, 35, 45, 38, 50] },
        { id: 'p6', name: 'Quinn', team: 'Gaimin Gladiators', role: 'Mid', img: 'https://liquipedia.net/commons/images/a/a/Quinn_Berlin_Major.png', stats: { kd: '3.8', kills: '400', matches: '24', mvp: '6' }, performance: [35, 38, 32, 40, 42] }
    ]
};
