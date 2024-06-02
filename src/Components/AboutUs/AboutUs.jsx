import React from 'react';
import team from '../../assets/images/team/team.png'
const AboutUs = () => {
    return (
        <div className='container mx-auto mt-28'>
            {/* HEADING HAER */}
            <div className="max-w-2xl mx-auto mb-16 text-center">
                <span className="font-bold tracking-wider uppercase dark:text-violet-600">About Us</span>
                <h2 className="text-4xl font-bold lg:text-5xl">Our growing up</h2>
            </div>


            <div className='flex flex-col md:flex-row gap-5 lg:gap-10 mt-16'>
                {/* CONTENT SECTION */}
                <div className='md:w-1/2 shadow-sm p-6 rounded-md'>
                    <div>
                        <h4 className='text-[#ff6916] uppercase tracking-[4px]'>How we Started</h4>
                        <h2 className='text-4xl lg:text-6xl my-4 font-bold'>Our Dream is Providing Best Service wih Honestly</h2>

                        <span className='space-y-2 text-justify'>
                            <p className='text-justify'>
                                At Asset Nexus Tower, we understand the vital role that assets play in the success of any business. Whether you're a small startup or a multinational corporation, efficiently managing and leveraging your assets can make all the difference in achieving your organizational goals. That's where we come in.</p>

                            <h3 className='font-bold'>Asset Evaluation and Optimization</h3>

                            <p>Our first step is to conduct a thorough evaluation of your existing assets. We analyze their performance, identify areas for improvement, and devise strategies to optimize their potential. Through meticulous data analysis and industry expertise, we uncover hidden opportunities to enhance efficiency, reduce costs, and maximize returns on your investments.</p>

                            <h3 className='font-bold'>Tailored Asset Management Solutions</h3>

                            <p>
                                Every business is unique, and so are its asset management needs. That's why we don't believe in one-size-fits-all solutions. Our team works closely with you to understand your specific requirements and challenges. Whether it's streamlining your supply chain, improving maintenance processes, or implementing cutting-edge technology solutions, we tailor our services to meet your objectives and exceed your expectations.
                            </p>

                            <h3 className='font-bold'>Proactive Maintenance and Support</h3>



                            <p>Preventive maintenance is key to prolonging the lifeh3 of your assets and minimizing downtime. Our proactive approach ensures that potential issues are identified and addressed before they escalate into costly problems. From routine inspections to emergency repairs, our dedicated team is available around the clock to keep your operations running smoothly.</p>
                        </span>
                    </div>
                </div>

                {/* IMAGE SECTION */}
                <div className='md:w-1/2 flex flex-col items-center shadow-sm p-6'>
                    <div className='w-full'>
                        <img className='rounded-lg w-full' src={team} alt="" />
                    </div>

                    <div className='grid grid-cols-2 gap-5 mt-8 w-full'>
                        <div className='border p-6 rounded-md shadow-sm'>
                            <h3 className="text-4xl font-bold">2.5+</h3>
                            <p>Years Experiences</p>
                        </div>
                        <div className='border p-6 rounded-md shadow-sm'>
                            <h3 className="text-4xl font-bold">100+</h3>
                            <p>Companies Connected</p>
                        </div>
                        <div className='border p-6 rounded-md shadow-sm'>
                            <h3 className="text-4xl font-bold">600+</h3>
                            <p>Employees</p>
                        </div>
                        <div className='border p-6 rounded-md shadow-sm'>
                            <h3 className="text-4xl font-bold">4.9+</h3>
                            <p>Reviews</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AboutUs;