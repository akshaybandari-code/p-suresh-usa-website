import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import { cmsService } from '../services/cmsService';
import { Download, CheckCircle, AlertCircle, Sparkles, Calendar } from 'lucide-react';

export default function Resources() {
  const [subTab, setSubTab] = useState('guides'); // 'guides' | 'deadlines'
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [filteredDeadlines, setFilteredDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Form states merged
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    type: 'PDF Guide',
    fileSize: '1.2 MB',
    description: '',
    downloadLink: '#',
    category: 'Worksheets',
    event: '',
    date: '',
  });

  // Delete checklist triggers
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Status updates
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 3000);
  };

  const fetchResources = async () => {
    try {
      setLoading(true);
      const data = await cmsService.getResources();
      setResources(data || []);
    } catch (err) {
      showToast('Error loading file resources.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const fetchDeadlines = async () => {
    try {
      setLoading(true);
      const data = await cmsService.getTaxDeadlines();
      setDeadlines(data || []);
    } catch (err) {
      showToast('Error loading tax deadlines.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subTab === 'guides') {
      fetchResources();
    } else {
      fetchDeadlines();
    }
  }, [subTab]);

  // Sync list filtering
  useEffect(() => {
    if (subTab === 'guides') {
      const output = resources.filter((item) => {
        const matchSearch = 
          (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.description || '').toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchType = selectedType === 'all' || (item.type || '').toLowerCase().includes(selectedType.toLowerCase());

        return matchSearch && matchType;
      });

      setFilteredResources(output);
    } else {
      const output = deadlines.filter((item) => {
        const matchSearch = 
          (item.event || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.description || '').toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchType = selectedType === 'all' || (item.category || '').toLowerCase().includes(selectedType.toLowerCase());

        return matchSearch && matchType;
      });

      setFilteredDeadlines(output);
    }
    setCurrentPage(1);
  }, [resources, deadlines, searchTerm, selectedType, subTab]);

  const filteredList = subTab === 'guides' ? filteredResources : filteredDeadlines;
  const paginatedItems = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOpenCreateForm = () => {
    if (subTab === 'guides') {
      setFormData({
        id: '',
        title: '',
        type: 'PDF Guide',
        fileSize: '1.5 MB',
        description: '',
        downloadLink: '#',
        category: 'Worksheets',
        event: '',
        date: '',
      });
    } else {
      setFormData({
        id: '',
        title: '',
        type: '',
        fileSize: '',
        description: '',
        downloadLink: '',
        category: 'US Tax',
        event: '',
        date: 'April 15, 2026',
      });
    }
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleOpenEditForm = (item) => {
    if (subTab === 'guides') {
      setFormData({
        id: item.id,
        title: item.title || '',
        type: item.type || 'PDF Guide',
        fileSize: item.fileSize || '1.2 MB',
        description: item.description || '',
        downloadLink: item.downloadLink || '#',
        category: item.category || 'Guides',
        event: '',
        date: '',
      });
    } else {
      setFormData({
        id: item.id,
        title: '',
        type: '',
        fileSize: '',
        description: item.description || '',
        downloadLink: '',
        category: item.category || 'US Tax',
        event: item.event || '',
        date: item.date || '',
      });
    }
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSaveSubmit = async (e) => {
    e.preventDefault();
    if (subTab === 'guides') {
      if (!formData.title.trim()) {
        showToast('A resource title is required.', 'danger');
        return;
      }

      const parsedItem = {
        title: formData.title.trim(),
        type: formData.type.trim(),
        fileSize: formData.fileSize.trim(),
        description: formData.description.trim(),
        downloadLink: formData.downloadLink.trim(),
        category: formData.category.trim(),
      };

      try {
        if (isEditing) {
          await cmsService.updateResource(formData.id, parsedItem);
          showToast('Resource updated successfully.');
        } else {
          parsedItem.id = formData.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
          await cmsService.createResource(parsedItem);
          showToast('Resource created successfully.');
        }
        setIsModalOpen(false);
        fetchResources();
      } catch (err) {
        showToast(`Action failed: ${err.message}`, 'danger');
      }
    } else {
      if (!formData.event.trim()) {
        showToast('A deadline event name is required.', 'danger');
        return;
      }

      const parsedItem = {
        event: formData.event.trim(),
        date: formData.date.trim(),
        category: formData.category.trim(),
        description: formData.description.trim(),
      };

      try {
        if (isEditing) {
          await cmsService.updateTaxDeadline(formData.id, parsedItem);
          showToast('Tax deadline updated successfully.');
        } else {
          parsedItem.id = formData.event.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
          await cmsService.createTaxDeadline(parsedItem);
          showToast('Tax deadline created successfully.');
        }
        setIsModalOpen(false);
        fetchDeadlines();
      } catch (err) {
        showToast(`Action failed: ${err.message}`, 'danger');
      }
    }
  };

  const handleOpenDeleteDialog = (item) => {
    setItemToDelete(item);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      if (subTab === 'guides') {
        await cmsService.deleteResource(itemToDelete.id);
        showToast('Resource deleted successfully.');
        fetchResources();
      } else {
        await cmsService.deleteTaxDeadline(itemToDelete.id);
        showToast('Tax deadline deleted successfully.');
        fetchDeadlines();
      }
      setIsConfirmOpen(false);
      setItemToDelete(null);
    } catch (err) {
      showToast(`Delete failed: ${err.message}`, 'danger');
    }
  };

  const resourceColumns = [
    {
      header: 'Resource Name',
      accessor: 'title',
      render: (row, val) => (
        <div className="text-left font-semibold text-theme-text-primary space-y-0.5">
          <p>{val}</p>
          <div className="flex items-center gap-2 text-[10px] font-mono text-theme-text-secondary select-none opacity-70">
            <span className="font-bold text-amber-500 uppercase">{row.type}</span>
            <span>•</span>
            <span>Size: {row.fileSize}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Category',
      accessor: 'category',
      render: (row, val) => (
        <span className="px-2 py-0.5 rounded font-mono font-bold text-[9px] border bg-theme-surface border-theme-border uppercase">
          {val || 'General'}
        </span>
      )
    },
    {
      header: 'Download Link',
      accessor: 'downloadLink',
      render: (row, val) => <span className="font-mono text-2xs truncate select-all">{val || '#'}</span>
    },
  ];

  const deadlineColumns = [
    {
      header: 'Deadline Event / Activity',
      accessor: 'event',
      render: (row, val) => (
        <div className="text-left font-semibold text-theme-text-primary space-y-0.5">
          <p>{val}</p>
          <div className="flex items-center gap-2 text-[10px] font-mono text-theme-text-secondary select-none opacity-70">
            <span className="flex items-center gap-1 font-bold">
              <Calendar className="w-3 h-3 text-amber-500" />
              <span>{row.date || 'April 15'}</span>
            </span>
          </div>
        </div>
      )
    },
    {
      header: 'Category',
      accessor: 'category',
      render: (row, val) => (
        <span className="px-2 py-0.5 rounded font-mono font-bold text-[9px] border bg-theme-surface border-theme-border uppercase">
          {val || 'US Tax'}
        </span>
      )
    },
    {
      header: 'Description',
      accessor: 'description',
      render: (row, val) => (
        <span className="font-sans text-xs text-theme-text-secondary leading-relaxed block max-w-sm shrink truncate">
          {val}
        </span>
      )
    },
  ];

  const activeColumns = subTab === 'guides' ? resourceColumns : deadlineColumns;

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-200 text-left relative">
      
      {/* Toast Warnings */}
      {toast.message && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg border text-xs flex items-center gap-3 animate-in slide-in-from-top-4 duration-350 ${
          toast.type === 'danger' 
            ? 'bg-red-500/10 border-red-500/20 text-red-500' 
            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
        }`}>
          {toast.type === 'danger' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
          <span className="font-sans font-bold">{toast.message}</span>
        </div>
      )}

      {/* Header sections */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div>
          <p className="text-[10px] font-mono tracking-widest text-amber-500 font-bold uppercase font-sans">MODULE</p>
          <h2 className="text-2xl font-extrabold font-display tracking-tight text-theme-text-primary">
            Compliance resources &amp; Deadlines
          </h2>
          <p className="text-xs text-theme-text-secondary">
            Manage planning assets, peak-sum spreadsheet worksheets, and Double Tax Treaty compliance calendars.
          </p>
        </div>
      </div>

      {/* Selector Tabs */}
      <div className="flex border-b border-theme-border pb-px gap-6 text-xs font-mono font-bold select-none">
        <button
          onClick={() => {
            setSubTab('guides');
            setSearchTerm('');
            setSelectedType('all');
          }}
          className={`pb-3 border-b-2 px-1 transition-all cursor-pointer ${
            subTab === 'guides'
              ? 'border-amber-500 text-amber-500 font-extrabold scale-102'
              : 'border-transparent text-theme-text-secondary hover:text-theme-text-primary'
          }`}
        >
          Downloadable Resource Files
        </button>
        <button
          onClick={() => {
            setSubTab('deadlines');
            setSearchTerm('');
            setSelectedType('all');
          }}
          className={`pb-3 border-b-2 px-1 transition-all cursor-pointer ${
            subTab === 'deadlines'
              ? 'border-amber-500 text-amber-500 font-extrabold scale-102'
              : 'border-transparent text-theme-text-secondary hover:text-theme-text-primary'
          }`}
        >
          US Tax Compliance Deadlines
        </button>
      </div>

      {/* Searchbar Filter element */}
      <SearchBar
        id="resources-search-filter-panel"
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder={subTab === 'guides' ? "Search planning sheets by title descriptive words..." : "Search deadlines by event title or description..."}
        categories={subTab === 'guides' ? [
          { label: 'All Document Types', value: 'all' },
          { label: 'PDF Guides', value: 'pdf' },
          { label: 'Excel sheets', value: 'excel' },
          { label: 'Forms worksheets', value: 'form' }
        ] : [
          { label: 'All Categories', value: 'all' },
          { label: 'US Tax', value: 'US Tax' },
          { label: 'India Tax', value: 'India Tax' },
          { label: 'FBAR/FATCA', value: 'FBAR/FATCA' },
          { label: 'US Estimated Tax', value: 'US Estimated Tax' }
        ]}
        selectedCategory={selectedType}
        onCategoryChange={setSelectedType}
        onCreate={handleOpenCreateForm}
        createLabel={subTab === 'guides' ? "Add File Resource" : "Add Tax Deadline"}
      />

      {/* Data Table */}
      <DataTable
        columns={activeColumns}
        data={paginatedItems}
        loading={loading}
        onEdit={handleOpenEditForm}
        onDelete={handleOpenDeleteDialog}
        emptyLabel={subTab === 'guides' ? "No matching downloadable resources located in database." : "No matching tax deadline events located."}
      />

      {/* Pagination wrapper */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredList.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      {/* Form edit modal wrapper */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? (subTab === 'guides' ? 'Edit Resource File' : 'Edit Tax Deadline') : (subTab === 'guides' ? 'Add Resource File' : 'Add Tax Deadline')}
      >
        <form onSubmit={handleSaveSubmit} className="space-y-4">
          
          {subTab === 'guides' ? (
            <>
              <div className="space-y-1.5">
                <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                  Resource Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. FBAR Peak balance converter worksheets"
                  className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-sans font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5 font-sans">
                  <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                    Resource Type
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    placeholder="e.g. Excel Template or PDF Guide"
                    className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                    File Size
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fileSize}
                    onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                    placeholder="e.g. 1.5 MB or 410 KB"
                    className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-mono"
                  />
                </div>

                <div className="space-y-1.5 font-sans">
                  <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Worksheets or Guides"
                    className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                  Download URL
                </label>
                <input
                  type="text"
                  required
                  value={formData.downloadLink}
                  onChange={(e) => setFormData({ ...formData, downloadLink: e.target.value })}
                  placeholder="e.g. # or an external Dropbox/Drive file address"
                  className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-mono"
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1.5">
                <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                  Deadline Event Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.event}
                  onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                  placeholder="e.g. Form 1040 Individual Federal Income Tax Filing"
                  className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-sans font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                    Due Date
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g. April 15, 2026"
                    className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                    Compliance Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-theme-surface border border-theme-border focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-sans cursor-pointer font-semibold"
                  >
                    <option value="US Tax">US Tax</option>
                    <option value="India Tax">India Tax</option>
                    <option value="FBAR/FATCA">FBAR/FATCA</option>
                    <option value="US Estimated Tax">US Estimated Tax</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div className="space-y-1.5">
            <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-[#718096] dark:text-zinc-400">
              Description / Notes
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={subTab === 'guides' ? "Provide a detailed informational overview summarizing this file resource asset..." : "Provide guidance notes regarding filing and extension protocols..."}
              className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all leading-relaxed text-[11px]"
            />
          </div>

          <div className="pt-4 border-t border-theme-border flex items-center justify-end gap-3.5">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-theme-surface border border-theme-border rounded-lg text-xs font-semibold text-[#718096] dark:text-zinc-400 hover:text-theme-text-primary transition-colors cursor-pointer"
            >
              Discard Changes
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-3xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Save Changes' : (subTab === 'guides' ? 'Create Resource' : 'Create Deadline')}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Verifier dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title={subTab === 'guides' ? "Confirm Resource Deletion" : "Confirm Deadline Deletion"}
        message={subTab === 'guides' 
          ? `Are you sure you want to delete "${itemToDelete?.title || 'this file'}"? This action cannot be undone.`
          : `Are you sure you want to delete "${itemToDelete?.event || 'this deadline'}"? This action cannot be undone.`
        }
      />
    </div>
  );
}
