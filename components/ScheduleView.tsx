/**
 * ScheduleView Component
 *
 * Main component that orchestrates the schedule display.
 * This component should compose smaller components together.
 *
 * TODO for candidates:
 * 1. Create the component structure (header, controls, calendar)
 * 2. Compose DoctorSelector, DayView, WeekView together
 * 3. Handle view switching (day vs week)
 * 4. Manage state or use the useAppointments hook
 * 5. Think about component composition and reusability
 */

'use client';

import { useState } from 'react';
import { addDays, startOfWeek, format } from 'date-fns';
import type { CalendarView } from '@/types';

// Import your components
import { DoctorSelector } from './DoctorSelector';
import { DayView } from './DayView';
import { WeekView } from './WeekView';
import { useAppointments } from '@/hooks/useAppointments';

interface ScheduleViewProps {
  selectedDoctorId: string;
  selectedDate: Date;
  view: CalendarView;
  onDoctorChange: (doctorId: string) => void;
  onDateChange: (date: Date) => void;
  onViewChange: (view: CalendarView) => void;
}

/**
 * ScheduleView Component
 *
 * This is the main container component for the schedule interface.
 *
 * TODO: Implement this component
 *
 * Consider:
 * - How to structure the layout (header, controls, calendar)
 * - How to compose smaller components
 * - How to pass data down to child components
 * - How to handle user interactions (view switching, date changes)
 */
export function ScheduleView({
  selectedDoctorId,
  selectedDate,
  view,
  onDoctorChange,
  onDateChange,
  onViewChange,
}: ScheduleViewProps) {
  // Use the useAppointments hook to fetch data
  const { appointments, doctor, loading, error } = useAppointments({
    doctorId: selectedDoctorId,
    date: selectedDate,
  });

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* TODO: Implement the component structure */}

      {/* Header with doctor info and controls */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Doctor Schedule</h2>
            <p className="text-sm text-gray-600 mt-1">
              {doctor ? `Dr. ${doctor.name} - ${doctor.specialty}` : 'Select a doctor'}
            </p>
          </div>

          <div className="flex gap-4">
            {/* Add DoctorSelector component */}
            <DoctorSelector
              selectedDoctorId={selectedDoctorId}
              onDoctorChange={onDoctorChange}
            />

            {/* Date picker */}
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                onClick={() => onDateChange(addDays(selectedDate, -1))}
              >
                ‹
              </button>
              <span className="text-sm font-medium min-w-[120px] text-center">
                {format(selectedDate, 'MMM d, yyyy')}
              </span>
              <button
                className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                onClick={() => onDateChange(addDays(selectedDate, 1))}
              >
                ›
              </button>
            </div>

            {/* Add view toggle buttons (Day/Week) */}
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 text-sm rounded ${
                  view === 'day'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => onViewChange('day')}
              >
                Day
              </button>
              <button
                className={`px-4 py-2 text-sm rounded ${
                  view === 'week'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => onViewChange('week')}
              >
                Week
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      <div className="p-6">
        {/* Conditionally render DayView or WeekView based on view prop */}
        {loading ? (
          <div className="text-center text-gray-500 py-12">
            <p>Loading appointments...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">
            <p>Error loading appointments: {error.message}</p>
          </div>
        ) : view === 'day' ? (
          <DayView
            appointments={appointments}
            doctor={doctor}
            date={selectedDate}
          />
        ) : (
          <WeekView
            appointments={appointments}
            doctor={doctor}
            weekStartDate={startOfWeek(selectedDate, { weekStartsOn: 1 })} // Monday start
          />
        )}
      </div>
    </div>
  );
}
