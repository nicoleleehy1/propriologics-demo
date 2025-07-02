"use client"
import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Upload, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  Download,
  Filter,
  MoreVertical,
  ChevronRight,
  Calendar,
  User,
  Activity,
  X,
  Check,
  AlertCircle
} from 'lucide-react';
import MeasurementModal from '@/components/MeasurementModal';
import Navbar from '@/components/Navbar';
import MeasurementsTable from '@/components/MeasurementsTable';


export type Measurement = {
  id: string;
  patientId: string;
  measurementName: string;
  testDate: string;
  testType: string;
  stabilityScore: number;
  balanceIndex: number;
  duration: number;
  status: 'completed' | 'in-progress' | 'failed';
  notes?: string;
  deviceId: string;
  createdAt: string;
  file?: File | null;
}

interface MeasurementsTableProps {
  measurement?: string;
  initialMeasurements?: Measurement[];
  showSubjectColumn?: boolean;
}


const columns = [
    {
        header: "Measurement",
        accessor: "title",
    },
    {
        header: "Test Info",
        accessor: "subject",
        className: "hidden md:table-cell",
    },
    {
        header: "Scores",
        accessor: "resourceType",
        className: "hidden lg:table-cell",
    },
    {
        header: "Status",
        accessor: "dateAdded",
        className: "hidden md:table-cell",
    },
    {
        header: "Date Added",
        accessor: "testDate",
        className: "hidden md:table-cell",
    },
    {
        header: "Actions",
        accessor: "action",
    },
]


const MeasurementsPage = ({
  measurement,
  initialMeasurements = [],
  showSubjectColumn = true
}: MeasurementsTableProps) => {
  const [measurements, setMeasurements] = useState<Measurement[]>(initialMeasurements);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [testTypeFilter, setTestTypeFilter] = useState('all');

  // Add / Edit
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMeasurement, setSelectedMeasurement] = useState<Measurement | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMeasurementId, setSelectedMeasurementId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const itemsPerPage = 10;

  {/* Filter measurements */}
  const filteredMeasurements = measurements.filter(measurement => {
    const matchesSearch = 
      measurement.measurementName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      measurement.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      measurement.testType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || measurement.status === statusFilter;
    const matchesTestType = testTypeFilter === 'all' || measurement.testType === testTypeFilter;
    
    return matchesSearch && matchesStatus && matchesTestType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMeasurements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMeasurements = filteredMeasurements.slice(startIndex, startIndex + itemsPerPage);


  {/* FUNCTIONS */}
  const handleAddMeasurement = (newMeasurement: Omit<Measurement, 'id' | 'createdAt'>) => {
    const measurement: Measurement = {
      ...newMeasurement,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setMeasurements([...measurements, measurement]);
    setShowAddModal(false);
  };

  const handleUpdateMeasurement = (updatedMeasurement: Measurement) => {
    setMeasurements(measurements.map(m => 
      m.id === updatedMeasurement.id ? updatedMeasurement : m
    ));
    setShowEditModal(false);
    setSelectedMeasurement(null);
  };

  const handleDeleteMeasurement = (id: string) => {
    setMeasurements(measurements.filter(m => m.id !== id));
    setShowDeleteConfirm(false);
    setSelectedMeasurementId(null);
  };

  const handleCSVImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      
      const newMeasurements: Measurement[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
          const values = lines[i].split(',').map(v => v.trim());
          const measurement: Measurement = {
            id: Date.now().toString() + i,
            patientId: values[0] || '',
            measurementName: values[1] || '',
            testDate: values[2] || '',
            testType: values[3] || '',
            stabilityScore: parseFloat(values[4]) || 0,
            balanceIndex: parseFloat(values[5]) || 0,
            duration: parseInt(values[6]) || 0,
            status: (values[7] as 'completed' | 'in-progress' | 'failed') || 'completed',
            notes: values[8] || '',
            deviceId: values[9] || '',
            createdAt: new Date().toISOString()
          };
          newMeasurements.push(measurement);
        }
      }
      
      setMeasurements([...measurements, ...newMeasurements]);
    };
    
    reader.readAsText(file);
    event.target.value = '';
  };

  const exportToCSV = () => {
    const headers = ['Patient ID', 'Patient Name', 'Test Date', 'Test Type', 'Stability Score', 'Balance Index', 'Duration', 'Status', 'Notes', 'Device ID'];
    const csvContent = [
      headers.join(','),
      ...filteredMeasurements.map(m => [
        m.patientId,
        m.measurementName,
        m.testDate,
        m.testType,
        m.stabilityScore,
        m.balanceIndex,
        m.duration,
        m.status,
        m.notes || '',
        m.deviceId
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'measurements.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const openMeasurementDetail = (measurement: Measurement) => {
    // In a real app, this would navigate to a detail page
    alert(`Opening detail page for measurement ID: ${measurement.id}\nPatient: ${measurement.measurementName}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

        <Navbar theme="dark"/>
      {/* Header */}
      <div className="pl-5 -b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-30">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Measurements</h1>
              <p className="text-gray-600 mt-1">Manage patient balance measurements and test results</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Import CSV</span>
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Measurement</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        

        <MeasurementsTable />

        {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredMeasurements.length)}</span> of{' '}
                    <span className="font-medium">{filteredMeasurements.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          page === currentPage
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>


      {/* Hidden file input for CSV import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleCSVImport}
        className="hidden"
      />

    </div>
  );
};

export default MeasurementsPage;

