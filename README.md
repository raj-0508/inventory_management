# TrackNest - Inventory Management System

<div align="center">
  <img src="/logo.png" alt="TrackNest Logo" width="120" height="120">
  
  **Modern, Real-time Inventory Management for Modern Businesses**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
  [![Appwrite](https://img.shields.io/badge/Appwrite-19.0.0-red)](https://appwrite.io/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC)](https://tailwindcss.com/)
</div>

## 🚀 Overview

TrackNest is a comprehensive, real-time inventory management system built with modern web technologies. It provides businesses with accurate stock tracking, automated low-stock alerts, professional invoice generation, and seamless product management - all without the complexity of traditional ERP systems.

### ✨ Key Features

- **🔍 Real-time Product Search** - Find products instantly by name or SKU
- **📦 Complete Inventory Management** - Add, edit, delete, and track product quantities
- **💰 Professional Invoice Generation** - Generate sales invoices and inventory reports
- **⚠️ Smart Low-Stock Alerts** - Automatic notifications when inventory runs low
- **🛒 Sales Management** - Track product sales with customer details
- **👤 User Authentication** - Secure login/signup with Appwrite
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **🌙 Dark/Light Mode** - Beautiful UI with theme switching
- **☁️ Cloud Storage** - Secure data persistence with Appwrite Database

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 15.5.2 with React 19.1.0
- **Styling**: Tailwind CSS 4.0 with custom components
- **Authentication**: Appwrite 19.0.0
- **Language**: TypeScript 5.0
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Main inventory dashboard
│   ├── login/             # User authentication
│   ├── signup/            # User registration
│   └── page.tsx           # Landing page
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── home/             # Homepage sections
│   ├── about/            # About section
│   ├── how-it-works/     # How it works section
│   ├── testimonials/     # User testimonials
│   ├── contact/          # Contact form
│   └── Navbar/           # Navigation component
└── lib/                  # Utilities and configurations
    ├── appwrite.ts       # Appwrite client setup
    ├── AuthContext.tsx   # Authentication context
    └── utils.ts          # Utility functions
```

## 🎯 How It Works

### 1. **User Authentication & Setup**
- Users create accounts with email, password, name, mobile, and age
- Secure authentication powered by Appwrite
- Automatic redirection based on authentication status
- Per-user data isolation using Appwrite Database

### 2. **Product Management**
- **Add Products**: Create new inventory items with name, SKU, quantity, and price
- **Search & Filter**: Real-time search by product name or SKU
- **Sort & Organize**: Sort products by name, SKU, quantity, or price (ascending/descending)
- **Edit Products**: Update product details with inline editing
- **Delete Products**: Remove discontinued items with confirmation dialogs

### 3. **Inventory Tracking**
- **Real-time Updates**: All changes are immediately reflected across the system
- **Quantity Management**: Increase/decrease stock levels during restocks and audits
- **Low Stock Monitoring**: Automatic alerts when products fall below 10 units
- **Visual Indicators**: Color-coded warnings for low-stock items

### 4. **Sales & Invoicing**
- **Sell Products**: Process sales with customer details (name, email)
- **Automatic Inventory Updates**: Stock levels decrease automatically after sales
- **Invoice Generation**: Professional invoices with company branding
- **Inventory Reports**: Complete inventory overview with total values
- **Print-Ready Format**: Clean, printable invoices and reports

### 5. **Smart Notifications**
- **Low Stock Alerts**: Modal notifications for products running low
- **Visual Warnings**: Orange highlighting for low-stock items
- **Reminder System**: Set reminders for restocking low-inventory items

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn
- Appwrite account (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/raj-0508/inventory_management.git
   cd inventory_management_1
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
   NEXT_PUBLIC_APPWRITE_COLLECTION_ID=your_collection_id
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 📱 Usage Guide

### For New Users

1. **Sign Up**: Create an account with your details
2. **Login**: Access your personalized dashboard
3. **Add Products**: Start by adding your first inventory items
4. **Manage Stock**: Update quantities as needed
5. **Process Sales**: Sell products and generate invoices
6. **Monitor Alerts**: Stay on top of low-stock notifications

### Dashboard Features

- **Summary Cards**: View total SKUs, quantities, and low-stock items at a glance
- **Product Table**: Comprehensive view of all inventory with sorting and search
- **Action Buttons**: Quick access to add, edit, delete, and sell products
- **Invoice Generation**: Create professional invoices and reports

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Optimized for all screen sizes
- **Dark/Light Mode**: Automatic theme switching with system preference detection
- **Interactive Elements**: Hover effects, smooth transitions, and loading states
- **Accessibility**: Proper ARIA labels and keyboard navigation support

## 🔧 Configuration

### Appwrite Setup

1. Create an Appwrite project
2. Enable authentication with email/password
3. **Database Setup**:
   - Create a Database
   - Create a Collection named `products`
   - Add the following **Attributes**:
     - `name` (String, 128, Required)
     - `sku` (String, 50, Required)
     - `quantity` (Integer, Required)
     - `price` (Double, Required)
     - `userId` (String, 36, Required)
   - Create an **Index** on `userId` (Key: `userId`, Type: `Key`)
4. **Permissions**:
   - Go to Collection Settings > Permissions
   - Add Role: `users` (or "Any User")
   - Check **Create**, **Read**, **Update**, **Delete**
5. Update environment variables with your IDs

### Customization

- **Company Branding**: Update logo and company name in components
- **Low Stock Threshold**: Modify the 10-unit threshold in dashboard logic
- **Invoice Templates**: Customize invoice styling and content
- **Color Scheme**: Adjust Tailwind CSS variables for brand colors

## 📊 Performance

- **Fast Loading**: Optimized with Next.js 15 and Turbopack
- **Efficient Rendering**: React 19 with concurrent features
- **Minimal Bundle**: Tree-shaking and code splitting
- **Appwrite Cloud**: Scalable and secure database performance

## 🛡️ Security

- **Authentication**: Secure user sessions with Appwrite
- **Data Isolation**: Per-user data separation
- **Input Validation**: Client and server-side validation
- **HTTPS Ready**: Production-ready security configurations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Appwrite](https://appwrite.io/) for backend services
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Lucide](https://lucide.dev/) for beautiful icons
- [Framer Motion](https://www.framer.com/motion/) for smooth animations

## 📞 Support

For support, email support@tracknest.com or join our community discussions.

---

<div align="center">
  <p>Built with ❤️ by Raj Singhaniya</p>
  <p>Making inventory management effortless for businesses worldwide</p>
</div>