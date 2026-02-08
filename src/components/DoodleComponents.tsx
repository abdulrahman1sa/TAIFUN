import React from 'react';

export const DoodleCard = ({ children, className = "", rotate = "rotate-[1deg]" }: { children: React.ReactNode, className?: string, rotate?: string }) => (
    <div className={`bg-white doodle-border doodle-shadow p-6 ${rotate} ${className}`}>
        <div className={`${rotate === "rotate-[1deg]" ? "-rotate-[1deg]" : "rotate-[1deg]"}`}>
            {children}
        </div>
    </div>
);

export const DoodleButton = ({
    children,
    onClick,
    className = "",
    variant = "primary",
    type = "button",
    disabled = false
}: {
    children: React.ReactNode,
    onClick?: () => void,
    className?: string,
    variant?: 'primary' | 'accent' | 'outline',
    type?: "button" | "submit" | "reset",
    disabled?: boolean
}) => {
    const variants = {
        primary: "bg-[#FFD400]",
        accent: "bg-[#FF7A00]",
        outline: "bg-white"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`doodle-border-sm doodle-shadow-sm doodle-clickable px-6 py-3 font-black text-lg uppercase tracking-tight ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        >
            {children}
        </button>
    );
};

export const DoodleInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
        {...props}
        className={`w-full bg-white doodle-border-sm px-4 py-3 outline-none focus:bg-[#FFD400]/10 transition-colors font-bold ${props.className || ""}`}
    />
);

export const DoodleSelect = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <select
        {...props}
        className={`w-full bg-white doodle-border-sm px-4 py-3 outline-none focus:bg-[#FFD400]/10 transition-colors font-black appearance-none ${props.className || ""}`}
    >
        {props.children}
    </select>
);

export const DoodleBadge = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <span className={`inline-block bg-[#FFD400] doodle-border-sm px-3 py-1 text-xs font-black uppercase -rotate-[2deg] ${className}`}>
        {children}
    </span>
);

export const VotePill = ({ count, onUpvote, onDownvote, userVote }: { count: number, onUpvote: () => void, onDownvote: () => void, userVote?: 'up' | 'down' | null }) => (
    <div className="flex items-center gap-2 bg-white doodle-border-sm p-1 doodle-shadow-sm rotate-[1deg]">
        <button
            onClick={onUpvote}
            className={`p-2 doodle-clickable rounded-lg ${userVote === 'up' ? 'bg-green-400' : 'hover:bg-green-100'}`}
        >
            👍
        </button>
        <span className="font-black text-lg px-2 -rotate-[1deg]">{count}</span>
        <button
            onClick={onDownvote}
            className={`p-2 doodle-clickable rounded-lg ${userVote === 'down' ? 'bg-red-400' : 'hover:bg-red-100'}`}
        >
            👎
        </button>
    </div>
);
