'use client'

import React, { useState } from 'react';

interface UserFormProps {
    onSubmit: (data: any) => void;
}

const Profile: React.FC<UserFormProps> = ({ onSubmit }) => {
    // Initialize state with all user data fields
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        fullName: '',
        bio: '',
        location: '',
        gitContributions: 0,
        hoursWorked: 0,
        skills: [''],
        projects: [''],
        eventsAttended: [''],
    });

    // Handle simple input changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle changes in array fields (skills, projects, eventsAttended)
    const handleArrayChange = (
        index: number,
        field: 'skills' | 'projects' | 'eventsAttended',
        value: string
    ) => {
        const updatedArray = [...formData[field]];
        updatedArray[index] = value;
        setFormData({ ...formData, [field]: updatedArray });
    };

    // Add new field in array inputs
    const addArrayField = (field: 'skills' | 'projects' | 'eventsAttended') => {
        setFormData({ ...formData, [field]: [...formData[field], ''] });
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className="max-w-2xl mx-auto p-4" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-4">
                <label className="block text-gray-700">Username *</label>
                <input
                    type="text"
                    name="username"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Email */}
            <div className="mb-4">
                <label className="block text-gray-700">Email *</label>
                <input
                    type="email"
                    name="email"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Password */}
            <div className="mb-4">
                <label className="block text-gray-700">Password *</label>
                <input
                    type="password"
                    name="password"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Full Name */}
            <div className="mb-4">
                <label className="block text-gray-700">Full Name</label>
                <input
                    type="text"
                    name="fullName"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData.fullName}
                    onChange={handleChange}
                />
            </div>

            {/* Bio */}
            <div className="mb-4">
                <label className="block text-gray-700">Bio</label>
                <textarea
                    name="bio"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData.bio}
                    onChange={handleChange}
                />
            </div>

            {/* Location */}
            <div className="mb-4">
                <label className="block text-gray-700">Location</label>
                <input
                    type="text"
                    name="location"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData.location}
                    onChange={handleChange}
                />
            </div>

            {/* Git Contributions */}
            <div className="mb-4">
                <label className="block text-gray-700">Git Contributions</label>
                <input
                    type="number"
                    name="gitContributions"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData.gitContributions}
                    onChange={handleChange}
                    min={0}
                />
            </div>

            {/* Hours Worked */}
            <div className="mb-4">
                <label className="block text-gray-700">Hours Worked</label>
                <input
                    type="number"
                    name="hoursWorked"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formData.hoursWorked}
                    onChange={handleChange}
                    min={0}
                />
            </div>

            {/* Skills */}
            <div className="mb-4">
                <label className="block text-gray-700">Skills</label>
                {formData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input
                            type="text"
                            value={skill}
                            onChange={(e) => handleArrayChange(index, 'skills', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {formData.skills.length > 1 && (
                            <button
                                type="button"
                                onClick={() => {
                                    const updatedSkills = formData.skills.filter((_, i) => i !== index);
                                    setFormData({ ...formData, skills: updatedSkills });
                                }}
                                className="ml-2 text-red-500"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addArrayField('skills')}
                    className="text-blue-500 hover:underline"
                >
                    + Add Skill
                </button>
            </div>

            {/* Projects */}
            <div className="mb-4">
                <label className="block text-gray-700">Projects</label>
                {formData.projects.map((project, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input
                            type="text"
                            value={project}
                            onChange={(e) => handleArrayChange(index, 'projects', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {formData.projects.length > 1 && (
                            <button
                                type="button"
                                onClick={() => {
                                    const updatedProjects = formData.projects.filter((_, i) => i !== index);
                                    setFormData({ ...formData, projects: updatedProjects });
                                }}
                                className="ml-2 text-red-500"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addArrayField('projects')}
                    className="text-blue-500 hover:underline"
                >
                    + Add Project
                </button>
            </div>

            {/* Events Attended */}
            <div className="mb-4">
                <label className="block text-gray-700">Events Attended</label>
                {formData.eventsAttended.map((event, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input
                            type="text"
                            value={event}
                            onChange={(e) => handleArrayChange(index, 'eventsAttended', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {formData.eventsAttended.length > 1 && (
                            <button
                                type="button"
                                onClick={() => {
                                    const updatedEvents = formData.eventsAttended.filter((_, i) => i !== index);
                                    setFormData({ ...formData, eventsAttended: updatedEvents });
                                }}
                                className="ml-2 text-red-500"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => addArrayField('eventsAttended')}
                    className="text-blue-500 hover:underline"
                >
                    + Add Event
                </button>
            </div>

            {/* Submit Button */}
            <div className="mb-4">
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default Profile;
