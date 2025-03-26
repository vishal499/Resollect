import React, { useState } from 'react';
import {
    Checkbox,
    IconButton,
    Button,
    Popover,
} from '@mui/material';
import {
    MoreVert as MoreVertIcon,
    Search as SearchIcon,
    FilterList as FilterListIcon,
    Upload as UploadIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon
} from '@mui/icons-material';
import UploadModal from './UploadModal';

function Portfolio({ onUpload }) {
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [selectedRows, setSelectedRows] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [columnMenuAnchor, setColumnMenuAnchor] = useState(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [isColumnsActive, setIsColumnsActive] = useState(false);
    const [isFiltersActive, setIsFiltersActive] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState(new Set([
        'loanNo', 'loanType', 'borrower', 'borrowerAddress', 'coBorrowerName',
        'coBorrowerAddress', 'currentDPD', 'sanctionAmount', 'region', 'status'
    ]));
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 10;

    const columnOptions = [
        { id: 'loanNo', label: 'Loan No' },
        { id: 'loanType', label: 'Loan Type' },
        { id: 'borrower', label: 'Borrower' },
        { id: 'borrowerAddress', label: 'Borrower Address' },
        { id: 'coBorrowerName', label: 'Co Borrower Name' },
        { id: 'coBorrowerAddress', label: 'Co Borrower Address' },
        { id: 'currentDPD', label: 'Current DPD' },
        { id: 'sanctionAmount', label: 'Sanction Amount' },
        { id: 'region', label: 'Region' },
        { id: 'status', label: 'Status' }
    ];

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'preSarfaesi', label: 'Pre Sarfaesi' },
        { id: 'npa', label: 'NPA' },
        { id: '13(2)', label: '13(2) Responses' },
        { id: 'symbolicPossession', label: 'Symbolic Possession' },
        { id: 'dmOrder', label: 'DM Order' },
        { id: 'physicalPossessions', label: 'Physical Possessions' },
        { id: 'auctions', label: 'Auctions' },
    ];

    const sampleData = [
        {
            loanNo: 'L2810201',
            loanType: 'Home Loan',
            borrower: 'Virbha Sehgal',
            borrowerAddress: '#3 Plot Ganl, Anklapa-564700',
            coBorrowerName: 'Devi Vora',
            coBorrowerAddress: '24/543, Acharya Park, Dwarka-110075',
            currentDPD: 91,
            sanctionAmount: '₹1934268',
            region: 'West',
            status: 'U'
        },
        {
            loanNo: 'L2810202',
            loanType: 'Car Loan',
            borrower: 'Ritisha Agarwal',
            borrowerAddress: '#55/22, Dev Path, Burhanpur-461166',
            coBorrowerName: 'Monika Tak',
            coBorrowerAddress: '58 Tata Road, Sultan Pur New Delhi-110016',
            currentDPD: 100,
            sanctionAmount: '₹1842143',
            region: 'North',
            status: 'M'
        },
        {
            loanNo: 'L2810203',
            loanType: 'Car Loan',
            borrower: 'Ritisha Agarwal',
            borrowerAddress: '#55/22, Dev Path, Burhanpur-461166',
            coBorrowerName: 'Monika Tak',
            coBorrowerAddress: '58 Tata Road, Sultan Pur New Delhi-110016',
            currentDPD: 100,
            sanctionAmount: '₹1842143',
            region: 'North',
            status: 'M'
        },
        {
            loanNo: 'L2810204',
            loanType: 'Car Loan',
            borrower: 'Ritisha Agarwal',
            borrowerAddress: '#55/22, Dev Path, Burhanpur-461166',
            coBorrowerName: 'Monika Tak',
            coBorrowerAddress: '58 Tata Road, Sultan Pur New Delhi-110016',
            currentDPD: 100,
            sanctionAmount: '₹1842143',
            region: 'North',
            status: 'M'
        },
        {
            loanNo: 'L2810205',
            loanType: 'Car Loan',
            borrower: 'Ritisha Agarwal',
            borrowerAddress: '#55/22, Dev Path, Burhanpur-461166',
            coBorrowerName: 'Monika Tak',
            coBorrowerAddress: '58 Tata Road, Sultan Pur New Delhi-110016',
            currentDPD: 100,
            sanctionAmount: '₹1842143',
            region: 'North',
            status: 'M'
        },
        {
            loanNo: 'L2810206',
            loanType: 'Car Loan',
            borrower: 'Ritisha Agarwal',
            borrowerAddress: '#55/22, Dev Path, Burhanpur-461166',
            coBorrowerName: 'Monika Tak',
            coBorrowerAddress: '58 Tata Road, Sultan Pur New Delhi-110016',
            currentDPD: 100,
            sanctionAmount: '₹1842143',
            region: 'North',
            status: 'M'
        }, {
            loanNo: 'L2810207',
            loanType: 'Car Loan',
            borrower: 'Ritisha Agarwal',
            borrowerAddress: '#55/22, Dev Path, Burhanpur-461166',
            coBorrowerName: 'Monika Tak',
            coBorrowerAddress: '58 Tata Road, Sultan Pur New Delhi-110016',
            currentDPD: 100,
            sanctionAmount: '₹1842143',
            region: 'North',
            status: 'M'
        },
        {
            loanNo: 'L2810208',
            loanType: 'Car Loan',
            borrower: 'Ritisha Agarwal',
            borrowerAddress: '#55/22, Dev Path, Burhanpur-461166',
            coBorrowerName: 'Monika Tak',
            coBorrowerAddress: '58 Tata Road, Sultan Pur New Delhi-110016',
            currentDPD: 100,
            sanctionAmount: '₹1842143',
            region: 'North',
            status: 'M'
        },
        {
            loanNo: 'L2810209',
            loanType: 'Car Loan',
            borrower: 'Ritisha Agarwal',
            borrowerAddress: '#55/22, Dev Path, Burhanpur-461166',
            coBorrowerName: 'Monika Tak',
            coBorrowerAddress: '58 Tata Road, Sultan Pur New Delhi-110016',
            currentDPD: 100,
            sanctionAmount: '₹1842143',
            region: 'North',
            status: 'M'
        },
        {
            loanNo: 'L2810210',
            loanType: 'Car Loan',
            borrower: 'Ritisha Agarwal',
            borrowerAddress: '#55/22, Dev Path, Burhanpur-461166',
            coBorrowerName: 'Monika Tak',
            coBorrowerAddress: '58 Tata Road, Sultan Pur New Delhi-110016',
            currentDPD: 100,
            sanctionAmount: '₹1842143',
            region: 'North',
            status: 'M'
        },
        {
            loanNo: 'L2810211',
            loanType: 'Car Loan',
            borrower: 'Ritisha Agarwal',
            borrowerAddress: '#55/22, Dev Path, Burhanpur-461166',
            coBorrowerName: 'Monika Tak',
            coBorrowerAddress: '58 Tata Road, Sultan Pur New Delhi-110016',
            currentDPD: 100,
            sanctionAmount: '₹1842143',
            region: 'North',
            status: 'M'
        },
        {
            loanNo: 'L2810212',
            loanType: 'Car Loan',
            borrower: 'Ritisha Agarwal',
            borrowerAddress: '#55/22, Dev Path, Burhanpur-461166',
            coBorrowerName: 'Monika Tak',
            coBorrowerAddress: '58 Tata Road, Sultan Pur New Delhi-110016',
            currentDPD: 100,
            sanctionAmount: '₹1842143',
            region: 'North',
            status: 'M'
        },
        {
            loanNo: 'L2810213',
            loanType: 'Car Loan',
            borrower: 'Ritisha Agarwal',
            borrowerAddress: '#55/22, Dev Path, Burhanpur-461166',
            coBorrowerName: 'Monika Tak',
            coBorrowerAddress: '58 Tata Road, Sultan Pur New Delhi-110016',
            currentDPD: 100,
            sanctionAmount: '₹1842143',
            region: 'North',
            status: 'M'
        },
        {
            loanNo: 'L2810214',
            loanType: 'Car Loan',
            borrower: 'Ritisha Agarwal',
            borrowerAddress: '#55/22, Dev Path, Burhanpur-461166',
            coBorrowerName: 'Monika Tak',
            coBorrowerAddress: '58 Tata Road, Sultan Pur New Delhi-110016',
            currentDPD: 100,
            sanctionAmount: '₹1842143',
            region: 'North',
            status: 'M'
        },
        {
            loanNo: 'L2810215',
            loanType: 'Car Loan',
            borrower: 'Ritisha Agarwal',
            borrowerAddress: '#55/22, Dev Path, Burhanpur-461166',
            coBorrowerName: 'Monika Tak',
            coBorrowerAddress: '58 Tata Road, Sultan Pur New Delhi-110016',
            currentDPD: 100,
            sanctionAmount: '₹1842143',
            region: 'North',
            status: 'M'
        },
        {
            loanNo: 'L2810216',
            loanType: 'Car Loan',
            borrower: 'Ritisha Agarwal',
            borrowerAddress: '#55/22, Dev Path, Burhanpur-461166',
            coBorrowerName: 'Monika Tak',
            coBorrowerAddress: '58 Tata Road, Sultan Pur New Delhi-110016',
            currentDPD: 100,
            sanctionAmount: '₹1842143',
            region: 'North',
            status: 'M'
        },
        {
            loanNo: 'L2810217',
            loanType: 'Car Loan',
            borrower: 'Ritisha Agarwal',
            borrowerAddress: '#55/22, Dev Path, Burhanpur-461166',
            coBorrowerName: 'Monika Tak',
            coBorrowerAddress: '58 Tata Road, Sultan Pur New Delhi-110016',
            currentDPD: 100,
            sanctionAmount: '₹1842143',
            region: 'North',
            status: 'M'
        },
        {
            loanNo: 'L2810218',
            loanType: 'Car Loan',
            borrower: 'Ritisha Agarwal',
            borrowerAddress: '#55/22, Dev Path, Burhanpur-461166',
            coBorrowerName: 'Monika Tak',
            coBorrowerAddress: '58 Tata Road, Sultan Pur New Delhi-110016',
            currentDPD: 100,
            sanctionAmount: '₹1842143',
            region: 'North',
            status: 'M'
        },
        {
            loanNo: 'L2810219',
            loanType: 'Car Loan',
            borrower: 'Ritisha Agarwal',
            borrowerAddress: '#55/22, Dev Path, Burhanpur-461166',
            coBorrowerName: 'Monika Tak',
            coBorrowerAddress: '58 Tata Road, Sultan Pur New Delhi-110016',
            currentDPD: 100,
            sanctionAmount: '₹1842143',
            region: 'North',
            status: 'M'
        },
        {
            loanNo: 'L2810220',
            loanType: 'Car Loan',
            borrower: 'Ritisha Agarwal',
            borrowerAddress: '#55/22, Dev Path, Burhanpur-461166',
            coBorrowerName: 'Monika Tak',
            coBorrowerAddress: '58 Tata Road, Sultan Pur New Delhi-110016',
            currentDPD: 100,
            sanctionAmount: '₹1842143',
            region: 'North',
            status: 'M'
        },



    ];

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectedRows(sampleData.map(row => row.loanNo));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (loanNo) => {
        setSelectedRows(prev =>
            prev.includes(loanNo)
                ? prev.filter(id => id !== loanNo)
                : [...prev, loanNo]
        );
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleUploadClick = () => {
        setIsUploadModalOpen(true);
        onUpload();
    };

    const handleCloseUploadModal = () => {
        setIsUploadModalOpen(false);
    };

    const handleColumnMenuOpen = (event) => {
        setColumnMenuAnchor(event.currentTarget);
        setIsColumnsActive(true);
    };

    const handleColumnMenuClose = () => {
        setColumnMenuAnchor(null);
        setIsColumnsActive(false);
    };

    const handleFiltersClick = () => {
        setIsFiltersActive(!isFiltersActive);
    };

    const toggleColumn = (columnId) => {
        const newVisibleColumns = new Set(visibleColumns);
        if (newVisibleColumns.has(columnId)) {
            newVisibleColumns.delete(columnId);
        } else {
            newVisibleColumns.add(columnId);
        }
        setVisibleColumns(newVisibleColumns);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        setSelectedRows([]); // Clear selection when changing pages
    };

    const filteredData = sampleData.filter(row =>
        Object.values(row).some(value =>
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    // Calculate pagination
    const totalPages = Math.ceil(sortedData.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const paginatedData = sortedData.slice(startIndex, startIndex + entriesPerPage);

    return (
        <div className="p-6 h-screen overflow-hidden">
            {/* Title */}
            <h1 className="text-2xl font-semibold mb-6">Portfolio</h1>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => setSelectedFilter(filter.id)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${selectedFilter === filter.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {/* Search and Actions Bar */}
            <div className="flex justify-between items-center mb-6">
                <div className="relative w-64">
                    <input
                        type="text"
                        placeholder="Search Loan Number..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outlined"
                        onClick={handleColumnMenuOpen}
                        endIcon={<KeyboardArrowDownIcon className={isColumnsActive ? 'text-white' : 'text-black'} />}
                        size="small"
                        className={`min-w-[130px] rounded-md text-sm font-medium transition-colors 
    ${isColumnsActive
                                ? 'bg-[#4355B9] text-white border-[#4355B9]'
                                : 'bg-white text-black border-gray-300 hover:bg-gray-50'
                            }`}
                        style={{ textTransform: 'none' }} // 👈 Prevents uppercase text
                    >
                        Select Columns
                    </Button>

                    <Popover
                        open={Boolean(columnMenuAnchor)}
                        anchorEl={columnMenuAnchor}
                        onClose={handleColumnMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        PaperProps={{
                            style: {
                                width: '250px',
                                maxHeight: '400px'
                            }
                        }}
                    >
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-3 border-b pb-2">
                                <span className="font-medium text-gray-700">Show/Hide Columns</span>
                                <IconButton size="small" onClick={handleColumnMenuClose}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </IconButton>
                            </div>
                            <div className="flex flex-col space-y-1">
                                {columnOptions.map((column) => (
                                    <div
                                        key={column.id}
                                        className="flex items-center py-2 px-1 hover:bg-gray-50 rounded-md"
                                    >
                                        <Checkbox
                                            checked={visibleColumns.has(column.id)}
                                            onChange={() => toggleColumn(column.id)}
                                            size="small"
                                            className="mr-2"
                                        />
                                        <span className="text-sm text-gray-700">{column.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Popover>
                    {/* more filter button */}
                    <Button
                        variant="contained" // Use "contained" to ensure background color is applied
                        onClick={handleFiltersClick}
                        endIcon={<FilterListIcon className="text-white" />} // Ensure icon remains white
                        size="small"
                        className="min-w-[120px] rounded-md text-sm font-medium bg-[#4355B9] text-white border-[#4355B9] hover:bg-[#334499] transition-colors"
                        style={{ textTransform: 'none' }} // Keeps "More Filters" as it is
                    >
                        More Filters
                    </Button>


                </div>
            </div>

            {/* Selected Count */}
            <div className="text-sm text-gray-600 mb-4">
                {selectedRows.length} loans selected
            </div>

            {/* Table Container with Scrollbars */}
            <div className="bg-white rounded-lg shadow overflow-hidden" style={{ height: 'calc(100vh - 280px)' }}>
                <div className="overflow-auto h-full">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0 z-10">
                            <tr className="bg-gray-50">
                                <th className="w-12 px-6 py-3">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedRows(sampleData.map(row => row.loanNo));
                                            } else {
                                                setSelectedRows([]);
                                            }
                                        }}
                                        checked={selectedRows.length === sampleData.length}
                                    />
                                </th>
                                {columnOptions.map((column) => (
                                    visibleColumns.has(column.id) && (
                                        <th
                                            key={column.id}
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {column.label} ▼
                                        </th>
                                    )
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedData.map((row) => (
                                <tr key={row.loanNo} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300"
                                            checked={selectedRows.includes(row.loanNo)}
                                            onChange={() => {
                                                if (selectedRows.includes(row.loanNo)) {
                                                    setSelectedRows(selectedRows.filter(id => id !== row.loanNo));
                                                } else {
                                                    setSelectedRows([...selectedRows, row.loanNo]);
                                                }
                                            }}
                                        />
                                    </td>
                                    {columnOptions.map((column) => (
                                        visibleColumns.has(column.id) && (
                                            <td
                                                key={column.id}
                                                className={`px-6 py-4 text-sm ${column.id === 'loanNo' ? 'text-blue-600 hover:underline cursor-pointer' : 'text-gray-900'
                                                    }`}
                                            >
                                                {row[column.id]}
                                            </td>
                                        )
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-2">
                <div className="text-sm text-gray-700">
                    Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, sortedData.length)} of {sortedData.length} entries
                </div>
                <div className="flex gap-2">
                    <button
                        className={`px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 text-sm ${currentPage === page
                                ? 'text-white bg-[#4355B9] border-[#4355B9]'
                                : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
                                } border rounded-md`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        className={`px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Upload Modal */}
            <UploadModal
                isOpen={isUploadModalOpen}
                onClose={handleCloseUploadModal}
            />
        </div>
    );
}

export default Portfolio; 