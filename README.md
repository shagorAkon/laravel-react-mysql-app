# Know With Rana - Coaching Center Management System

A comprehensive web-based management system for "Know With Rana" coaching center, built with Laravel 8 and React 19.

## 🏫 About Know With Rana

- **Owner & Founder:** Rs Rana Sohel
- **Established:** 2010
- **Location:** Dogree Bazar, Naria, Shariatpur
- **Students:** 70-120 active students
- **Classes:** 6 to 12
- **Operating Hours:** 7:00 AM - 11:00 PM
- **Fee Range:** ৳700 - ৳8,000 per month
- **Monthly Income:** ~৳1.5 Lakh

## 🚀 Features

### Multi-Role Dashboard System
- **Super Admin:** Full system access with all permissions
- **Admin:** Administrative access with configurable permissions
- **Teacher:** Attendance and student management access
- **Student:** Personal dashboard with progress tracking
- **Parent/Guardian:** Child progress monitoring portal

### Core Functionality
- ✅ **Student Management:** Application, approval workflow, profile management
- ✅ **Class & Batch Management:** Multiple time slots (7 AM - 11 PM)
- ✅ **Payment Tracking:** Monthly fee management and receipt generation
- ✅ **Attendance System:** Daily attendance tracking with status options
- ✅ **Role-Based Access Control:** Granular permissions system
- ✅ **Professional Dashboard:** Real-time statistics and insights
- ✅ **Public Application Form:** Online student admission system

### Technical Features
- 🔐 **Secure Authentication:** Laravel Sanctum API authentication
- 📱 **Responsive Design:** Mobile-friendly interface
- 🎨 **Modern UI:** Professional design with Tailwind CSS
- 🔄 **Real-time Updates:** Dynamic data loading
- 📊 **Dashboard Analytics:** Comprehensive statistics
- 🗃️ **Database Management:** Structured data with relationships

## 🛠️ Technology Stack

### Backend
- **Framework:** Laravel 8
- **Database:** SQLite (easily switchable to MySQL)
- **Authentication:** Laravel Sanctum
- **API:** RESTful API architecture

### Frontend
- **Framework:** React 19
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Build Tool:** Laravel Mix

## 📋 Installation & Setup

### Prerequisites
- PHP 7.4 or higher
- Composer
- Node.js & npm
- SQLite or MySQL

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/shagorAkon/laravel-react-mysql-app.git
   cd laravel-react-mysql-app
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Database setup**
   ```bash
   # For SQLite (default)
   touch database/database.sqlite
   
   # Or configure MySQL in .env file
   # DB_CONNECTION=mysql
   # DB_HOST=127.0.0.1
   # DB_PORT=3306
   # DB_DATABASE=coaching_center
   # DB_USERNAME=root
   # DB_PASSWORD=
   ```

6. **Run migrations and seeders**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

7. **Build frontend assets**
   ```bash
   npm run production
   # or for development
   npm run dev
   ```

8. **Start the development server**
   ```bash
   php artisan serve
   ```

9. **Access the application**
   - Main Application: http://127.0.0.1:8000
   - Student Application: http://127.0.0.1:8000 (click "Apply Now")
   - Staff Login: http://127.0.0.1:8000 (click "Staff Login")

## 👥 Default User Accounts

### Super Admin
- **Email:** rana@knowwithrana.com
- **Password:** password123
- **Role:** Super Administrator (Full Access)

### Admin
- **Email:** admin@knowwithrana.com
- **Password:** admin123
- **Role:** Administrator (Limited Access)

## 📊 Database Structure

### Core Tables
- **roles:** User roles and permissions
- **users:** System users (staff, admins)
- **classes:** Academic classes (6-12)
- **batches:** Time-based class batches
- **students:** Student information and status
- **parents:** Parent/guardian information
- **payments:** Monthly fee tracking
- **attendance:** Daily attendance records

### Key Relationships
- Users belong to roles
- Students belong to classes and batches
- Parents are linked to students
- Payments and attendance are tracked per student

## 🎯 Usage Guide

### For Administrators

1. **Login** with admin credentials
2. **Dashboard** shows key statistics and recent activities
3. **Student Management:**
   - View pending applications
   - Approve/reject student admissions
   - Manage student profiles
4. **Payment Tracking:** Monitor monthly payments
5. **Attendance:** Record daily attendance
6. **Reports:** Generate various reports

### For Students (Future Implementation)
- Apply for admission online
- View personal dashboard
- Check attendance records
- View payment history
- Receive notices and updates

### For Parents (Future Implementation)
- Register using child's student ID
- Monitor child's progress
- View attendance and payments
- Receive notifications

## 🔧 API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/me` - Get current user

### Students
- `GET /api/students` - List students (with filters)
- `POST /api/students` - Create student
- `POST /api/students/{id}/approve` - Approve student
- `POST /api/students/{id}/reject` - Reject student

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Public
- `POST /api/student-application` - Submit student application

## 🎨 UI/UX Features

- **Professional Design:** Clean, modern interface
- **Responsive Layout:** Works on all devices
- **Intuitive Navigation:** Easy-to-use sidebar navigation
- **Real-time Feedback:** Loading states and success messages
- **Role-based Menus:** Different options based on user role
- **Bangladeshi Context:** Local currency (৳) and cultural considerations

## 🔒 Security Features

- **Authentication:** Secure login system
- **Authorization:** Role-based access control
- **Data Validation:** Server-side input validation
- **CSRF Protection:** Laravel's built-in CSRF protection
- **SQL Injection Prevention:** Eloquent ORM protection

## 🚀 Future Enhancements

### Phase 2 Features
- [ ] SMS notifications for parents
- [ ] Online payment integration (bKash, Nagad)
- [ ] Student performance tracking
- [ ] Exam management system
- [ ] Teacher scheduling system
- [ ] Mobile app development

### Phase 3 Features
- [ ] Video conferencing integration
- [ ] Digital library system
- [ ] Advanced reporting and analytics
- [ ] Multi-branch support
- [ ] Inventory management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is developed specifically for Know With Rana coaching center.

## 📞 Support

For technical support or feature requests, please contact the development team.

---

**Developed with ❤️ for Know With Rana Coaching Center**

*Empowering education since 2010*