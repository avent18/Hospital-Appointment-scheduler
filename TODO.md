# Hospital Appointment Scheduler - Implementation Plan

## Overview
Complete the hospital appointment scheduling interface with day and week calendar views, following clean architecture patterns.

## Architecture Goals
- Service layer for data access (AppointmentService)
- Headless hooks for business logic (useAppointments)
- Composable components (ScheduleView, DayView, WeekView, DoctorSelector)
- Separation of concerns and reusability

## Implementation Order

### 1. Service Layer (Data Access) ✅
- [x] Implement AppointmentService methods
  - [x] getAppointmentsByDoctor
  - [x] getAppointmentsByDoctorAndDate
  - [x] getAppointmentsByDoctorAndDateRange
  - [x] getPopulatedAppointment
  - [x] getAllDoctors
  - [x] getDoctorById

### 2. Custom Hook (Business Logic) ✅
- [x] Implement useAppointments hook
  - [x] Fetch appointments based on filters
  - [x] Handle loading and error states
  - [x] Memoization for performance
  - [x] Support both day and week views

### 3. Components
- [x] DoctorSelector component
  - [x] Fetch and display doctors
  - [x] Handle selection changes
  - [x] Proper styling

- [x] DayView component
  - [x] Generate time slots (8 AM - 6 PM, 30-min intervals)
  - [x] Position appointments correctly
  - [x] Handle overlapping appointments
  - [x] Color-code by appointment type
  - [x] AppointmentCard sub-component

- [x] WeekView component
  - [x] Generate 7-day grid (Mon-Sun)
  - [x] Position appointments by day and time
  - [x] Responsive design
  - [x] Reuse AppointmentCard with compact mode

- [x] ScheduleView component
  - [x] Compose all components together
  - [x] Handle view switching
  - [x] Manage state and data flow

### 4. Page Integration
- [x] Update SchedulePage to use ScheduleView
- [x] Remove placeholder content
- [x] Ensure proper state management

### 5. Testing & Polish
- [ ] Test all views with different doctors
- [ ] Verify appointment positioning
- [ ] Check responsive design
- [ ] Handle edge cases (no appointments, loading states)

## Technical Notes
- Use date-fns for date utilities (already included)
- Follow TypeScript best practices
- Maintain existing TODO comments in skeleton files
- Color-code appointments using APPOINTMENT_TYPE_CONFIG
- Handle overlapping appointments gracefully
- Make components reusable and composable
