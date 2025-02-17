import React, { useState } from "react";
import MarkdownDisplay from '../components/MarkdownDisplay';
import { CiEdit } from "react-icons/ci";
import { ImCross } from "react-icons/im";
import { FaCheckCircle } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

const AgentDetail = ({ agent, agentKey, onSave, onReset }) => {

	const [editMode, setEditMode] = useState(false);
	const [editedAgent, setEditedAgent] = useState({
		goal: agent.goal,
		backstory: agent.backstory,
	});

	const handleEditChange = (field, value) => {
		setEditedAgent((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSave = () => {
		onSave(agentKey, editedAgent);
		setEditMode(false);
	};

	const handleReset = () => {
		onReset(agentKey);
		setEditMode(false);
	};

	return (
		<div className="border bg-gray-50 shadow border-gray-300 px-4 md:px-6 py-3 md:py-6">
			<div className="flex gap-6">
                <h2 className="font-bold text-xl text-pink-500 mb-2">{agent.role}</h2>
                <div className="flex justify-between">
                    <button
                        onClick={() => setEditMode((prev) => !prev)}
                        className=" rounded-md text-pink-500"
                    >
                        {editMode ? <span className="flex flex-col text-xs gap-1 items-center justify-center"><ImCross className="text-xl text-red-600" /> Cancel </span> : <span className="flex  gap-2 text-gray-800 items-center justify-center"><CiEdit className="text-2xl" /> Edit</span>}
                    </button>
                    {editMode && (
                        <>
                            <button
                                onClick={handleSave}
                                className=" ml-5 rounded-md flex gap-1 flex-col items-center text-xs justify-center text-green-500"
                            >
                                <FaCheckCircle className="text-lg" />
								Save
                            </button>
                            <button
                                onClick={handleReset}
                                className=" ml-5 rounded-md text-red-500 flex flex-col text-xs gap-1 items-center justify-center"
                            >
                                <GrPowerReset className="text-lg" />
								Reset
                            </button>
                        </>
                    )}
                </div>
            </div>
			<div className="mb-3">
				<h3 className="font-semibold my-2">Goal</h3>
				{editMode ? (
                    <textarea
					
                    className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  focus:ring-0 focus:border-blue-600 peer min-h-[150px] slim-scrollbar p-2 leading-7  rounded-md resize-y overflow-auto focus:outline-none"
                    value={editedAgent.goal}
                    onChange={(e) => handleEditChange('goal', e.target.value)}
                />
                
					
				) : (
					<MarkdownDisplay markdownText={agent.goal} />
				)}
			</div>
			<div className="mb-2">
				<h3 className="font-semibold my-2">Backstory</h3>
				{editMode ? (
					// <textarea
					
					// 	className="w-full min-h-[150px] slim-scrollbar p-2 border border-gray-300 rounded-md resize-y overflow-auto focus:outline-none text-sm leading-7"
					// 	value={editedAgent.backstory}
					// 	onChange={(e) => handleEditChange('backstory', e.target.value)}
					// />
                    <textarea
                        className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  focus:ring-0 focus:border-blue-600 peer min-h-[180px] slim-scrollbar p-2 leading-7  rounded-md resize-y overflow-auto focus:outline-none"
                        value={editedAgent.backstory}
						onChange={(e) => handleEditChange('backstory', e.target.value)}
                    />
				) : (
					<MarkdownDisplay markdownText={agent.backstory} />
				)}
			</div>
			
		</div>
	);
};

export default AgentDetail