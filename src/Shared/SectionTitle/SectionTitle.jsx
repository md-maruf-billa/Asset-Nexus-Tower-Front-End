import React from 'react';

const SectionTitle = ({heading, subTitle,style}) => {
    return (
        <div className={`max-w-2xl mx-auto my-20 text-center ${style}`}>
            <span className="font-bold tracking-wider uppercase dark:text-violet-600">{subTitle}</span>
            <h2 className="text-4xl font-bold lg:text-5xl">{heading}</h2>
        </div>
    );
};

export default SectionTitle;