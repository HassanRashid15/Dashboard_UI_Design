import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { FaLinkedin, FaPhoneAlt, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import AOS from 'aos';
import teampasswordlogo from './../../Assets/Image/teampasswordlogo.png';
import userimage from './../../Assets/Image/userimage.png';
import 'aos/dist/aos.css';

function DashboardProfile() {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        AOS.init({
          once: true, 
        });
        
        AOS.refresh();
        
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            setGreeting('Good Morning, User');
        } else if (currentHour < 18) {
            setGreeting('Good Afternoon, User');
        } else {
            setGreeting('Good Evening, User');
        }
    }, []);

  const performanceChartOptions = {
    chart: {
      id: 'performance-chart',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value}%`,
      },
    },
    colors: ['#00BFFF'],
    stroke: {
      curve: 'smooth',
    },
    dataLabels: {
      enabled: false,
    },
  };

  const performanceChartSeries = [
    {
      name: 'Performance',
      data: [30, 40, 35, 50, 49, 60, 70],
    },
  ];

  const successChartOptions = {
    chart: {
      id: 'success-chart',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ['Q1', 'Q2', 'Q3', 'Q4'],
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value}%`,
      },
    },
    colors: ['#32CD32'],
    stroke: {
      curve: 'smooth',
    },
    dataLabels: {
      enabled: false,
    },
  };

  const successChartSeries = [
    {
      name: 'Success Rate',
      data: [40, 60, 70, 90],
    },
  ];

  const innovationChartOptions = {
    chart: {
      id: 'innovation-chart',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value} Ideas`,
      },
    },
    colors: ['#FF4500'],
    stroke: {
      curve: 'smooth',
    },
    dataLabels: {
      enabled: false,
    },
  };

  const innovationChartSeries = [
    {
      name: 'Innovations',
      data: [5, 10, 15, 20],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8 px-0">
      <div className="flex justify-between items-center" data-aos="fade-down">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{greeting}</h1>
          <p className="text-gray-500">Let's see how you are doing</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center relative" data-aos="zoom-in">
          <img
            src={userimage} 
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h2 className="text-lg font-bold text-gray-800">Hassan Rashid</h2>
          <p className="text-gray-500 mb-4">UI/UX Designer</p>
          <div className="flex justify-center items-center space-x-2">
            <FaPhoneAlt className="text-gray-500" />
            <p className="text-gray-500">+92-761618750-9</p>
          </div>
          <div className="flex justify-center items-center space-x-2 mt-2">
            <FaMapMarkerAlt className="text-gray-500" />
            <p className="text-gray-500">Lahore, Pakistan</p>
          </div>
          <div className="absolute top-4 right-4">
            <img style={{width:"40px"}} src={teampasswordlogo}/>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg lg:col-span-2 flex items-center justify-between transition-transform transform hover:scale-105 duration-300 ease-in-out aos-init aos-animate" data-aos="fade-up">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Start where you left</h3>
            <p className="text-gray-500">Complete the two hours design sprint</p>
          </div>
          <button className="bg-blue-600 project-profile-button text-white px-4 py-2 rounded-lg flex items-center space-x-2 md:space-x-0 md:space-x-2">
            <span className="hidden md:block">Jump to the project</span>
            <FaArrowRight className="block md:hidden" />
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 lg:mt-0 lg:col-span-3">
          <div className="bg-gray-50 p-4 rounded-lg flex flex-col justify-center text-center border border-gray-300" data-aos="flip-left">
            <p className="text-sm text-gray-500">Active goals</p>
            <h3 className="text-xl font-bold text-gray-800">3</h3>
          </div>
          <div className="bg-gray-50 p-4 flex flex-col justify-center rounded-lg text-center border border-gray-300" data-aos="flip-right">
            <p className="text-sm text-gray-500">Progress</p>
            <h3 className="text-xl font-bold text-gray-800">40%</h3>
          </div>
          <div className="bg-gray-50 p-4 flex flex-col justify-center rounded-lg text-center border border-gray-300" data-aos="flip-left">
            <p className="text-sm text-gray-500">Completed Task</p>
            <h3 className="text-xl font-bold text-gray-800">6</h3>
          </div>
          <div className="bg-gray-50 p-4 flex flex-col justify-center rounded-lg text-center border border-gray-300" data-aos="flip-right">
            <p className="text-sm text-gray-500">Due Tasks</p>
            <h3 className="text-xl font-bold text-gray-800">2</h3>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-right">
          <h3 className="text-lg font-semibold text-gray-800">Performance</h3>
          <p className="text-gray-500">Based on work</p>
          <div className="mt-4 rounded-lg p-4 border border-gray-300">
            <ApexCharts
              options={performanceChartOptions}
              series={performanceChartSeries}
              type="line"
              height={300}
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up">
          <h3 className="text-lg font-semibold text-gray-800">Success</h3>
          <p className="text-gray-500">Based on Projects</p>
          <div className="mt-4 rounded-lg p-4 border border-gray-300">
            <ApexCharts
              options={successChartOptions}
              series={successChartSeries}
              type="bar"
              height={300}
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-left">
          <h3 className="text-lg font-semibold text-gray-800">Innovation</h3>
          <p className="text-gray-500">Worked Ideas</p>
          <div className="mt-4 rounded-lg p-4 border border-gray-300">
            <ApexCharts
              options={innovationChartOptions}
              series={innovationChartSeries}
              type="area"
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardProfile;
