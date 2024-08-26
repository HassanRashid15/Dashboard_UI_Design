import React from 'react';

function Footer() {
  return (
    <div className="bg-white footer-parent-custom">
      <div className="bg-white shadow-custom"> 
        <div className="max-w-screen-lg px-4 sm:px-6 text-gray-800 sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto footer-alignment-custom">
          <div className="p-5 footer-company-link">
            <h3 className="font-bold text-xl text-indigo-600">Team Password</h3>
          </div>
          <div className="p-5 resources-layout-custom">
            <div className="text-sm footer-text-color uppercase text-indigo-600 font-bold">Resources</div>
            <a className="my-3 block" href="/#">Documentation <span className="text-teal-600 text-xs p-1"></span></a>
            <a className="my-3 block" href="/#">Tutorials <span className="text-teal-600 text-xs p-1"></span></a>
            <a className="my-3 block" href="/#">Support</a>
          </div>
          <div className="p-5 support-custom-link">
            <div className="text-sm footer-text-color uppercase text-indigo-600 font-bold">Support</div>
            <a className="my-3 block" href="/#">Help Center <span className="text-teal-600 text-xs p-1"></span></a>
            <a className="my-3 block" href="/#">Privacy Policy <span className="text-teal-600 text-xs p-1"></span></a>
            <a className="my-3 block" href="/#">Conditions <span className="text-teal-600 text-xs p-1"></span></a>
          </div>
          <div className="p-5 contactus-layout-custom">
            <div className="text-sm footer-text-color uppercase text-indigo-600 font-bold">Contact us</div>
            <a className="my-3 block" href="/#">XXX XXXX, Floor 4 San Francisco, CA
              <span className="text-teal-600 text-xs p-1"></span></a>
            <a className="my-3 block" href="/#">contact@company.com
              <span className="text-teal-600 text-xs p-1"></span></a>
          </div>
        </div>
      </div>

      <div className="bg-white pt-2">
        <div className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col max-w-screen-lg items-center">
          <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
            <a href="/#" className="w-6 mx-1">
              {/* Add icon here */}
            </a>
            <a href="/#" className="w-6 mx-1">
              {/* Add icon here */}
            </a>
            <a href="/#" className="w-6 mx-1">
              {/* Add icon here */}
            </a>
            <a href="/#" className="w-6 mx-1">
              {/* Add icon here */}
            </a>
            <a href="/#" className="w-6 mx-1">
              {/* Add icon here */}
            </a>
          </div>
          <div className="my-5">© Copyright 2020. All Rights Reserved.</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
