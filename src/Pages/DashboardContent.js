import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaUser, FaUsers, FaShoppingCart, FaLongArrowAltRight } from 'react-icons/fa';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import teampassword from './../Assets/Image/teampassword.png';
import AreaChart from '../Charts/AreaChart';
import TableConent from './TableConent';
import OderOverview from '../Component/OderOverview';

function DashboardContent() {

    useEffect(() => {
        AOS.init({ 
            duration: 1000,
            once: true,  
        });
    }, []);

    return (
        <div className="p-4 px-0">
            <div className="grid grid-cols-1 card-layout-design-custom sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-white card-body-custom shadow-md rounded-lg p-6 flex justify-between items-center" data-aos="fade-up">
                    <div className="card-content-custom">
                        <h2 className="text-lg font-semibold">Today's Users</h2>
                        <p className="text-gray-600 flex items-center">53,000
                            <span className="text-green-500 mx-1 flex items-center">
                                <IoMdArrowDropup className="arrow-icon" /> +55%
                            </span>
                        </p>
                    </div>
                    <div className='icon-background'>
                        <FaUser className="text-white text-2xl" />
                    </div>
                </div>

                <div className="bg-white shadow-md card-body-custom rounded-lg p-6 flex justify-between items-center" data-aos="fade-up" data-aos-delay="100">
                    <div className="card-content-custom">
                        <h2 className="text-lg font-semibold">New Clients</h2>
                        <p className="text-gray-600 flex items-center">1,020
                            <span className="text-red-500 mx-1 flex items-center">
                                <IoMdArrowDropdown className="arrow-icon" /> -14%
                            </span>
                        </p>
                    </div>
                    <div className='icon-background'>
                        <FaUsers className="text-white text-2xl" />
                    </div>
                </div>

                <div className="bg-white shadow-md card-body-custom rounded-lg p-6 flex justify-between items-center" data-aos="fade-up" data-aos-delay="200">
                    <div className="card-content-custom">
                        <h2 className="text-lg font-semibold">Total Users</h2>
                        <p className="text-gray-600 flex items-center">17,000
                            <span className="text-green-500 mx-1 flex items-center">
                                <IoMdArrowDropup className="arrow-icon" /> +8%
                            </span>
                        </p>
                    </div>
                    <div className='icon-background'>
                        <FaUsers className="text-white text-2xl" />
                    </div>
                </div>

                <div className="bg-white shadow-md card-body-custom rounded-lg p-6 flex justify-between items-center" data-aos="fade-up" data-aos-delay="300">
                    <div className="card-content-custom">
                        <h2 className="text-lg font-semibold">Total Sales</h2>
                        <p className="text-gray-600 flex items-center">$173,000
                            <span className="text-green-500 mx-1 flex items-center">
                                <IoMdArrowDropup className="arrow-icon" /> +15%
                            </span>
                        </p>
                    </div>
                    <div className='icon-background'>
                        <FaShoppingCart className="text-white text-2xl" />
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 pt-6 card-layout-design-custom sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
                <div className="bg-white shadow-md second-card-body-custom rounded-lg p-6 flex justify-between items-center" data-aos="fade-up">
                    <div className="card-second-section-content">
                        <h2 className="text-lg font-semibold">Built by Developers</h2>
                        <p className="flex items-center">Teams Password Dashboard</p>
                        <h5>From colors, cards, typography to complex elements, you will find the full documentation.</h5>
                        <div className='teams-button-custom flex flex-col'>
                            <button className='flex items-center'>Read More <FaLongArrowAltRight className='mx-2' /></button>
                        </div>
                    </div>
                    <div className='image-box'>
                        <img src={teampassword} alt="Teams Password Dashboard" />
                    </div>
                </div>
                
                <div className="bg-white shadow-md second-card-body-custom second-card-alignment rounded-lg p-6" data-aos="fade-up" data-aos-delay="100">
                    <div className="card-second-section-content card-second-section-content-alignment">
                        <h2 className="text-lg font-semibold">Work with the rockets</h2>
                        <p className="text-gray-600 flex items-center">Wealth creation is a revolutionary recent positive-sum game. It is all about who takes the opportunity first.</p>
                        <div className='teams-button-custom flex flex-col'>
                            <button className='flex items-center'>Read More <FaLongArrowAltRight className='mx-2' /></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 pt-6 card-layout-design-custom sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4">
                <div className="bg-white shadow-md second-card-body-custom rounded-lg p-6 flex justify-between items-center" data-aos="fade-up" data-aos-delay="200">
                    <AreaChart/>
                </div>
            </div>

            <div className="container p-4 pb-0 px-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="col-span-2" data-aos="fade-up">
                        <TableConent/>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="100">
                        <OderOverview/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardContent;
