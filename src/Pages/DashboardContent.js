import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaUser, FaUsers, FaShoppingCart, FaLongArrowAltRight } from 'react-icons/fa';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import teampassword from './../Assets/Image/teampassword.png';
import AreaChart from '../Charts/AreaChart';
import TableConent from './TableConent';
import OderOverview from '../Component/OderOverview';
import TableContent from './TableConent';
import OrderOverview from '../Component/OderOverview';

function DashboardContent() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const cardData = [
        { title: "Today's Users", count: "53,000", change: "+55%", icon: FaUser, color: "green" },
        { title: "New Clients", count: "1,020", change: "-14%", icon: FaUsers, color: "red" },
        { title: "Total Users", count: "17,000", change: "+8%", icon: FaUsers, color: "green" },
        { title: "Total Sales", count: "$173,000", change: "+15%", icon: FaShoppingCart, color: "green" }
    ];

    const infoCards = [
        {
            title: "Built by Developers",
            description: "Teams Password Dashboard",
            details: "From colors, cards, typography to complex elements, you will find the full documentation.",
            buttonText: "Read More",
            imgSrc: teampassword,
            delay: 0
        },
        {
            title: "Work with the rockets",
            description: "Wealth creation is a revolutionary recent positive-sum game. It is all about who takes the opportunity first.",
            buttonText: "Read More",
            delay: 100
        }
    ];

    return (
        <div className="p-4 px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 card-layout-design-custom">
                {cardData.map((card, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center card-body-custom"
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                    >
                        <div className="card-content-custom">
                            <h2 className="text-lg font-semibold">{card.title}</h2>
                            <p className="text-gray-600 flex items-center">
                                {card.count}
                                <span className={`text-${card.color}-500 mx-1 flex items-center`}>
                                    {card.color === 'green' ? <IoMdArrowDropup className="arrow-icon" /> : <IoMdArrowDropdown className="arrow-icon" />}
                                    {card.change}
                                </span>
                            </p>
                        </div>
                        <div className='icon-background'>
                            <card.icon className="text-white text-2xl" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 pt-6 card-layout-design-custom">
                {infoCards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center second-card-body-custom"
                        data-aos="fade-up"
                        data-aos-delay={card.delay}
                    >
                        <div className="card-second-section-content h-full">
                            <h2 className="text-lg font-semibold">{card.title}</h2>
                            <p>{card.description}</p>
                            {card.details && <h5>{card.details}</h5>}
                            <div className='teams-button-custom flex flex-col'>
                                <button className='flex items-center'>{card.buttonText} <FaLongArrowAltRight className='mx-2' /></button>
                            </div>
                        </div>
                        {card.imgSrc && (
                            <div className='image-box'>
                                <img src={card.imgSrc} alt={card.description} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4 pt-6 card-layout-design-custom">
                <div className="bg-white shadow-md rounded-lg p-6 w-full" data-aos="fade-up" data-aos-delay="200">
                    <AreaChart />
                </div>
            </div>

            <div className="container px-0 p-4 max-w-full">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 last-section-dashboard">
        <div className="col-span-2" data-aos="fade-up">
            <TableContent />
        </div>
        <div data-aos="fade-up" data-aos-delay="100">
            <OrderOverview />
        </div>
    </div>
</div>

        </div>
    );
}

export default DashboardContent;
