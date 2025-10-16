/**
 * DayView Component
 *
 * Displays appointments for a single day in a timeline format.
 */

'use client';

import { addMinutes, format, isWithinInterval } from 'date-fns';
import type { Appointment, Doctor, TimeSlot } from '@/types';
import { DEFAULT_CALENDAR_CONFIG } from '@/types';
import { AppointmentCard } from './AppointmentCard';

interface DayViewProps {
  appointments: Appointment[];
  doctor: Doctor | undefined;
  date: Date;
}

/**
 * DayView Component
 *
 * Renders a daily timeline view with appointments.
 *
 * TODO: Implement this component
 *
 * Architecture suggestions:
 * 1. Create a helper function to generate time slots
 * 2. Create a TimeSlotRow component for each time slot
 * 3. Create an AppointmentCard component for each appointment
 * 4. Calculate appointment positioning based on start/end times
 *
 * Consider:
 * - How to handle appointments that span multiple 30-min slots?
 * - How to show overlapping appointments?
 * - How to make the timeline scrollable if needed?
 * - How to highlight the current time?
 */
export function DayView({ appointments, doctor, date }: DayViewProps) {
  /**
   * Generate time slots from 8 AM to 6 PM with 30-minute intervals
   */
  function generateTimeSlots(): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const { startHour, endHour, slotDuration } = DEFAULT_CALENDAR_CONFIG;

    let currentTime = new Date(date);
    currentTime.setHours(startHour, 0, 0, 0);

    while (currentTime.getHours() < endHour) {
      const endTime = addMinutes(currentTime, slotDuration);
      slots.push({
        start: new Date(currentTime),
        end: new Date(endTime),
        label: format(currentTime, 'h:mm a'),
      });
      currentTime = endTime;
    }

    return slots;
  }

  /**
   * Find appointments that overlap with a specific time slot
   */
  function getAppointmentsForSlot(slot: TimeSlot): Appointment[] {
    return appointments.filter(appointment => {
      const appointmentStart = new Date(appointment.startTime);
      const appointmentEnd = new Date(appointment.endTime);

      // Check if appointment overlaps with the slot
      return (
        isWithinInterval(appointmentStart, { start: slot.start, end: slot.end }) ||
        isWithinInterval(appointmentEnd, { start: slot.start, end: slot.end }) ||
        (appointmentStart <= slot.start && appointmentEnd >= slot.end)
      );
    });
  }

  const timeSlots = generateTimeSlots();

  return (
    <div className="day-view">
      {/* Day header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {format(date, 'EEEE, MMMM d, yyyy')}
        </h3>
        {doctor && (
          <p className="text-sm text-gray-600">
            Dr. {doctor.name} - {doctor.specialty}
          </p>
        )}
      </div>

      {/* Timeline grid */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-100">
          {timeSlots.map((slot, index) => (
            <div key={index} className="flex">
              <div className="w-24 p-2 text-sm text-gray-600 bg-gray-50">
                {slot.label}
              </div>
              <div className="flex-1 p-2 min-h-[60px] relative">
                {getAppointmentsForSlot(slot).map(appointment => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty state */}
      {appointments.length === 0 && (
        <div className="mt-4 text-center text-gray-500 text-sm">
          No appointments scheduled for this day
        </div>
      )}
    </div>
  );
}


