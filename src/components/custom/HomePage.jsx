import Image from 'next/image'
import React from 'react'
import hero from "../../../public/hero2.png"
import { features } from '../../../public/data/features'
import { Button } from '../ui/button'
import Graph from './Graph'
const HomePage = () => {
  return (
<>
{/* hero section  */}
    <section className=' min-h-screen min-w-full bg-[#0f172a] text-white py-12 px-6'>
      {/* hero section  */}
      <section className='w-full pt-4  flex justify-between items-center '>

        <div className='w-1/2 p-4 space-y-4 text-white'>
            <h4 className='text-7xl font-bold'>
              Workflow Tracker
            </h4>
            <p className='text-md'>
            Empower your academic journey with AI-powered workflow tracking tailored for students.
              Track your daily work, set goals, and be ahead with AI – all in one modern platform.
            </p>
            <ol className='flex  justify-between'>
               <li className='text-2xl shadow-lg font-semibold' >Track Your Daily Work</li>
              <li className='text-2xl shadow-lg font-semibold' >Set Goals</li>
                <li className='text-2xl shadow-lg font-semibold' >Be Ahead with AI</li>
             
            </ol>
          </div>
        <div className='w-1/2 justify-center  flex items-center p-4'>
          <Image
          src={hero}
          height={500}
          width="full"
          />
        </div>
          
      </section>

          {/* features  */}
         <section className="bg-[#0f172a] text-white ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Key Features</h2>
        <p className="mb-10 text-gray-300">
          StudyFlow offers a comprehensive suite of tools designed to enhance your study habits and academic performance.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#1e293b] p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
          

            {/* cta  */}

    <section className='flex items-center justify-center flex-col mt-16 gap-3'>
          <p className='text-3xl font-bold'>
            Ready To Transform Your Study Habbits?
          </p>
          <p>
            Join thousands of student who are achieving their academic goals with StudyFlow
          </p>
          
    </section>
      <Graph/>
<section className='bg-[#0f172a] text-white py-12'>
  <div className='max-w-6xl mx-auto text-center space-y-8'>
    <h2 className='text-3xl font-bold'>How It Works</h2>
    <div className='grid md:grid-cols-3 gap-6 text-left'>
      {[
        {
          title: "Step 1: Add Subjects",
          desc: "Start by listing all your subjects to personalize your dashboard.",
        },
        {
          title: "Step 2: Log Sessions",
          desc: "Track your daily progress with smart session logs and AI tips.",
        },
        {
          title: "Step 3: Set & Smash Goals",
          desc: "Set goals with AI help and monitor completion over time.",
        },
      ].map((step, idx) => (
        <div key={idx} className='bg-[#1e293b] p-6 rounded-lg'>
          <h3 className='text-xl font-semibold mb-2'>{step.title}</h3>
          <p className='text-gray-400'>{step.desc}</p>
        </div>
      ))}
    </div>
    <Button className='bg-blue-500'>
              Get Started
          </Button>
  </div>
</section>


    </section>


</>
  )
}

export default HomePage