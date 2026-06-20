export const SERVICES_QUERY = `*[_type == "service"] {
  "id": _id,
  title,
  "slug": slug.current,
  category,
  description,
  icon,
  features,
  benefits
}`;

export const INSIGHTS_QUERY = `*[_type == "article" || _type == "insight"] | order(publishDate desc) {
  "id": _id,
  title,
  "slug": slug.current,
  excerpt,
  content,
  "date": coalesce(publishDate, _createdAt),
  category,
  "featuredImage": featuredImage.asset->url,
  "readTime": readTime,
  "author": author
}`;

export const TAX_UPDATES_QUERY = `*[_type == "taxUpdate" || _type == "govUpdate"] | order(publishDate desc) {
  "id": _id,
  title,
  "slug": slug.current,
  summary,
  content,
  "date": coalesce(publishDate, _createdAt),
  source,
  importance
}`;

export const RESOURCES_QUERY = `*[_type == "resource"] {
  "id": _id,
  title,
  type,
  description,
  downloadLink,
  "fileSize": coalesce(fileSize, "N/A")
}`;

export const TEAM_MEMBERS_QUERY = `*[_type == "teamMember" || _type == "team"] {
  "id": _id,
  name,
  "role": coalesce(designation, role),
  bio,
  "profileImage": profileImage.asset->url,
  expertise,
  credentials
}`;
