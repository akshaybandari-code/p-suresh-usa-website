import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import { cmsService } from '../services/cmsService';
import { AlertTriangle, CheckCircle, AlertCircle, Calendar, Sparkles } from 'lucide-react';

export default function TaxUpdates() {
  const [updates, setUpdates] = useState([]);
  const [filteredUpdates, setFilteredUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImportance, setSelectedImportance] = useState('all');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    source: 'Internal Revenue Service (IRS)',
    category: 'IRS Updates',
    importance: 'medium',
    summary: '',
    guidelines: '',
    source_url: '',
  });

  // Delete checklist triggers
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Success notifications
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 3000);
  };

  const fetchUpdates = async () => {
    try {
      setLoading(true);
      const data = await cmsService.getTaxUpdates();
      setUpdates(data || []);
    } catch (err) {
      showToast('Error loading regulatory bulletins.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  // Sync list filtering
  useEffect(() => {
    const output = updates.filter((item) => {
      const matchSearch = 
        (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.summary || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.source || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchImportance = selectedImportance === 'all' || (item.importance || 'medium').toLowerCase() === selectedImportance;

      return matchSearch && matchImportance;
    });

    setFilteredUpdates(output);
    setCurrentPage(1);
  }, [updates, searchTerm, selectedImportance]);

  const paginatedItems = filteredUpdates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOpenCreateForm = () => {
    setFormData({
      id: '',
      title: '',
      source: 'Internal Revenue Service (IRS)',
      category: 'IRS Updates',
      importance: 'medium',
      summary: '',
      guidelines: 'Verify residency thresholds of Form 8938.\nReconcile global assets with FBAR peak summaries.\nFile treaty claims on physical Form 8833 schedules.',
      source_url: '',
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleOpenEditForm = (item) => {
    setFormData({
      id: item.id,
      title: item.title || '',
      source: item.source || 'Internal Revenue Service (IRS)',
      category: item.category || item.topic || 'IRS Updates',
      importance: item.importance || 'medium',
      summary: item.summary || '',
      guidelines: Array.isArray(item.guidelines) ? item.guidelines.join('\n') : (item.guidelines || ''),
      source_url: item.source_url || item.officialUrl || '',
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSaveSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('A bulletin heading is required.', 'danger');
      return;
    }

    const guidelinesArr = formData.guidelines
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '');

    const parsedItem = {
      title: formData.title.trim(),
      source: formData.source.trim(),
      category: formData.category.trim(),
      topic: formData.category.trim(), // Support dual topic/category nomenclature
      importance: formData.importance,
      summary: formData.summary.trim(),
      guidelines: guidelinesArr,
      source_url: formData.source_url.trim() || 'https://www.irs.gov',
    };

    try {
      if (isEditing) {
        await cmsService.updateTaxUpdate(formData.id, parsedItem);
        showToast('Tax update saved successfully.');
      } else {
        parsedItem.id = formData.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
        await cmsService.createTaxUpdate(parsedItem);
        showToast('Tax update created successfully.');
      }
      setIsModalOpen(false);
      fetchUpdates();
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
      await cmsService.deleteTaxUpdate(itemToDelete.id);
      showToast('Regulatory bulletin deleted.');
      setIsConfirmOpen(false);
      setItemToDelete(null);
      fetchUpdates();
    } catch (err) {
      showToast(`Delete failed: ${err.message}`, 'danger');
    }
  };

  const columns = [
    {
      header: 'Update Bulletin',
      accessor: 'title',
      render: (row, val) => (
        <div className="text-left font-semibold text-theme-text-primary space-y-0.5">
          <p>{val}</p>
          <div className="flex items-center gap-2 text-[10px] font-mono text-theme-text-secondary select-none opacity-70">
            <span className="flex items-center gap-1 font-bold">
              <Calendar className="w-3 h-3 text-amber-500" />
              <span>{row.date || 'Today'}</span>
            </span>
            <span>•</span>
            <span>Source: {row.source || 'IRS'}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Category',
      accessor: 'category',
      render: (row, val) => (
        <span className="px-2 py-0.5 rounded font-mono font-bold text-[9px] border bg-theme-surface border-theme-border uppercase">
          {val || row.topic || 'General'}
        </span>
      )
    },
    {
      header: 'Priority',
      accessor: 'importance',
      render: (row, val) => {
        const imp = (val || 'medium').toLowerCase();
        return (
          <span className={`px-2.5 py-1 text-[10px] tracking-wide rounded-full font-mono font-bold uppercase select-none border ${
            imp === 'high'
              ? 'bg-red-500/10 text-red-500 border-red-500/20 font-extrabold'
              : imp === 'low'
              ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
              : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
          }`}>
            {imp}
          </span>
        );
      }
    },
    {
      header: 'Guidelines',
      accessor: 'guidelines',
      render: (row, val) => <span className="font-mono font-bold">{(val || []).length} steps</span>
    }
  ];

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-200 text-left relative">
      
      {/* Toast Alert capsule */}
      {toast.message && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg border text-xs flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 ${
          toast.type === 'danger' 
            ? 'bg-red-500/10 border-red-500/20 text-red-500' 
            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
        }`}>
          {toast.type === 'danger' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
          <span className="font-sans font-bold">{toast.message}</span>
        </div>
      )}

      {/* Header element */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div>
          <p className="text-[10px] font-mono tracking-widest text-amber-500 font-bold uppercase font-sans">MODULE</p>
          <h2 className="text-2xl font-extrabold font-display tracking-tight text-theme-text-primary">
            Regulatory Tax Bulletins
          </h2>
          <p className="text-xs text-theme-text-secondary">
            Publish critical filing rule variations, FBAR reporting guidelines, and Double Taxation Avoidance Treaty adjustments.
          </p>
        </div>
      </div>

      {/* Control SearchBar & Selectors */}
      <SearchBar
        id="tax-updates-search-filter-panel"
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Filter bulletins by title headings, summaries, or publishers..."
        categories={[
          { label: 'All Severities', value: 'all' },
          { label: 'High Severity Priority', value: 'high' },
          { label: 'Medium Severity Priority', value: 'medium' },
          { label: 'Low Severity Priority', value: 'low' }
        ]}
        selectedCategory={selectedImportance}
        onCategoryChange={setSelectedImportance}
        onCreate={handleOpenCreateForm}
        createLabel="New Update"
      />

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={paginatedItems}
        loading={loading}
        onEdit={handleOpenEditForm}
        onDelete={handleOpenDeleteDialog}
        emptyLabel="No matching regulatory bulletins located in database."
      />

      {/* Pagination control */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredUpdates.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      {/* Form editing modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? 'Edit Regulatory Update' : 'Add Regulatory Update'}
      >
        <form onSubmit={handleSaveSubmit} className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
              Bulletin Heading / Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. IRS reminders for global Demat accounts peaks conversion thresholds"
              className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-sans font-semibold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                Official Source (Publisher)
              </label>
              <input
                type="text"
                required
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                placeholder="e.g. FinCEN Treasury Dept"
                className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                Bulletin Category (Topic)
              </label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g. FBAR Compliance"
                className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                Priority
              </label>
              <select
                value={formData.importance}
                onChange={(e) => setFormData({ ...formData, importance: e.target.value })}
                className="w-full bg-theme-surface border border-theme-border focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-sans cursor-pointer font-bold"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
              Official Source URL
            </label>
            <input
              type="url"
              required
              value={formData.source_url}
              onChange={(e) => setFormData({ ...formData, source_url: e.target.value })}
              placeholder="e.g. https://www.irs.gov/businesses/corporations/foreign-account-tax-compliance-act-fatca"
              className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-sans"
            />
          </div>

          <div className="space-y-1.5 font-sans">
            <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
              Summary
            </label>
            <textarea
              required
              rows={3}
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              placeholder="Provide a clear, brief operational summary regarding this filing bulletin..."
              className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all leading-relaxed text-[11px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary flex justify-between">
              <span>Guidelines (One per line)</span>
              <span className="text-[10px] lowercase font-normal italic opacity-60">Separate each item guideline by a new line</span>
            </label>
            <textarea
              rows={5}
              value={formData.guidelines}
              onChange={(e) => setFormData({ ...formData, guidelines: e.target.value })}
              placeholder="Submit electronically direct to the FinCEN portal.&#10;Confirm calculations using treasury exchange rates.&#10;Verify all designated joint account holdings."
              className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg p-3 text-xs text-theme-text-primary font-mono focus:outline-hidden leading-relaxed"
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
              <span>{isEditing ? 'Save Update' : 'Create Update'}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Confirmation warning */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Confirm Bulletin Deletion"
        message={`Are you sure you want to delete "${itemToDelete?.title || 'this updates'}"? This action cannot be undone.`}
      />
    </div>
  );
}
