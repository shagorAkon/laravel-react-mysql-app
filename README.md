# Laravel + React.js Application

A modern full-stack web application built with Laravel 8 backend and React 19 frontend, using MySQL database.

## 🚀 Features

### Backend (Laravel)
- ✅ Laravel 8 Framework
- ✅ MySQL Database Integration
- ✅ RESTful API Endpoints
- ✅ User Management System
- ✅ Authentication Ready (Sanctum)
- ✅ Database Migrations & Seeders

### Frontend (React)
- ✅ React 19 with Hooks
- ✅ Modern Component Architecture
- ✅ Axios for API Communication
- ✅ Tailwind CSS for Styling
- ✅ Laravel Mix for Asset Bundling
- ✅ Hot Module Replacement

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- PHP >= 7.4
- Composer
- Node.js >= 14.x
- npm or yarn
- MySQL >= 5.7

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/laravel-react-app.git
cd laravel-react-app
```

### 2. Install PHP Dependencies
```bash
composer install
```

### 3. Install Node.js Dependencies
```bash
npm install
```

### 4. Environment Setup
```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 5. Database Configuration
Update your `.env` file with your database credentials:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_react_app
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 6. Create Database
```bash
# Create the database
mysql -u root -p -e "CREATE DATABASE laravel_react_app;"

# Run migrations
php artisan migrate

# (Optional) Seed the database
php artisan db:seed
```

### 7. Build Assets
```bash
# Development build
npm run dev

# Or watch for changes
npm run watch

# Production build
npm run prod
```

## 🚀 Running the Application

### Development Mode
```bash
# Start Laravel development server
php artisan serve

# In another terminal, watch for asset changes
npm run watch
```

The application will be available at `http://localhost:8000`

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/test` | Test API connection |
| GET | `/api/users` | Get all users |
| POST | `/api/users` | Create new user |
| GET | `/api/users/{id}` | Get specific user |
| PUT | `/api/users/{id}` | Update user |
| DELETE | `/api/users/{id}` | Delete user |

## 📁 Project Structure

```
laravel-react-app/
├── app/                    # Laravel application logic
│   ├── Http/Controllers/   # API controllers
│   └── Models/            # Eloquent models
├── database/              # Database migrations & seeders
├── resources/
│   ├── js/               # React components
│   │   ├── components/   # React components
│   │   └── app.js       # Main React entry point
│   ├── css/             # Stylesheets
│   └── views/           # Blade templates
├── routes/
│   ├── api.php          # API routes
│   └── web.php          # Web routes
└── public/              # Compiled assets
```

## 🔧 Development

### Adding New React Components
1. Create component in `resources/js/components/`
2. Import and use in your app
3. Run `npm run watch` to compile

### Adding New API Endpoints
1. Create controller: `php artisan make:controller Api/YourController`
2. Add routes in `routes/api.php`
3. Test with your React frontend

### Database Changes
```bash
# Create migration
php artisan make:migration create_your_table

# Run migrations
php artisan migrate

# Create model
php artisan make:model YourModel
```

## 🚀 Deployment

### Production Build
```bash
# Install dependencies
composer install --optimize-autoloader --no-dev
npm ci

# Build assets
npm run production

# Optimize Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## 🆘 Support

If you encounter any issues or have questions, please [open an issue](https://github.com/yourusername/laravel-react-app/issues) on GitHub.

## 🙏 Acknowledgments

- [Laravel](https://laravel.com/) - The PHP Framework
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Laravel Mix](https://laravel-mix.com/) - An elegant wrapper around Webpack