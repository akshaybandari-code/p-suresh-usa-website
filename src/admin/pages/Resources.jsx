import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import { cmsService } from '../services/cmsService';
import { Download, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Form states
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

  useEffect(() => {
    fetchResources();
  }, []);

  // Sync list filtering
  useEffect(() => {
    const output = resources.filter((item) => {
      const matchSearch = 
        (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchType = selectedType === 'all' || (item.type || '').toLowerCase().includes(selectedType.toLowerCase());

      return matchSearch && matchType;
    });

    setFilteredResources(output);
    setCurrentPage(1);
  }, [resources, searchTerm, selectedType]);

  const paginatedItems = filteredResources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOpenCreateForm = () => {
    setFormData({
      id: '',
      title: '',
      type: 'PDF Guide',
      fileSize: '1.5 MB',
      description: '',
      downloadLink: '#',
      category: 'Worksheets',
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleOpenEditForm = (item) => {
    setFormData({
      id: item.id,
      title: item.title || '',
      type: item.type || 'PDF Guide',
      fileSize: item.fileSize || '1.2 MB',
      description: item.description || '',
      downloadLink: item.downloadLink || '#',
      category: item.category || 'Guides',
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSaveSubmit = async (e) => {
    e.preventDefault();
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
  };

  const handleOpenDeleteDialog = (item) => {
    setItemToDelete(item);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await cmsService.deleteResource(itemToDelete.id);
      showToast('Resource deleted successfully.');
      setIsConfirmOpen(false);
      setItemToDelete(null);
      fetchResources();
    } catch (err) {
      showToast(`Delete failed: ${err.message}`, 'danger');
    }
  };

  const columns = [
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
            Downloadable Guides, Forms & Checklists
          </h2>
          <p className="text-xs text-theme-text-secondary">
            Manage planning assets, peak-sum spreadsheet worksheets, and Double Tax Treaty compliance PDF guides.
          </p>
        </div>
      </div>

      {/* Searchbar Filter element */}
      <SearchBar
        id="resources-search-filter-panel"
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search planning sheets by title descriptive words..."
        categories={[
          { label: 'All Document Types', value: 'all' },
          { label: 'PDF Guides', value: 'pdf' },
          { label: 'Excel sheets', value: 'excel' },
          { label: 'Forms worksheets', value: 'form' }
        ]}
        selectedCategory={selectedType}
        onCategoryChange={setSelectedType}
        onCreate={handleOpenCreateForm}
        createLabel="Add File Resource"
      />

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={paginatedItems}
        loading={loading}
        onEdit={handleOpenEditForm}
        onDelete={handleOpenDeleteDialog}
        emptyLabel="No matching downloadable resources located in database."
      />

      {/* Pagination wrapper */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredResources.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      {/* Form edit modal wrapper */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? 'Edit Resource' : 'Add Resource'}
      >
        <form onSubmit={handleSaveSubmit} className="space-y-4">
          
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

          <div className="space-y-1.5">
            <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
              Description
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide a detailed informational overview summarizing this file resource asset..."
              className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all leading-relaxed text-[11px]"
            />
          </div>

          <div className="pt-4 border-t border-theme-border flex items-center justify-end gap-3.5">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-theme-surface border border-theme-border rounded-lg text-xs font-semibold text-theme-text-secondary hover:text-theme-text-primary transition-colors cursor-pointer"
            >
              Discard Changes
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-3xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Save Resource' : 'Create Resource'}</span>
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
        title="Confirm Resource Deletion"
        message={`Are you sure you want to delete "${itemToDelete?.title || 'this file'}"? This action cannot be undone.`}
      />
    </div>
  );
}
