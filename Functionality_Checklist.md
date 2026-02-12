# SWISH Platform - Functional Checklist

This document outlines the complete functional requirements for the SWISH MVP.

## Ⅰ. Public-Facing Site

### 1.1 Homepage (`/`)
- [x] **Hero Section**: Displays animated "SWISH" text and a compelling headline.
- [x] **Who SWISH is For**: Section with three cards (Corporate, Churches, Large Groups) with icons.
- [x] **Featured Experiences**: Displays a selection of experiences in a horizontal, auto-scrolling, looping carousel.
- [x] **How It Works**: A 3-step guide on using the platform.
- [x] **Call to Action**: Prominent CTA button to "Get Started" or "Contact Us".
- [x] **Animations**: Fade-up on scroll effects for all major sections.

### 1.2 Experiences Page (`/experiences`)
- [x] **Experience Listing**: Display all available experiences in a grid or list format.
- [x] **Filtering**: Allow users to filter experiences by category, delivery type (in-person/online), etc.
- [x] **Search**: Allow users to search for experiences by name.

### 1.3 Experience Detail Page (`/experiences/:id`)
- [x] **Detailed Information**: Display all details for a single experience (description, outcomes, agenda, pricing, etc.).
- [x] **Booking Enquiry Form**: Allow users to submit an enquiry for the experience.

### 1.4 About Page (`/about`)
- [x] **Hero Section**: Displays a hero image and headline for the About page.
- [x] **Our Vision/Mission**: Text sections explaining the purpose of SWISH.
- [x] **Animated Stats**: Animated counters for key metrics (e.g., "Corporates Served").
- [x] **Call to Action**: CTA button to encourage user engagement.

### 1.5 Contact Page (`/contact`)
- [x] **Contact Form**: A fully functional form for users to send messages.
- [x] **Visual Enhancements**: Moving gradient blurry ball background effect.

### 1.6 Authentication (`/auth`, `/login`, `/register`)
- [x] **User Registration**: Allow new users to register (defaults to "participant" role).
- [x] **User Login**: Allow existing users to log in.
- [x] **Role-based Redirect**: After login, redirect users to their appropriate dashboard.

---

## Ⅱ. Core Application Features

### 2.1 Routing & Authorization
- [x] **Protected Routes**: All authenticated routes are protected from public access.
- [x] **Role-Based Access Control (RBAC)**:
  - [x] Users can only access routes permitted for their role.
  - [x] Unauthorized access attempts redirect to an `/unauthorized` page.
- [x] **Scroll-to-Top**: Navigation to a new page scrolls the user to the top.

### 2.2 Global UI/UX
- [x] **Responsive Design**: All pages are fully responsive on desktop, tablet, and mobile.
- [x] **Lazy Loading**: Images are lazy-loaded to improve performance.
- [x] **Loading States**: Spinners or placeholders are shown while data is being fetched.
- [x] **Feedback States**: Success and error messages are shown for user actions (e.g., form submissions).

---

## Ⅲ. User Dashboards (Authenticated)

### 3.1 Participant Dashboard (`/dashboard`)
- [x] **Dashboard Overview**:
  - [x] Welcome message.
  - [x] Widgets for "Upcoming Events" and "Assigned Activities".
- [x] **My Events**: A view to see all registered events/sessions.
- [x] **Profile Settings**: A page to update user profile information.

### 3.2 Tenant Admin Dashboard (`/tenant-admin`)
- [x] **Dashboard Overview**:
  - [x] Widgets for "Total Team Members", "Active Experiences", "Upcoming Bookings", "Recent Activity".
- [x] **Experience Management**:
  - [x] **Create/Edit/Delete** experiences for the tenant.
  - [x] **Toggle Published/Unpublished** status for experiences.
  - [x] **Set capacity, price**, and other experience details.
- [x] **Team Management**:
  - [x] **Add/Remove** team members from the tenant.
  - [x] **Change role** of team members (e.g., to "Facilitator").
  - [x] **Disable/Enable** team member accounts.
- [x] **Booking Management**:
  - [x] **View list of bookings** for the tenant.
  - [x] **Change booking status** (e.g., "Confirmed", "Completed").
  - [x] **Cancel bookings**.

### 3.3 Platform Admin Dashboard (`/platform-admin`)
- [x] **Dashboard Overview**:
  - [x] **Statistics Widgets**: "Total Tenants", "Total Users", "Total Experiences", "Revenue Snapshot".
  - [x] **Activity Feed**: A live feed of recent platform activity.
- [x] **Tenant Management**:
  - [x] **View all tenants** in a searchable, filterable table.
  - [x] **Create new tenant**.
  - [x] **Edit tenant details** in a modal.
  - [x] **Toggle tenant status** (active/suspended).
  - [x] **Delete tenant** with confirmation.
  - [x] **Impersonate tenant** (mock).
- [x] **Global User Management**:
  - [x] **View all users** across all tenants in a searchable, filterable table.
  - [x] **Create new user**.
  - [x] **Edit user details** in a modal.
  - [x] **Change user role**.
  - [x] **Toggle user status** (active/suspended).
  - [x] **Assign user to a tenant**.
  - [x] **Delete user** with confirmation.
- [x] **Global Experience Management**:
  - [x] **View all experiences** across all tenants.
  - [x] **Create/Edit/Delete** global experiences.
- [x] **System Settings**:
  - [x] **Feature Flags**: Toggles to enable/disable mock platform features.
  - [x] **Branding**: Inputs to change mock platform branding (logo, colors).
  - [x] **Email Templates**: Preview and edit mock email templates.
- [x] **Audit Logs**:
  - [x] **View all activity logs**.
  - [x] **Filter logs** by date, user, or action type.

---
