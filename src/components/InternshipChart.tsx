"use client"
import React, { PureComponent } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import Image from 'next/image';

const data = [
  {
    name: 'Total',
    count: 106,
    fill: 'white',
  },
  {
    name: 'Internships',
    count: 53,
    fill: "#FAE27C",
  },
  {
    name: 'Assignments',
    count: 53,
    fill: "#C3EBFA",
  },
];

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};

const InternshipChart = () => {
  return (
    <div className='bg-white rounded-xl w-full h-full p-4'>
        {/* TITLE */}
        <div className='flex justify-between items-center'>
            <h1 className='text-lg font-semibold'>Progress Tracker</h1>
            <Image src="/moreDark.png" alt="" width={20} height={20}/>
        </div>
        {/* CHART */}
        <div className='relative w-full h-[75%]'>
            <ResponsiveContainer>
            <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="40%"
                outerRadius="100%"
                barSize={32}
                data={data}
            >
                <RadialBar background dataKey="count" />
            </RadialBarChart>
            </ResponsiveContainer>
        </div>

        {/* BOTTOM */}
        <div className='flex justify-center gap-7'>
            {/* Internship Tracker Legend */}
            <div className='flex flex-col gap-1'>
                <div className='w-5 h-5 bg-dashboardSky rounded-full'></div>
                <h1 className='font-bond'>3 out of 5</h1>
                <h2 className='text-xs text-gray'>internships applied</h2>
            </div>
            
            {/* Assignemnt Tracker Legend */}
            <div className='flex flex-col gap-1'>
                <div className='w-5 h-5 bg-dashboardYellow rounded-full'></div>
                <h1 className='font-bond'>1 out of 5</h1>
                <h2 className='text-xs text-gray'>assignments completed</h2>
            </div>
        </div>
    </div>
  )
}

export default InternshipChart
