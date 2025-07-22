import React, { useState, useEffect } from 'react';
import { Activity, Users, Bed, AlertTriangle, Clock, Heart, Zap, TrendingUp, UserCheck, Building2 } from 'lucide-react';

interface PatientMetrics {
  totalPatients: number;
  admissions: number;
  discharges: number;
  bedOccupancy: number;
  totalBeds: number;
  waitingRoom: number;
}

interface StaffMetrics {
  doctors: number;
  nurses: number;
  totalStaff: number;
  onDuty: number;
}

interface Alert {
  id: number;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  department: string;
}

interface DepartmentStatus {
  name: string;
  occupancy: number;
  capacity: number;
  status: 'normal' | 'busy' | 'critical';
}

interface EquipmentStatus {
  name: string;
  available: number;
  total: number;
  maintenance: number;
}

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [patientMetrics, setPatientMetrics] = useState<PatientMetrics>({
    totalPatients: 342,
    admissions: 23,
    discharges: 18,
    bedOccupancy: 287,
    totalBeds: 350,
    waitingRoom: 15
  });

  const [staffMetrics, setStaffMetrics] = useState<StaffMetrics>({
    doctors: 45,
    nurses: 128,
    totalStaff: 245,
    onDuty: 189
  });

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: 'critical',
      message: 'ICU at 95% capacity - prepare overflow protocols',
      timestamp: '14:32',
      department: 'ICU'
    },
    {
      id: 2,
      type: 'warning',
      message: 'Emergency department wait time exceeds 2 hours',
      timestamp: '14:28',
      department: 'Emergency'
    },
    {
      id: 3,
      type: 'info',
      message: 'Scheduled maintenance completed in OR-3',
      timestamp: '14:15',
      department: 'Surgery'
    }
  ]);

  const [departments] = useState<DepartmentStatus[]>([
    { name: 'Emergency', occupancy: 42, capacity: 45, status: 'critical' },
    { name: 'ICU', occupancy: 28, capacity: 30, status: 'critical' },
    { name: 'General Ward', occupancy: 156, capacity: 180, status: 'busy' },
    { name: 'Surgery', occupancy: 8, capacity: 12, status: 'normal' },
    { name: 'Pediatrics', occupancy: 23, capacity: 35, status: 'normal' },
    { name: 'Cardiology', occupancy: 18, capacity: 25, status: 'normal' }
  ]);

  const [equipment] = useState<EquipmentStatus[]>([
    { name: 'Ventilators', available: 23, total: 28, maintenance: 2 },
    { name: 'MRI Machines', available: 3, total: 4, maintenance: 0 },
    { name: 'CT Scanners', available: 5, total: 6, maintenance: 1 },
    { name: 'X-Ray Units', available: 12, total: 15, maintenance: 0 }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Simulate random patient metrics updates
      if (Math.random() < 0.3) {
        setPatientMetrics(prev => ({
          ...prev,
          totalPatients: prev.totalPatients + (Math.random() > 0.5 ? 1 : -1),
          admissions: prev.admissions + (Math.random() > 0.7 ? 1 : 0),
          discharges: prev.discharges + (Math.random() > 0.8 ? 1 : 0),
          waitingRoom: Math.max(0, prev.waitingRoom + (Math.random() > 0.6 ? 1 : -1))
        }));
      }

      // Simulate staff updates
      if (Math.random() < 0.2) {
        setStaffMetrics(prev => ({
          ...prev,
          onDuty: Math.max(150, Math.min(200, prev.onDuty + (Math.random() > 0.5 ? 1 : -1)))
        }));
      }
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'busy': return 'text-orange-600 bg-orange-100';
      case 'normal': return 'text-green-600 bg-green-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-l-red-500 bg-red-50';
      case 'warning': return 'border-l-yellow-500 bg-yellow-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  const getOccupancyStatus = (occupancy: number, capacity: number) => {
    const percentage = (occupancy / capacity) * 100;
    if (percentage >= 90) return 'critical';
    if (percentage >= 75) return 'busy';
    return 'normal';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">PulseWatch</h1>
                <p className="text-sm text-slate-600">Healthcare Operations Center</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-2xl font-mono font-bold text-slate-900">{formatTime(currentTime)}</div>
                <div className="text-sm text-slate-600">{currentTime.toLocaleDateString()}</div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">System Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Patients</p>
                <p className="text-3xl font-bold text-slate-900">{patientMetrics.totalPatients}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">+{patientMetrics.admissions} today</span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Bed Occupancy</p>
                <p className="text-3xl font-bold text-slate-900">{patientMetrics.bedOccupancy}/{patientMetrics.totalBeds}</p>
                <div className="flex items-center mt-2">
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(patientMetrics.bedOccupancy / patientMetrics.totalBeds) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-slate-600 ml-2">{Math.round((patientMetrics.bedOccupancy / patientMetrics.totalBeds) * 100)}%</span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Bed className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Staff On Duty</p>
                <p className="text-3xl font-bold text-slate-900">{staffMetrics.onDuty}/{staffMetrics.totalStaff}</p>
                <div className="flex items-center mt-2 space-x-4">
                  <span className="text-sm text-slate-600">Docs: {staffMetrics.doctors}</span>
                  <span className="text-sm text-slate-600">Nurses: {staffMetrics.nurses}</span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <UserCheck className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Waiting Room</p>
                <p className="text-3xl font-bold text-slate-900">{patientMetrics.waitingRoom}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-orange-600">Avg: 45 min</span>
                </div>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Department Status */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-slate-600" />
                <h2 className="text-lg font-semibold text-slate-900">Department Status</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(getOccupancyStatus(dept.occupancy, dept.capacity))}`}>
                        {getOccupancyStatus(dept.occupancy, dept.capacity).toUpperCase()}
                      </div>
                      <span className="font-medium text-slate-900">{dept.name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium text-slate-900">{dept.occupancy}/{dept.capacity}</div>
                        <div className="text-xs text-slate-600">{Math.round((dept.occupancy / dept.capacity) * 100)}% occupied</div>
                      </div>
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            getOccupancyStatus(dept.occupancy, dept.capacity) === 'critical' ? 'bg-red-500' :
                            getOccupancyStatus(dept.occupancy, dept.capacity) === 'busy' ? 'bg-orange-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(dept.occupancy / dept.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alerts Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-slate-600" />
                  <h2 className="text-lg font-semibold text-slate-900">Live Alerts</h2>
                </div>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                  {alerts.filter(a => a.type === 'critical').length} Critical
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`border-l-4 p-4 rounded-r-lg ${getAlertColor(alert.type)} hover:shadow-md transition-shadow`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{alert.message}</p>
                        <div className="flex items-center mt-2 space-x-3">
                          <span className="text-xs text-slate-600">{alert.department}</span>
                          <span className="text-xs text-slate-600">{alert.timestamp}</span>
                        </div>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${alert.type === 'critical' ? 'bg-red-500 animate-pulse' : alert.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Equipment Status */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-slate-600" />
              <h2 className="text-lg font-semibold text-slate-900">Equipment Status</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {equipment.map((item, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-slate-900">{item.name}</h3>
                    <Heart className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Available</span>
                      <span className="font-medium text-green-600">{item.available}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">In Use</span>
                      <span className="font-medium text-blue-600">{item.total - item.available - item.maintenance}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Maintenance</span>
                      <span className="font-medium text-orange-600">{item.maintenance}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-3">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(item.available / item.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;