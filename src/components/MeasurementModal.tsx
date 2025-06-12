import React, { useState } from 'react';
import { X } from 'lucide-react'; // Make sure this icon is installed via lucide-react or adjust as needed

interface Measurement {
  id: string;
  patientId: string;
  patientName: string;
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

// Modal component for Add/Edit
const MeasurementModal = ({
  isEdit,
  measurement,
  onSave,
  onClose
}: {
  isEdit: boolean;
  measurement: Measurement | null;
  onSave: (measurement: any) => void;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    patientId: measurement?.patientId || '',
    patientName: measurement?.patientName || '',
    testDate: measurement?.testDate || new Date().toISOString().split('T')[0],
    testType: measurement?.testType || 'Static Balance',
    stabilityScore: measurement?.stabilityScore || 0,
    balanceIndex: measurement?.balanceIndex || 0,
    duration: measurement?.duration || 0,
    status: measurement?.status || 'completed',
    notes: measurement?.notes || '',
    deviceId: measurement?.deviceId || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && measurement) {
      onSave({ ...measurement, ...formData });
    } else {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {isEdit ? 'Edit Measurement' : 'Add New Measurement'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields you already wrote go here (kept unchanged) */}
          
          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>

          {/* Submit button */}
          <div className="flex justify-end pt-4 space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
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
