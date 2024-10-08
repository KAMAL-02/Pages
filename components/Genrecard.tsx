import Link from 'next/link';
import React from 'react';

interface GenreCardProps {
    title: string;
    summary: string;
    thumb: string;
    link: string;
}

const GenreCard: React.FC<GenreCardProps> = ({ title, summary, thumb, link }) => {
    return (
        <div className="bg-white bg-opacity-5 text-white rounded-lg shadow-md flex p-4 hover:shadow-lg transition-shadow duration-300">
            <div className="flex-shrink-0 mr-4">
                <img src={thumb} alt={title} className="h-40 w-24 object-cover rounded-lg" />
            </div>
            <div className="flex-grow">
                <h3 className="text-xl font-semibold" style={{ fontFamily: 'Balthazar, sans-serif' }}>{title}</h3>
                <p className="text-sm" style={{ fontFamily: 'Titillium Web, sans-serif' }}>{summary.length > 80 ? `${summary.substring(0, 80)}...` : summary}</p>
                <Link href={link} className="text-blue-400 mt-2 inline-block">Read more</Link>
            </div>
        </div>
    );
};

export default GenreCard;
