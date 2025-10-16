'use client';

import type { Appointment, PopulatedAppointment } from '@/types';
import { APPOINTMENT_TYPE_CONFIG } from '@/types';
//APPOINTMENT_TYPE_CONFIG   maps appointment types to their display metadata

interface AppointmentCardProps {
  appointment: Appointment | PopulatedAppointment;
  compact?: boolean;
}

/**
 * AppointmentCard Component
 *
 * Displays a single appointment with appropriate styling.
 * Shows patient name, appointment type, duration, and color-coding.
 */
export function AppointmentCard({ appointment, compact = false }: AppointmentCardProps) {
  const config = APPOINTMENT_TYPE_CONFIG[appointment.type];
  const startTime = new Date(appointment.startTime);
  const endTime = new Date(appointment.endTime);
  const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60); // in minutes

  // Get patient name - if populated, use it; otherwise, show patientId
  const patientName = 'patient' in appointment ? appointment.patient.name : `Patient ${appointment.patientId}`;

  if (compact) {
    return (
      <div
        className="text-xs p-1 rounded mb-1 text-white font-medium truncate"
        style={{ backgroundColor: config.color }}
        title={`${patientName} - ${config.label} (${duration} min)`}
      >
        {patientName}
      </div>
    );
  }

  return (
    <div
      className="p-2 rounded shadow-sm text-white font-medium"
      style={{ backgroundColor: config.color }}
    >
      <div className="text-sm font-semibold">{patientName}</div>
      <div className="text-xs opacity-90">{config.label}</div>
      <div className="text-xs opacity-75">{duration} min</div>
    </div>
  );
}
