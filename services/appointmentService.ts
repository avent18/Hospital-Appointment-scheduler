/**
 * Appointment Service
 *
 * This service provides an abstraction layer for accessing appointment data.
 * It's your data access layer - implement the methods to fetch and filter appointments.
 *
 * TODO for candidates:
 * 1. Implement getAppointmentsByDoctor
 * 2. Implement getAppointmentsByDoctorAndDate
 * 3. Implement getAppointmentsByDoctorAndDateRange (for week view)
 * 4. Consider adding helper methods for filtering, sorting, etc.
 * 5. Think about how to structure this for testability
 */

import type { Appointment, Doctor, Patient, PopulatedAppointment } from '@/types';
import {
  MOCK_APPOINTMENTS,
  MOCK_DOCTORS,
  MOCK_PATIENTS,
  getDoctorById,
  getPatientById,
} from '@/data/mockData';

/**
 * AppointmentService class
 *
 * Provides methods to access and manipulate appointment data.
 * This is where you abstract data access from your components.
 */
export class AppointmentService {
  /**
   * Get all appointments for a specific doctor
   */
  getAppointmentsByDoctor(doctorId: string): Appointment[] {
    return MOCK_APPOINTMENTS.filter((apt) => apt.doctorId === doctorId);
  }

  /**
   * Get appointments for a specific doctor on a specific date
   * @param doctorId - The doctor's ID
   * @param date - The date to filter by
   * @returns Array of appointments for that doctor on that date
   */
  getAppointmentsByDoctorAndDate(doctorId: string, date: Date): Appointment[] {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return MOCK_APPOINTMENTS.filter((apt) => {
      if (apt.doctorId !== doctorId) return false;

      const aptStart = new Date(apt.startTime);
      return aptStart >= startOfDay && aptStart <= endOfDay;
    });
  }

  /**
   * Get appointments for a specific doctor within a date range (for week view)
   * @param doctorId - The doctor's ID
   * @param startDate - Start of the date range
   * @param endDate - End of the date range
   * @returns Array of appointments within the date range
   */
  getAppointmentsByDoctorAndDateRange(
    doctorId: string,
    startDate: Date,
    endDate: Date
  ): Appointment[] {
    return MOCK_APPOINTMENTS.filter((apt) => {
      if (apt.doctorId !== doctorId) return false;

      const aptStart = new Date(apt.startTime);
      return aptStart >= startDate && aptStart <= endDate;
    });
  }

  /**
   * Get a populated appointment (with patient and doctor objects)
   *
   * This is useful for display purposes where you need patient/doctor details
   */
  getPopulatedAppointment(appointment: Appointment): PopulatedAppointment | null {
    const patient = getPatientById(appointment.patientId);
    const doctor = getDoctorById(appointment.doctorId);

    if (!patient || !doctor) return null;

    return {
      ...appointment,
      patient,
      doctor,
    };
  }

  /**
   * Get all doctors
   */
  getAllDoctors(): Doctor[] {
    return MOCK_DOCTORS;
  }

  /**
   * Get doctor by ID
   */
  getDoctorById(id: string): Doctor | undefined {
    return MOCK_DOCTORS.find((doctor) => doctor.id === id);
  }

  /**
   * BONUS: Add any other helper methods you think would be useful
   * Examples:
   * - Sort appointments by time
   * - Check for overlapping appointments
   * - Get appointments by type
   * - etc.
   */
}

/**
 * Singleton instance (optional pattern)
 *
 * You can either:
 * 1. Export a singleton instance: export const appointmentService = new AppointmentService();
 * 2. Or let consumers create their own instances: new AppointmentService()
 *
 * Consider which is better for your architecture and testing needs.
 */
export const appointmentService = new AppointmentService();
