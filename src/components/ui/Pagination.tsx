import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    
    // Always include first page
    pages.push(1);
    
    // Calculate range of pages around current page
    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis after first page if needed
    if (rangeStart > 2) {
      pages.push(-1); // Use negative number to represent ellipsis
    }
    
    // Add pages in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (rangeEnd < totalPages - 1) {
      pages.push(-2); // Use different negative number for second ellipsis
    }
    
    // Always include last page if it's not already included
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <div className="flex items-center justify-center space-x-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 disabled:opacity-50"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      
      {pageNumbers.map((page, index) => 
        page < 0 ? (
          <span key={`ellipsis-${page}`} className="px-2">
            &hellip;
          </span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => onPageChange(page)}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-md border ${
              page === currentPage
                ? 'border-primary-900 bg-primary-900 text-white'
                : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        )
      )}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 disabled:opacity-50"
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default Pagination;