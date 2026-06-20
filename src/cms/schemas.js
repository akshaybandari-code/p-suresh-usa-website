/**
 * SANITY CMS SCHEMAS
 * 
 * You can copy these schema definitions directly into your Sanity Studio.
 * Typically placed in your studio's schema folder.
 */

export const serviceSchema = {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'category', title: 'Category', type: 'string', options: { list: ['individual', 'corporate'] } },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'icon', title: 'Icon (Lucide name)', type: 'string', description: 'e.g., FileText, Globe, Scale, Briefcase' },
    { name: 'features', title: 'Key Features', type: 'array', of: [{ type: 'string' }] },
    { name: 'benefits', title: 'Client Benefits', type: 'array', of: [{ type: 'string' }] }
  ]
};

export const insightSchema = {
  name: 'article',
  title: 'Insight / Article',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'excerpt', title: 'Excerpt', type: 'text' },
    { name: 'content', title: 'Content', type: 'text' },
    { name: 'publishDate', title: 'Publish Date', type: 'date' },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } },
    { name: 'readTime', title: 'Read Time', type: 'string', description: 'e.g., 5 min read' },
    { name: 'author', title: 'Author', type: 'string' }
  ]
};

export const taxUpdateSchema = {
  name: 'taxUpdate',
  title: 'Tax Update',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'summary', title: 'Summary', type: 'text' },
    { name: 'content', title: 'Content', type: 'text' },
    { name: 'publishDate', title: 'Publish Date', type: 'date' },
    { name: 'source', title: 'Source', type: 'string', description: 'e.g., IRS, Ministry of Finance' },
    { name: 'importance', title: 'Importance', type: 'string', options: { list: ['low', 'medium', 'high'] } }
  ]
};

export const resourceSchema = {
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() },
    { name: 'type', title: 'Type', type: 'string', description: 'e.g., PDF Guide, Excel Template' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'downloadLink', title: 'Download Link', type: 'string' },
    { name: 'fileSize', title: 'File Size', type: 'string', description: 'e.g., 2.4 MB' }
  ]
};

export const teamSchema = {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required() },
    { name: 'designation', title: 'Designation / Role', type: 'string' },
    { name: 'bio', title: 'Bio', type: 'text' },
    { name: 'profileImage', title: 'Profile Image', type: 'image', options: { hotspot: true } },
    { name: 'expertise', title: 'Areas of Expertise', type: 'array', of: [{ type: 'string' }] },
    { name: 'credentials', title: 'Credentials', type: 'array', of: [{ type: 'string' }] }
  ]
};
