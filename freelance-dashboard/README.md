# Freelance-Dashboard

A professional TypeScript-based React application for managing freelance clients, projects, and payments with complete type safety.

##  Technologies Used

- **React 18** - Modern UI library
- **TypeScript** - Static typing for better code quality
- **Context API + useReducer** - Global state management with discriminated unions
- **Tailwind CSS** - Utility-first styling framework
- **Vite** - Fast development build tool

##  Main Features

### Type-Safe Architecture
- **Strongly typed interfaces** for Client, Project, and Payment entities
- **Discriminated union types** for reducer actions
- **Type narrowing** for safe data access and error handling
- **Optional properties** handled safely (e.g., client email)

### State Management
- Global state using **Context API with useReducer**
- Type-safe actions: `ADD_CLIENT`, `ADD_PROJECT`, `ADD_PAYMENT`, `MARK_PROJECT_PAID`
- Immutable state updates following React best practices

### Core Functionality
1. **Client Management**
   - Display client information (name, country, email)
   - Handle optional email addresses safely
   - Search clients by name

2. **Project Tracking**
   - View project details with linked client information
   - Track project status: pending, in-progress, completed
   - Monitor payment status: paid or unpaid
   - Mark unpaid projects as paid with one click

3. **Payment Processing**
   - Record payments with validation
   - Automatic payment creation when marking projects as paid
   - Payment history tracking

4. **Dashboard Statistics**
   - Total clients count
   - Total projects count
   - Paid vs unpaid projects ratio

5. **Search & Filter**
   - Search clients and projects by name
   - Filter projects by status (pending, in-progress, completed)
   - Filter projects by payment state (paid, unpaid)

### Utility Functions
- `countPaymentStates()` - Count paid vs unpaid projects
- `findClientById()` - Safe client lookup with type narrowing
- `isValidPayment()` - Payment validation
- `filterProjects()` - Filter by status and payment state
- `searchByName()` - Generic search with type safety
- `getProjectStatusColor()` - Conditional styling for project status
- `getPaymentStatusColor()` - Conditional styling for payment status
- `formatCurrency()` - Format currency amounts
- `formatDate()` - Format ISO dates to readable format

##  Project Structure

```
src/
├── components/
│   ├── ClientCard.tsx          # Display individual client
│   ├── DashboardStats.tsx      # Dashboard statistics
│   └── ProjectList.tsx         # List of projects with actions
├── context/
│   └── AppStateContext.tsx     # Global state with useReducer
├── types/
│   └── Types.ts                # TypeScript interfaces and types
├── utils/
│   └── Utils.ts                # Utility functions
└── App.tsx                     # Main application component
```

##  Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repository-url>
cd freelance-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

5. **Preview production build**
```bash
npm run preview
```

The application will be available at `http://localhost:5173`

##  Sample Data

The application comes pre-loaded with sample data:

### Clients
- **Tech Solutions Inc** (USA) - contact@techsolutions.com
- **Global Designs** (UK) - No email

### Projects
- **Website Redesign** - Tech Solutions Inc, $5,000, In Progress, Unpaid
- **Mobile App Development** - Global Designs, $12,000, Completed, Paid

### Payments
- $12,000 payment for Mobile App Development project

##  TypeScript Features Demonstrated

1. **Interface Definitions**
   - Client, Project, Payment interfaces
   - Optional properties (email?)
   - Union types for status and payment state

2. **Discriminated Unions**
   - AppAction type with multiple action variants
   - Type-safe reducer with exhaustive pattern matching

3. **Type Narrowing**
   - Safe undefined checks in findClientById
   - Conditional rendering based on type guards

4. **Generics**
   - searchByName function uses generics for reusability

5. **Type Guards**
   - isValidPayment type predicate function

##  UI Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Conditional Styling** - Color-coded status indicators
- **Interactive Elements** - Hover effects and transitions
- **Search & Filter** - Real-time filtering of data
- **Professional Layout** - Clean, modern interface

##  Assignment Requirements Checklist

✅ TypeScript interfaces for Client, Project, Payment  
✅ Context API + useReducer implementation  
✅ Discriminated union types for actions  
✅ Optional properties handled safely  
✅ Type narrowing demonstrated  
✅ Utility functions (all required)  
✅ Reusable typed components (ClientCard, ProjectList, DashboardStats)  
✅ Mark project as paid functionality  
✅ Search and filter functionality  
✅ Conditional styling  
✅ Minimum 2 clients, 2 projects, 1 payment  
✅ Professional documentation  

##  Deployment

This project can be deployed to:

- **Vercel** - Recommended for React applications
- **Netlify** - Easy deployment with drag-and-drop
- **GitHub Pages** - Free hosting for static sites

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload the 'dist' folder to Netlify
```

## Screenshots

![Dashboard Overview](./screenshots/dashboard.png)
*Dashboard showing statistics, clients, and projects*

![Project Management](./screenshots/projects.png)
*Project list with payment status and actions*

##  Live Demo

[View Live Application](#) - Add your deployment URL here

## 👨 Author
muhetopeace

## 📄 License

This project is created for educational purposes as part of a TypeScript and React assignment.

---

**Note**: This project demonstrates professional TypeScript usage with React, including proper type safety, state management patterns, and best practices for building maintainable applications.