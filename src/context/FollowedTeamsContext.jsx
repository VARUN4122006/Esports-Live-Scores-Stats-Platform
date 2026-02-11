import { createContext, useContext, useState, useEffect } from 'react';

const FollowedTeamsContext = createContext();

export const useFollowedTeams = () => useContext(FollowedTeamsContext);

export const FollowedTeamsProvider = ({ children }) => {
    const [followedTeams, setFollowedTeams] = useState(() => {
        try {
            const saved = localStorage.getItem('esportsFollowedTeams');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('esportsFollowedTeams', JSON.stringify(followedTeams));
    }, [followedTeams]);

    const isFollowing = (teamId) => followedTeams.some(t => t.id === teamId);

    const toggleFollow = (team) => {
        setFollowedTeams(prev =>
            prev.some(t => t.id === team.id)
                ? prev.filter(t => t.id !== team.id)
                : [...prev, { id: team.id, name: team.name, logo: team.logo, color: team.color, game: team.game }]
        );
    };

    const unfollowTeam = (teamId) => {
        setFollowedTeams(prev => prev.filter(t => t.id !== teamId));
    };

    return (
        <FollowedTeamsContext.Provider value={{ followedTeams, toggleFollow, isFollowing, unfollowTeam }}>
            {children}
        </FollowedTeamsContext.Provider>
    );
};
