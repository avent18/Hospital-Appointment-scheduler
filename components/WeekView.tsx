/**
 * WeekView Component
 *
 * Displays appointments for a week (Monday - Sunday) in a grid format.
 */

'use client';

import { addDays, format, isSameDay, isWithinInterval } from 'date-fns';
import type { Appointment, Doctor, TimeSlot } from '@/types';
import { DEFAULT_CALENDAR_CONFIG } from '@/types';
import { AppointmentCard } from './AppointmentCard';

interface WeekViewProps {
  appointments: Appointment[];
  doctor: Doctor | undefined;
  weekStartDate: Date; // Should be a Monday
}

/**
 * WeekView Component
 *
 * Renders a weekly calendar grid with appointments.
 *
 * TODO: Implement this component
 *
 * Architecture suggestions:
 * 1. Generate an array of 7 dates (Mon-Sun) from weekStartDate
 * 2. Generate time slots (same as DayView: 8 AM - 6 PM)
 * 3. Create a grid: rows = time slots, columns = days
 * 4. Position appointments in the correct cell (day + time)
 *
 * Consider:
 * - How to make the grid scrollable horizontally on mobile?
 * - How to show day names and dates in headers?
 * - How to handle appointments that span multiple hours?
 * - Should you reuse logic from DayView?
 */
export function WeekView({ appointments, doctor, weekStartDate }: WeekViewProps) {
  /**
   * Generate array of 7 dates (Monday through Sunday)
   */
  function getWeekDays(): Date[] {
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      days.push(addDays(weekStartDate, i));
    }
    return days;
  }

  /**
   * Generate time slots (same as DayView)
   */
  function generateTimeSlots(): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const { startHour, endHour, slotDuration } = DEFAULT_CALENDAR_CONFIG;

    let currentTime = new Date(weekStartDate);
    currentTime.setHours(startHour, 0, 0, 0);

    while (currentTime.getHours() < endHour) {
      const endTime = addDays(currentTime, 0); // Copy date
      endTime.setMinutes(currentTime.getMinutes() + slotDuration);
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
   * Get appointments for a specific day
   */
  function getAppointmentsForDay(date: Date): Appointment[] {
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.startTime);
      return isSameDay(appointmentDate, date);
    });
  }

  /**
   * Get appointments for a specific day and time slot
   */
  function getAppointmentsForDayAndSlot(date: Date, slotStart: Date): Appointment[] {
    const dayAppointments = getAppointmentsForDay(date);
    const slotEnd = new Date(slotStart);
    slotEnd.setMinutes(slotStart.getMinutes() + 30);

    return dayAppointments.filter(appointment => {
      const appointmentStart = new Date(appointment.startTime);
      const appointmentEnd = new Date(appointment.endTime);

      // Check if appointment overlaps with the slot
      return (
        isWithinInterval(appointmentStart, { start: slotStart, end: slotEnd }) ||
        isWithinInterval(appointmentEnd, { start: slotStart, end: slotEnd }) ||
        (appointmentStart <= slotStart && appointmentEnd >= slotEnd)
      );
    });
  }

  const weekDays = getWeekDays();
  const timeSlots = generateTimeSlots();

  return (
    <div className="week-view">
      {/* Week header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
        </h3>
        {doctor && (
          <p className="text-sm text-gray-600">
            Dr. {doctor.name} - {doctor.specialty}
          </p>
        )}
      </div>

      {/* Week grid - may need horizontal scroll on mobile */}
      <div className="border border-gray-200 rounded-lg overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="w-20 p-2 text-xs bg-gray-50">Time</th>
              {weekDays.map((day, index) => (
                <th key={index} className="p-2 text-xs bg-gray-50 border-l">
                  <div className="font-semibold">{format(day, 'EEE')}</div>
                  <div className="text-gray-600">{format(day, 'MMM d')}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot, slotIndex) => (
              <tr key={slotIndex} className="border-t">
                <td className="p-2 text-xs text-gray-600">{slot.label}</td>
                {weekDays.map((day, dayIndex) => (
                  <td key={dayIndex} className="p-1 border-l align-top min-h-[60px]">
                    {getAppointmentsForDayAndSlot(day, slot.start).map(apt => (
                      <AppointmentCard key={apt.id} appointment={apt} compact />
                    ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {appointments.length === 0 && (
        <div className="mt-4 text-center text-gray-500 text-sm">
          No appointments scheduled for this week
        </div>
      )}
    </div>
  );
}


