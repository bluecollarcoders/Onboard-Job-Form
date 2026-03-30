import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { JobsPage } from './pages/Jobs'

const queryClient = new QueryClient();

function App() {

  return (
   <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>

     {/* Redirect root to the jobs dashboard */}
     <Route path='/' element={<Navigate to="/dashboard/overview" replace/>} />
     
     <Route path='/dashboard' element={<DashboardLayout />}>
     <Route index element={<Navigate to="overview" replace />} />
     <Route path='overview' element={<div>Overview Coming Soone</div>} />
     <Route path='jobs' element={<JobsPage /> } />
     <Route path='candidates' element={<div>Kanban Board Coming Soon</div>} />
     </Route>
     
    </Routes>

    </BrowserRouter>
    <Toaster position='top-right' />
   </QueryClientProvider>
  )
}
export default App
