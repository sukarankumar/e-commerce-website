import { useState, useEffect } from 'react';
import { Search, Filter, User, Edit, UserX } from 'lucide-react';
import AdminLayout from './AdminLayout';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

// Mock user data
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'customer', status: 'active', lastLogin: '2 hours ago' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'customer', status: 'active', lastLogin: '1 day ago' },
  { id: '3', name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active', lastLogin: '5 minutes ago' },
  { id: '4', name: 'Robert Johnson', email: 'robert@example.com', role: 'customer', status: 'inactive', lastLogin: '30 days ago' },
  { id: '5', name: 'Emily Brown', email: 'emily@example.com', role: 'customer', status: 'active', lastLogin: '5 days ago' },
  { id: '6', name: 'Michael Wilson', email: 'michael@example.com', role: 'customer', status: 'active', lastLogin: '2 days ago' },
  { id: '7', name: 'Sarah Lee', email: 'sarah@example.com', role: 'customer', status: 'active', lastLogin: '3 days ago' },
  { id: '8', name: 'David Clark', email: 'david@example.com', role: 'customer', status: 'inactive', lastLogin: '45 days ago' },
  { id: '9', name: 'Jennifer White', email: 'jennifer@example.com', role: 'customer', status: 'active', lastLogin: '12 hours ago' },
  { id: '10', name: 'Thomas Moore', email: 'thomas@example.com', role: 'customer', status: 'active', lastLogin: '4 days ago' },
];

type UserStatus = 'All' | 'active' | 'inactive';
type UserRole = 'All' | 'admin' | 'customer';

function Users() {
  const [users, setUsers] = useState<typeof mockUsers>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<UserStatus>('All');
  const [roleFilter, setRoleFilter] = useState<UserRole>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Set document title
  useEffect(() => {
    document.title = 'Manage Users | Admin Dashboard';
  }, []);
  
  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        // Filter users
        let filteredUsers = [...mockUsers];
        
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filteredUsers = filteredUsers.filter(
            (user) =>
              user.name.toLowerCase().includes(term) ||
              user.email.toLowerCase().includes(term)
          );
        }
        
        if (statusFilter !== 'All') {
          filteredUsers = filteredUsers.filter(
            (user) => user.status === statusFilter
          );
        }
        
        if (roleFilter !== 'All') {
          filteredUsers = filteredUsers.filter(
            (user) => user.role === roleFilter
          );
        }
        
        // Paginate
        const itemsPerPage = 6;
        const totalFilteredPages = Math.ceil(filteredUsers.length / itemsPerPage);
        setTotalPages(totalFilteredPages);
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);
        
        setUsers(paginatedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUsers();
  }, [searchTerm, statusFilter, roleFilter, currentPage]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };
  
  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setRoleFilter('All');
    setCurrentPage(1);
  };
  
  return (
    <AdminLayout title="Users">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="text-sm text-gray-500">
            Manage your site users
          </div>
          
          <div className="flex flex-col gap-4 sm:flex-row">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:w-64"
              />
            </form>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <select
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value as UserRole);
                  setCurrentPage(1);
                }}
                className="w-full appearance-none rounded-md border border-gray-300 bg-white pl-10 pr-10 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:w-40"
              >
                <option value="All">All Roles</option>
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
              </select>
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as UserStatus);
                  setCurrentPage(1);
                }}
                className="w-full appearance-none rounded-md border border-gray-300 bg-white pl-10 pr-10 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:w-40"
              >
                <option value="All">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            {(searchTerm || statusFilter !== 'All' || roleFilter !== 'All') && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
        
        <div className="overflow-x-auto rounded-lg bg-white p-6 shadow-sm">
          {isLoading ? (
            <div className="flex h-60 items-center justify-center">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <>
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      User
                    </th>
                    <th scope="col" className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Role
                    </th>
                    <th scope="col" className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                    <th scope="col" className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Last Login
                    </th>
                    <th scope="col" className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap py-4 px-4">
                        <div className="flex items-center">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
                            <User className="h-5 w-5 text-gray-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-900 capitalize">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.role === 'admin' 
                            ? 'bg-primary-100 text-primary-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="whitespace-nowrap py-4 px-4 text-sm">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.status === 'active' 
                            ? 'bg-success-100 text-success-800' 
                            : 'bg-error-100 text-error-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-500">
                        {user.lastLogin}
                      </td>
                      <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-500">
                        <div className="flex space-x-3">
                          <button
                            className="rounded-md bg-gray-100 p-1 text-gray-600 hover:bg-gray-200"
                            title="Edit User"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            className="rounded-md bg-gray-100 p-1 text-error-600 hover:bg-error-100"
                            title={user.status === 'active' ? 'Deactivate User' : 'Activate User'}
                          >
                            <UserX className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {users.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-gray-500">No users found</p>
                </div>
              )}
              
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Showing page {currentPage} of {totalPages}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="rounded-md border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="rounded-md border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Users;