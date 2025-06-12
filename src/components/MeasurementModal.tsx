import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface Measurement {
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

const MeasurementModal = ({
  isEdit,
  measurement,
  onSave,
  onClose,
}: {
  isEdit: boolean;
  measurement: Measurement | null;
  onSave: (measurement: Measurement) => void;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState<Omit<Measurement, 'id' | 'createdAt'>>({
    patientId: '',
    measurementName: '',
    testDate: new Date().toISOString().split('T')[0],
    testType: 'Static Balance',
    stabilityScore: 0,
    balanceIndex: 0,
    duration: 0,
    status: 'completed',
    notes: '',
    deviceId: '',
    file: null,
  });

  // If editing, populate fields
  useEffect(() => {
    if (isEdit && measurement) {
      const { id, createdAt, ...rest } = measurement;
      setFormData(rest);
    }
  }, [isEdit, measurement]);

  const handleChange = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEdit && measurement) {
      onSave({ ...measurement, ...formData });
    } else {
      onSave({
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        ...formData,
      });
    }

    onClose(); // Optional: auto-close after save
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">
            {isEdit ? 'Edit Measurement' : 'Add New Measurement'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Patient ID</label>
              <input
                type="text"
                value={formData.patientId}
                onChange={(e) => handleChange('patientId', e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Measurement Name</label>
              <input
                type="text"
                value={formData.measurementName}
                onChange={(e) => handleChange('measurementName', e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Test Date</label>
              <input
                type="date"
                value={formData.testDate}
                onChange={(e) => handleChange('testDate', e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Test Type</label>
              <select
                value={formData.testType}
                onChange={(e) => handleChange('testType', e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="Static Balance">Static Balance</option>
                <option value="Dynamic Balance">Dynamic Balance</option>
                <option value="Postural Control">Postural Control</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Stability Score</label>
              <input
                type="number"
                value={formData.stabilityScore}
                onChange={(e) => handleChange('stabilityScore', Number(e.target.value))}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Balance Index</label>
              <input
                type="number"
                value={formData.balanceIndex}
                onChange={(e) => handleChange('balanceIndex', Number(e.target.value))}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Duration (sec)</label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => handleChange('duration', Number(e.target.value))}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value as Measurement['status'])}
                className="w-full p-2 border rounded-md"
              >
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Device ID</label>
              <input
                type="text"
                value={formData.deviceId}
                onChange={(e) => handleChange('deviceId', e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              className="w-full p-2 border rounded-md"
              rows={3}
              placeholder="Optional notes about this measurement"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {isEdit ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MeasurementModal;
