/**
 * DoctorSelector Component
 *
 * Dropdown to select which doctor's schedule to view.
 * For front desk staff (can see all doctors).
 *
 * TODO for candidates:
 * 1. Fetch list of all doctors
 * 2. Display in a dropdown/select
 * 3. Show doctor name and specialty
 * 4. Handle selection change
 * 5. Consider using a custom dropdown or native select
 */

'use client';

import { useState, useEffect } from 'react';
import type { Doctor } from '@/types';
import { appointmentService } from '@/services/appointmentService';

interface DoctorSelectorProps {
  selectedDoctorId: string;
  onDoctorChange: (doctorId: string) => void;
}

/**
 * DoctorSelector Component
 *
 * A dropdown to select a doctor from the list of available doctors.
 *
 * TODO: Implement this component
 *
 * Consider:
 * - Should you fetch doctors here or accept them as props?
 * - Native <select> or custom dropdown component?
 * - How to display doctor info (name + specialty)?
 * - Should this be a reusable component?
 */
export function DoctorSelector({
  selectedDoctorId,
  onDoctorChange,
}: DoctorSelectorProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  // Fetch doctors
  useEffect(() => {
    const allDoctors = appointmentService.getAllDoctors();
    setDoctors(allDoctors);
  }, []);

  // Find currently selected doctor for display
  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId);

  return (
    <div className="doctor-selector">
      {/* TODO: Implement the dropdown */}

      {/* Option 1: Native select */}
      <select
        value={selectedDoctorId}
        onChange={(e) => onDoctorChange(e.target.value)}
        className="block w-full px-4 py-2 pr-8 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select a doctor...</option>
        {/* TODO: Map over doctors and create options */}
        {doctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            {/* TODO: Format display text (e.g., "Dr. Sarah Chen - Cardiology") */}
            Dr. {doctor.name} - {doctor.specialty}
          </option>
        ))}
      </select>

      
    </div>
  );
}
