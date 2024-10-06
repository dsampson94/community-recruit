'use client';

import React, { MouseEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserFromToken } from '../lib/auth';

const Header = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [user, setUser] = useState<null | { id: string; email: string; username: string, commits: number, projects: number, avatarUrl?: string }>(null);
    const [darkMode, setDarkMode] = useState(false);  // Dark mode state
    const open = Boolean(anchorEl);
    const router = useRouter();

    useEffect(() => {
        const userFromToken = getUserFromToken();
        setUser(userFromToken ? {
            id: userFromToken.id,
            email: userFromToken.email,
            username: userFromToken.username,
            commits: 0,  // Default value if it's missing
            projects: 0, // Default value if it's missing
            avatarUrl: userFromToken.avatarUrl || '',  // Default value or keep existing
        } : null);
    }, []);
    

    const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    const getInitial = (email: string) => {
        return email?.charAt(0)?.toUpperCase();
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <header className="sticky top-0 z-49 bg-white dark:bg-gray-800 text-black dark:text-white shadow-md">
            <div className="flex justify-between items-center p-1 md:p-2">
                {/* Logo or Brand */}
                <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-semibold">Community Recruit</h1>
                    {/* Quick Stats */}
                    {user && (
                        <div className="hidden md:flex space-x-4">
                            <div className="text-gray-500 dark:text-gray-300">Commits: {user.commits || 0}</div>
                            <div className="text-gray-500 dark:text-gray-300">Projects: {user.projects || 0}</div>
                        </div>
                    )}
                </div>

                {/* Right section with profile, notifications, and dark mode toggle */}
                <div className="flex items-center space-x-4">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="focus:outline-none text-xl"
                    >
                        {darkMode ? '☀️' : '🌙'}
                    </button>

                    {/* Notifications */}
                    <button className="focus:outline-none relative">
                        <span className="material-icons text-2xl">notifications</span>
                        {/* Notification count */}
                        <span className="absolute top-0 right-0 inline-block w-4 h-4 bg-red-600 text-white text-xs rounded-full text-center">3</span>
                    </button>

                    {/* Profile Dropdown */}
                    {user && (
                        <div className="relative">
                            <button onClick={handleMenuClick} className="focus:outline-none">
                                {user.avatarUrl ? (
                                    <img
                                        className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                                        src={user.avatarUrl}
                                        alt={user.email}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-8 mt-1.5 h-8 md:w-10 md:h-10 rounded-full bg-blue-500 text-white text-lg font-semibold">
                                        {getInitial(user?.email)}
                                    </div>
                                )}
                            </button>
                            {open && (
                                <div
                                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg py-2"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="menu-button"
                                >
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                        onClick={handleMenuClose}
                                    >
                                        Profile
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                        onClick={handleMenuClose}
                                    >
                                        My account
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                        onClick={handleSignOut}
                                    >
                                        Logout
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
