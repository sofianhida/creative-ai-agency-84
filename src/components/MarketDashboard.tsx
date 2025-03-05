
import React from 'react';
import { Clock, AlertTriangle, Bell, User, BarChart2, Calendar, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const MarketDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="dashboard-coming-soon">
        <div className="coming-soon-animation">
          <div className="circle"></div>
        </div>
        
        <h2>Dashboard Coming Soon</h2>
        <p>
          We're building a powerful dashboard for you to manage your AI products, view analytics, and track performance.
          The dashboard will be available in the next update.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-purple/10 hover:shadow-md transition hover:border-purple/20">
            <BarChart2 size={24} className="text-purple mb-3" />
            <h3 className="font-semibold mb-1">AI Performance Analytics</h3>
            <p className="text-sm text-muted-foreground">Track usage metrics and performance data</p>
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-sm border border-purple/10 hover:shadow-md transition hover:border-purple/20">
            <User size={24} className="text-purple mb-3" />
            <h3 className="font-semibold mb-1">User Management</h3>
            <p className="text-sm text-muted-foreground">Manage access rights and permissions</p>
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-sm border border-purple/10 hover:shadow-md transition hover:border-purple/20">
            <Bell size={24} className="text-purple mb-3" />
            <h3 className="font-semibold mb-1">Notifications Center</h3>
            <p className="text-sm text-muted-foreground">Stay updated with important alerts</p>
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-sm border border-purple/10 hover:shadow-md transition hover:border-purple/20">
            <Calendar size={24} className="text-purple mb-3" />
            <h3 className="font-semibold mb-1">Schedule & Planning</h3>
            <p className="text-sm text-muted-foreground">Plan AI campaigns and schedules</p>
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-sm border border-purple/10 hover:shadow-md transition hover:border-purple/20">
            <Activity size={24} className="text-purple mb-3" />
            <h3 className="font-semibold mb-1">Real-time Monitoring</h3>
            <p className="text-sm text-muted-foreground">Watch live AI interactions</p>
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-sm border border-purple/10 hover:shadow-md transition hover:border-purple/20">
            <AlertTriangle size={24} className="text-purple mb-3" />
            <h3 className="font-semibold mb-1">Issue Tracking</h3>
            <p className="text-sm text-muted-foreground">Monitor and resolve AI issues</p>
          </div>
        </div>
        
        <div className="mt-8">
          <Link to="/marketplace" className="btn-primary inline-flex items-center py-2.5 px-6">
            <Clock size={18} className="mr-2" /> Notify Me When Available
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarketDashboard;
