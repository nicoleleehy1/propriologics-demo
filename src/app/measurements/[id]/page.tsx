import DistributionGraph from "@/components/DistributionGraph"
import { ChartAreaInteractive } from "@/components/LineChart"
import Navbar from "@/components/Navbar"


const AdminPage = () => {
  return (
    <div>
      <Navbar theme='light'/>
      <div className='p-4 flex gap-4 flex-col md:flex-row'>
        {/* LEFT */}
        <div className='w-full lg:w-2/3 flex flex-col gap-8'>
        <span className="text-[20px]">Dashboard</span>
        
        
        {/* USER CARDS */}
          <div className="flex gap-4 justify-between flex-wrap">
              {/* Card */}
          </div>

        {/* MIDDLE CHARTS */}
          <div className="flex gap-4 flex-col lg:flex-row">
            <DistributionGraph />
            {/* PROGRESS TRACKER CHART */}
            <div className="w-full lg:w-1/3 h-[450px]">
              {/* Pie Chart */}
            </div>

            {/* ATTENDANCE CHART */}
            <div className="w-full lg:w-2/3 h-[400px]">
            </div>

          </div>

          {/* BOTTOM CHARTS */}
          <div className="">
            
          </div>
        </div>
        
        {/* RIGHT */}
        <div className='w-full lg:w-1/3 flex flex-col gap-8'>
          <ChartAreaInteractive
              title="Lateral"
              description="Lateral movement graphed over XY Time."
          />
          <ChartAreaInteractive
              title="Directional"
          />
          <ChartAreaInteractive
              title="Anteroposterior"
          />
        </div>
      </div>
    </div>
    
  )
}

export default AdminPage