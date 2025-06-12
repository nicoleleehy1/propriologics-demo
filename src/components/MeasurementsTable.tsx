'use client'
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
import MeasurementModal from '@/components/MeasurementModal';
import FiltersAndSearch from './FiltersAndSearch';
import Link from 'next/link';


interface MeasurementsTableProps {
  patient?: string;
  initialMeasurements?: Measurement[];
  showSubjectColumn?: boolean;
}

const MeasurementsTable = ({
  patient,
  initialMeasurements = [],
  showSubjectColumn = true
}: MeasurementsTableProps) => {
  const router = useRouter();

  const [measurements, setMeasurements] = useState<Measurement[]>([
    {
      id: '1',
      patientId: 'P001',
      measurementName: 'Measurement 1',
      testDate: '2025-06-10',
      testType: 'Static Balance',
      stabilityScore: 87.5,
      balanceIndex: 92.1,
      duration: 120,
      status: 'completed',
      notes: 'Excellent progress shown',
      deviceId: 'DEV001',
      createdAt: '2025-06-10T10:30:00Z'
    },
    {
      id: '2',
      patientId: 'P002',
      measurementName: 'Measurement 2',
      testDate: '2025-06-11',
      testType: 'Dynamic Balance',
      stabilityScore: 74.2,
      balanceIndex: 78.9,
      duration: 180,
      status: 'completed',
      notes: 'Some improvement needed',
      deviceId: 'DEV002',
      createdAt: '2025-06-11T14:15:00Z'
    },
    {
      id: '3',
      patientId: 'P003',
      measurementName: 'Measurement 3',
      testDate: '2025-06-12',
      testType: 'Proprioceptive',
      stabilityScore: 91.3,
      balanceIndex: 89.7,
      duration: 150,
      status: 'in-progress',
      notes: 'Test in progress',
      deviceId: 'DEV001',
      createdAt: '2025-06-12T09:00:00Z'
    }
]);
    
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
    const handleAddMeasurement = (newMeasurement: Measurement) => {
      // Ensure id and createdAt exist if not already set
      const measurement: Measurement = {
        ...newMeasurement,
        id: newMeasurement.id || Date.now().toString(),
        createdAt: newMeasurement.createdAt || new Date().toISOString(),
      };
      setMeasurements(prev => [...prev, measurement]);
      setShowAddModal(false);
    };

    // ✅ Updated Edit Handler
    const handleUpdateMeasurement = (updatedMeasurement: Measurement) => {
      setMeasurements(prev =>
        prev.map(m => (m.id === updatedMeasurement.id ? updatedMeasurement : m))
      );
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
      // alert(`Opening detail page for measurement ID: ${measurement.id}\nPatient: ${measurement.measurementName}`);
      router.push(`/measurements/${measurement.id}`);
    };
  
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'completed': return 'bg-green-100 text-green-800';
        case 'in-progress': return 'bg-yellow-100 text-yellow-800';
        case 'failed': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    {/* RENDER ROWS */}
    const renderRow = (item: Measurement) => (
        <tr key={item.id}>
            <td className='flex items-center gap-4 p-4'>
                <div className='flex flex-col'>
                    <h3 className='text-sm font-medium text-gray-900'>Measurement {item.id}</h3>
                    <div className="text-sm text-gray-500">ID: {item.patientId}</div>
                </div>
            </td>
        </tr>
    )

  return (
    <div className=''>
        <FiltersAndSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            testTypeFilter={testTypeFilter}
            setTestTypeFilter={setTestTypeFilter}
        />

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Info</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scores</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedMeasurements.map((measurement) => (
                  <tr 
                    key={measurement.id} 
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => openMeasurementDetail(measurement)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>

                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{measurement.measurementName}</div>
                          <div className="text-sm text-gray-500">ID: {measurement.patientId}</div>
                        </div>

                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{measurement.testType}</div>
                      {/* <div className="text-sm text-gray-500 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {measurement.testDate}
                      </div> */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Stability: {measurement.stabilityScore}%</div>
                      <div className="text-sm text-gray-500">Balance: {measurement.balanceIndex}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(measurement.status)}`}>
                        {measurement.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        {/* <Activity className="w-3 h-3 mr-1" /> */}
                        {measurement.testDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openMeasurementDetail(measurement);
                          }}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMeasurement(measurement);
                            setShowEditModal(true);
                          }}
                          className="text-gray-600 hover:text-gray-900 p-1 rounded"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMeasurementId(measurement.id);
                            setShowDeleteConfirm(true);
                          }}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <MeasurementModal
          isEdit={showEditModal}
          measurement={selectedMeasurement}
          onSave={showEditModal ? handleUpdateMeasurement : handleAddMeasurement}
          onClose={() => {
            setShowAddModal(false);
            setShowEditModal(false);
            setSelectedMeasurement(null);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Delete Measurement</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this measurement? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setSelectedMeasurementId(null);
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => selectedMeasurementId && handleDeleteMeasurement(selectedMeasurementId)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MeasurementsTable