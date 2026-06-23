import fs from 'fs';
import path from 'path';

// Load mockData to extract the static non-CMS arrays
const mockDataContent = fs.readFileSync('./src/data/mockData.js', 'utf8');

// Use simple regex to extract the arrays
const testimonialsMatch = mockDataContent.match(/export const testimonialsData = \[([\s\S]*?)\];/);
const testimonialsCode = testimonialsMatch ? testimonialsMatch[0].replace('export ', '') : 'const testimonialsData = [];';

const complianceChecklistsMatch = mockDataContent.match(/export const complianceChecklists = (\[[\s\S]*?\]);\n/);
const checklistsCode = complianceChecklistsMatch ? complianceChecklistsMatch[0].replace('export ', '') : 'const complianceChecklists = [];';

// Clean useServices
const servicesHookMap = fs.readFileSync('./src/pages/Services.jsx', 'utf8')
  .replace(/import \{ servicesData \} from '\.\.\/data\/mockData';\n/, '')
  .replace(/const servicesList = servicesDataFromCMS && servicesDataFromCMS\.length > 0 \? servicesDataFromCMS : servicesData;/, 'const servicesList = servicesDataFromCMS || [];')
  .replace(/servicesList\.length > 0 \? \(/, 'servicesList.length === 0 ? (<div className="max-w-4xl mx-auto py-20 text-center"><p className="text-xl text-theme-text-secondary">No content available.</p></div>) : (');
fs.writeFileSync('./src/pages/Services.jsx', servicesHookMap);

// Clean useTeam
const teamHookMap = fs.readFileSync('./src/pages/Team.jsx', 'utf8')
  .replace(/import \{ teamData \} from '\.\.\/data\/mockData';\n/, '')
  .replace(/const teamList = teamMembers && teamMembers\.length > 0 \? teamMembers : teamData;/, 'const teamList = teamMembers || [];')
  .replace(/\{.*?teamList\.map\(\(member\)/s, (match) => {
    return `{teamList.length === 0 ? (<div className="col-span-full py-20 text-center"><p className="text-xl text-theme-text-secondary">No content available.</p></div>) : teamList.map((member)`;
  });
fs.writeFileSync('./src/pages/Team.jsx', teamHookMap);

// Clean Resources
let resourcesHookMap = fs.readFileSync('./src/pages/Resources.jsx', 'utf8')
  .replace(/import {[\s\S]*?} from '\.\.\/data\/mockData';/, '')
  .replace(/const resourcesList = cmsResources && cmsResources\.length > 0 \? cmsResources : resourcesData;/, 'const resourcesList = cmsResources || [];')
  .replace(/const deadlinesList = cmsDeadlines && cmsDeadlines\.length > 0 \? cmsDeadlines : taxDeadlinesData;/, 'const deadlinesList = cmsDeadlines || [];');

// Add empty states to Resources
resourcesHookMap = resourcesHookMap
  .replace(/\{deadlinesList\.map/, '{deadlinesList.length === 0 ? <div className="text-center py-20 text-theme-text-secondary">No content available.</div> : deadlinesList.map')
  .replace(/\{resourcesList\.map/, '{resourcesList.length === 0 ? <div className="text-center py-20 text-theme-text-secondary w-full col-span-3">No content available.</div> : resourcesList.map');

// Inject complianceChecklists back into Resources since it's not CMS data
resourcesHookMap = resourcesHookMap.replace(/import SEO from '\.\.\/components\/SEO';\n/, `import SEO from '../components/SEO';\n\n${checklistsCode}\n`);
fs.writeFileSync('./src/pages/Resources.jsx', resourcesHookMap);

// Clean Home
let homeHookMap = fs.readFileSync('./src/pages/Home.jsx', 'utf8')
  .replace(/import \{ servicesData, testimonialsData, blogPosts, govUpdatesData \} from '\.\.\/data\/mockData';\n/, `import useServices from '../hooks/useServices';
import useArticles from '../hooks/useArticles';
import useTaxUpdates from '../hooks/useTaxUpdates';\n\n${testimonialsCode}\n`)
  .replace(/const mainServices = servicesData.slice\(0, 3\);/, "const { data: servicesData = [], loading: sLoading } = useServices();\n  const mainServices = servicesData.slice(0, 3);")
  .replace(/const chosenTestimonials = testimonialsData.slice\(0, 3\);/, "const { data: blogPosts = [], loading: bLoading } = useArticles();\n  const { data: govUpdatesData = [], loading: gLoading } = useTaxUpdates();\n  const chosenTestimonials = testimonialsData.slice(0, 3);");

fs.writeFileSync('./src/pages/Home.jsx', homeHookMap);

// Clean cmsService
let cmsServiceMap = fs.readFileSync('./src/admin/services/cmsService.js', 'utf8')
  .replace(/import \{ servicesData, blogPosts, govUpdatesData, resourcesData, teamData, taxDeadlinesData \} from '\.\.\/\.\.\/data\/mockData';\n/, '')
  .replace(/\/\/ Initialize localStorage fallback state if not already populated[\s\S]*?initLocalStorage\(\);/m, 'const initLocalStorage = () => {};');
fs.writeFileSync('./src/admin/services/cmsService.js', cmsServiceMap);

