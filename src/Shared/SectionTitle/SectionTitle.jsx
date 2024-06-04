import React from 'react';

const SectionTitle = ({heading, subTitle}) => {
    return (
        <div className="max-w-2xl mx-auto mb-16 mt-20 text-center">
            <span className="font-bold tracking-wider uppercase dark:text-violet-600">{subTitle}</span>
            <h2 className="text-4xl font-bold lg:text-5xl">{heading}</h2>
        </div>
    );
};

export default SectionTitle;