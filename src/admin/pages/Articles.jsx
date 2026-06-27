import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import { cmsService } from '../services/cmsService';
import { FileText, CheckCircle, AlertCircle, Calendar, User, ToggleLeft, Sparkles } from 'lucide-react';

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    excerpt: '',
    category: '',
    author: 'P. Suuresh, FCA',
    readTime: '6 min read',
    content: '',
    featured: false,
    featuredImage: '',
  });

  // Delete dialogs
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Status warnings
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 3000);
  };

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await cmsService.getArticles();
      setArticles(data || []);
    } catch (err) {
      showToast('Error fetching articles from database.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Filter list
  useEffect(() => {
    const output = articles.filter((item) => {
      const matchSearch = 
        (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.author || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;

      return matchSearch && matchCategory;
    });

    setFilteredArticles(output);
    setCurrentPage(1);
  }, [articles, searchTerm, selectedCategory]);

  const paginatedItems = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getDistinctCategories = () => {
    const cats = new Set(articles.map((a) => a.category).filter(Boolean));
    return Array.from(cats).map((c) => ({ label: c, value: c }));
  };

  const handleOpenCreateForm = () => {
    setFormData({
      id: '',
      title: '',
      excerpt: '',
      category: 'FBAR',
      author: 'P. Suuresh, FCA',
      readTime: '5 min read',
      content: '',
      featured: false,
      featuredImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleOpenEditForm = (item) => {
    setFormData({
      id: item.id,
      title: item.title || '',
      excerpt: item.excerpt || '',
      category: item.category || 'FBAR',
      author: item.author || 'P. Suuresh, FCA',
      readTime: item.readTime || '5 min read',
      content: item.content || '',
      featured: !!item.featured,
      featuredImage: item.featuredImage || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSaveSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('An article title is required.', 'danger');
      return;
    }

    const parsedItem = {
      title: formData.title.trim(),
      excerpt: formData.excerpt.trim(),
      category: formData.category.trim(),
      author: formData.author.trim(),
      readTime: formData.readTime.trim(),
      content: formData.content.trim(),
      featured: formData.featured,
      featuredImage: formData.featuredImage.trim(),
    };

    try {
      if (isEditing) {
        await cmsService.updateArticle(formData.id, parsedItem);
        showToast('Article updated successfully.');
      } else {
        parsedItem.id = formData.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
        await cmsService.createArticle(parsedItem);
        showToast('Article created successfully.');
      }
      setIsModalOpen(false);
      fetchArticles();
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
      await cmsService.deleteArticle(itemToDelete.id);
      showToast('Article deleted permanently.');
      setIsConfirmOpen(false);
      setItemToDelete(null);
      fetchArticles();
    } catch (err) {
      showToast(`Delete failed: ${err.message}`, 'danger');
    }
  };

  const columns = [
    {
      header: 'Article Info',
      accessor: 'title',
      render: (row, val) => (
        <div className="text-left font-semibold text-theme-text-primary space-y-1.5">
          <p className="leading-snug text-sm">{val}</p>
          <div className="flex items-center gap-3 text-[10px] font-mono text-theme-text-secondary select-none opacity-80">
            <span className="flex items-center gap-1 shrink-0">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              <span>{row.date || 'Today'}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 shrink-0">
              <User className="w-3.5 h-3.5 text-amber-500" />
              <span>{row.author || 'P. Suuresh'}</span>
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
          {val || 'General'}
        </span>
      )
    },
    {
      header: 'Featured',
      accessor: 'featured',
      render: (row, val) => (
        <span className={`px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold uppercase select-none ${
          val 
            ? 'bg-amber-500/10 text-amber-500 border border-amber-500/25 font-extrabold' 
            : 'text-theme-text-secondary border border-theme-border bg-theme-surface/30'
        }`}>
          {val ? 'TRUE' : 'FALSE'}
        </span>
      )
    },
    {
      header: 'Length',
      accessor: 'readTime',
      render: (row, val) => <span className="font-mono text-xs">{val || '5 min read'}</span>
    },
  ];

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-200 text-left relative">
      
      {/* Toast Warnings */}
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

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div>
          <p className="text-[10px] font-mono tracking-widest text-amber-500 font-bold uppercase">MODULE</p>
          <h2 className="text-2xl font-extrabold font-display tracking-tight text-theme-text-primary">
            Publications & Articles
          </h2>
          <p className="text-xs text-theme-text-secondary">
            Manage, edit, and organize articles regarding bilateral Double Tax Treaties, FBAR asset limits, and offshore planning.
          </p>
        </div>
      </div>

      {/* Filters / bar */}
      <SearchBar
        id="articles-search-filter-panel"
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search insights by title, excerpt summary, author, or categories..."
        categories={[
          { label: 'All Categories', value: 'all' },
          ...getDistinctCategories()
        ]}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onCreate={handleOpenCreateForm}
        createLabel="New Article"
      />

      {/* Table output */}
      <DataTable
        columns={columns}
        data={paginatedItems}
        loading={loading}
        onEdit={handleOpenEditForm}
        onDelete={handleOpenDeleteDialog}
        emptyLabel="No matching journal articles located in database."
      />

      {/* Pagination component */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredArticles.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      {/* Form editing modal */}
      <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={isEditing ? 'Edit Article' : 'Add Article'}
      >
        <form onSubmit={handleSaveSubmit} className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
              Article Heading / Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Navigating Capital Gains under Section 195 Lower-withholding certificates in India"
              className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-sans font-semibold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5 font-sans">
              <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                Publish Category / Topic
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-mono"
              >
                <option value="US Tax">US Tax</option>
                <option value="FBAR">FBAR</option>
                <option value="India-US Treaties">India-US Treaties</option>
                <option value="NRI Compliance">NRI Compliance</option>
                <option value="FATCA">FATCA</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                Author Portrait Profile
              </label>
              <select
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full bg-theme-surface border border-theme-border focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-sans cursor-pointer"
              >
                <option value="P. Suuresh, FCA">P. Suuresh, FCA</option>
                <option value="Anjali Sharma, CPA">Anjali Sharma, CPA</option>
                <option value="Rohit Mehta, LLB">Rohit Mehta, LLB</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                Est. Reading Time
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                placeholder="e.g. 5 min read"
                className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary flex justify-between">
              <span>Excerpt Summary</span>
              <span className="text-[10px] lowercase font-normal italic opacity-60">short teaser text, max 160 chars</span>
            </label>
            <input
              type="text"
              required
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="e.g. Selling real property in India triggers reporting in both jurisdictions. Understand the DTAA implications..."
              className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2.5 text-xs text-theme-text-primary focus:outline-hidden transition-all font-sans"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary flex justify-between">
              <span>Featured Banner Image Asset URL</span>
              <span className="text-[10px] lowercase font-normal italic opacity-60">Paste Unsplash asset or Base64 links</span>
            </label>
            <input
              type="text"
              value={formData.featuredImage}
              onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
              placeholder="e.g. https://images.unsplash.com/photo-..."
              className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-mono text-[10px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
              Article Content (Markdown format supported)
            </label>
            <textarea
              required
              rows={9}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Enter comprehensive, rich markdown paragraphs here..."
              className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg p-3 text-xs text-theme-text-primary focus:outline-hidden transition-all font-sans leading-relaxed text-[11.5px]"
            />
          </div>

          <div className="py-2.5 flex items-center gap-3 bg-theme-surface/40 rounded-xl px-4 border border-theme-border select-none">
            <input
              type="checkbox"
              id="set-featured-doc-toggle"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 rounded border-theme-border accent-amber-500 text-slate-950 focus:ring-opacity-0 cursor-pointer"
            />
            <label htmlFor="set-featured-doc-toggle" className="text-xs font-mono font-bold uppercase tracking-wide text-theme-text-primary cursor-pointer">
              Promote to Featured Hero Section (Home Carousel / Public Journal top hero)
            </label>
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
              <span>{isEditing ? 'Save Article' : 'Save Article'}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Confirmation of destructive actions */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Confirm Article Deletion"
        message={`Are you sure you want to delete "${itemToDelete?.title || 'this post'}"? This action cannot be undone.`}
      />
    </div>
  );
}
