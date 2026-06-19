export const servicesData = [
  {
    id: 'us-tax-filing',
    title: 'US Tax Filing (Form 1040/1120-F)',
    description: 'Tax preparation and filing services for Non-Resident Indians (NRIs) residing in the US, US citizens with Indian income, and corporations handling US-sourced income.',
    category: 'individual',
    icon: 'FileText',
    features: [
      'Dual-status tax return analysis (first and last year of transition)',
      'Form 1040 (US Individual Tax) and Form 1040-NR (Nonresident Alien)',
      'Corporate filing: Form 1120 and Form 1120-F (Foreign corporations with US business)',
      'State and local filing requirements across US state jurisdictions'
    ],
    benefits: [
      'Evaluation of the India-US DTAA to prevent duplicate taxation of income',
      'Determination of eligible deductions as authorized under the Internal Revenue Code',
      'Filings prepared in compliance with statutory federal and state tax guidelines'
    ]
  },
  {
    id: 'international-tax-planning',
    title: 'International Tax Advisory',
    description: 'Tax planning advisory to structure assets, review tax exposures in both jurisdictions, and maintain regulatory compliance.',
    category: 'individual',
    icon: 'Globe',
    features: [
      'Pre-migration and post-migration tax reviews (India to US / US to India)',
      'Tax treaty disclosures and estate planning under local guidelines',
      'Compliance review of capital gains for Indian property transactions',
      'Advisory on cross-border asset transfers and gifting compliance'
    ],
    benefits: [
      'Assessment of tax liabilities prior to changing tax residency status',
      'Correct disclosures to reduce risk of regulatory audits and inquiries',
      'Informed, systematic approach to cross-border asset structures'
    ]
  },
  {
    id: 'fbar-compliance',
    title: 'FBAR Compliance (FinCEN Form 114)',
    description: 'Preparation and filing of foreign account disclosures to the Financial Crimes Enforcement Network (FinCEN). Mandatory for US persons holding accounts outside the US with aggregate balances exceeding $10,000.',
    category: 'individual',
    icon: 'ShieldAlert',
    features: [
      'Review of Indian bank accounts, fixed deposits, mutual funds, and demat accounts',
      'Calculation of peak balances in USD using standard Treasury exchange rates',
      'Electronic filing of FinCEN Form 114 with joint-holder reporting',
      'Assistance with Streamlined Compliance Procedures for past unfiled disclosures'
    ],
    benefits: [
      'Helps remain compliant with FBAR reporting mandates and avoid non-filing penalties',
      'Enables systematic regularization of past unfiled financial statements',
      'Filing verification direct from the FinCEN electronic portal'
    ]
  },
  {
    id: 'fatca-reporting',
    title: 'FATCA Reporting (Form 8938)',
    description: 'Expert guidance on Foreign Account Tax Compliance Act (FATCA) reporting requirements for specified foreign financial assets on Form 8938, annexed to Form 1040.',
    category: 'individual',
    icon: 'Scale',
    features: [
      'Analysis of disclosure thresholds based on filing and residency status',
      'Detailed reporting of provident funds, life insurance policies, and private equities',
      'Reconciliation with FBAR submissions to prevent information mismatches',
      'Beneficial ownership review for foreign entities (Forms 5471, 8865, and 8621)'
    ],
    benefits: [
      'Consistency between Form 8938 and FBAR filings to prevent administrative flags',
      'Clear evaluation of overseas retirement structures and financial accounts',
      'Accurate reporting of eligible Passive Foreign Investment Companies (PFIC)'
    ]
  },
  {
    id: 'nri-tax-advisory',
    title: 'NRI Tax Advisory & India Filings',
    description: 'Tax and compliance advisory for NRIs managing Indian income, renting or selling real property in India, and dealing with FEMA regulations.',
    category: 'individual',
    icon: 'BadgePercent',
    features: [
      'Filing of Indian Income Tax Returns (ITR-1 to ITR-3) for non-resident income',
      'Form 13 applications for Lower TDS Certificates on real estate sales',
      'Consultation on NRE, NRO, and FCNR bank accounts under FEMA guidelines',
      'Compliance assistance with outward remittances under the LRS framework'
    ],
    benefits: [
      'Coordinates Indian property sale withholding adjustments to match actual capital gains',
      'Facilitates compliant transfers of funds between India and the US',
      'Ensures correct tax treatments for income accrued in Indian accounts'
    ]
  },
  {
    id: 'cross-border-structuring',
    title: 'Cross-Border Entity Structuring',
    description: 'Corporate solutions and counseling for businesses establishing subsidiaries or scaling corporate structures across the US and India.',
    category: 'corporate',
    icon: 'Briefcase',
    features: [
      'Entity choices evaluation: Private Limited, Indian Subsidiary, LLC, or C-Corp',
      'Support with Transfer Pricing compliance and operational agreements',
      'Review of corporate inflows, outward licensing, and cross-border dividends',
      'Regulatory compliance for Form 5471 and Form 5472 filings'
    ],
    benefits: [
      'Avoids unintended double-taxation of multi-national corporate profits',
      'Transfer pricing documentation prepared in accordance with institutional tax guidelines',
      'Provides a regulatory-compliant corporate structure for cross-border investments'
    ]
  }
];

export const blogPosts = [
  {
    id: 'us-india-dtaa-capital-gains',
    title: 'Selling Property in India as an NRI: Navigating Tax and Lower TDS Certificates',
    excerpt: 'Selling real property in India triggers tax reporting in both India and the US. Learn how the Double Taxation Avoidance Agreement (DTAA) applies to your transaction.',
    category: 'India-US Tax Treaty',
    date: 'June 10, 2026',
    readTime: '6 min read',
    author: 'P. Suuresh, FCA',
    content: 'When an NRI sells property in India, the transaction is subject to Tax Deducted at Source (TDS) under Section 195 of the Income Tax Act. Often, the statutory TDS rate is higher than the actual capital gains tax liability of the seller. This article explains how NRIs can apply for a Lower TDS Certificate (Form 13) from the Income Tax Department to reduce the initial withholding. We also cover how the sale is reported on US Form 1040 and how to claim Foreign Tax Credits on Form 1116 to avoid dual taxation.',
    featured: true
  },
  {
    id: 'fbar-fincen-114-guide',
    title: 'FBAR Filing Requirements: Indian Bank and Demat Account Disclosures',
    excerpt: 'An overview of foreign asset reporting thresholds under IRS rules. Understand why savings, pension, and brokerage accounts all count toward the aggregate FBAR limits.',
    category: 'FBAR',
    date: 'May 28, 2026',
    readTime: '5 min read',
    author: 'Anjali Sharma, CPA',
    content: 'US citizens, green card holders, and resident aliens are required to report accounts held in foreign financial institutions if the aggregate value exceeds USD $10,000 at any time during the calendar year. This requirement includes not only standard bank accounts, but also Public Provident Funds (PPF), Employee Provident Funds (EPF), demat accounts, and certain insurance contracts. This guide breaks down the reporting steps on FinCEN Form 114.'
  },
  {
    id: 'pfic-tax-trap-mutual-funds',
    title: 'US Tax Treatment of Indian Mutual Funds: Overview of PFIC Classification',
    excerpt: 'Indian mutual funds are generally categorized as Passive Foreign Investment Companies (PFICs) by the IRS, which can lead to complex reporting and distinct tax rates.',
    category: 'US Tax',
    date: 'April 15, 2026',
    readTime: '8 min read',
    author: 'P. Suuresh, FCA',
    content: 'Under the US Internal Revenue Code, foreign registered mutual funds and unit trusts are classified as Passive Foreign Investment Companies (PFICs). Under Section 1291, passive investments without a qualified electing fund (QEF) status are subject to tax treatments that allocate distributions and gains over the holding period, often leading to elevated effective tax rates. We discuss the reporting requirements (Form 8621) and the compliance considerations when retaining these assets.'
  },
  {
    id: 'fatca-form-8938-vs-fbar',
    title: 'FBAR vs. Form 8938: Understanding the Key Distinctions',
    excerpt: 'Both forms require the disclosure of offshore financial holdings, but their filing thresholds, categories of assets, and regulatory purposes differ.',
    category: 'FATCA',
    date: 'March 22, 2026',
    readTime: '4 min read',
    author: 'Anjali Sharma, CPA',
    content: 'Filing FinCEN Form 114 (FBAR) does not exempt an individual from filing Form 8938 (FATCA) if applicable thresholds are met, and vice versa. Form 8938 is filed directly with the IRS as part of the annual individual tax package, while the FBAR is an independent report submitted to FinCEN. This analysis compares filing thresholds, asset coverage, and compliance requirements for both filings.'
  },
  {
    id: 'nri-repatriation-guide-fema',
    title: 'Repatriation of Funds from NRO Accounts: Form 15CA and Form 15CB Details',
    excerpt: 'A clean compliance guide for non-residents repatriating real estate sale proceeds or inherited funds from India, including the required certificates.',
    category: 'NRI Compliance',
    date: 'February 12, 2026',
    readTime: '6 min read',
    author: 'P. Suuresh, FCA',
    content: 'Under the Foreign Exchange Management Act (FEMA), NRIs are permitted to repatriate up to USD $1 million per financial year from their Non-Resident Ordinary (NRO) accounts. This process requires submitting Form 15CA online and securing a Form 15CB certificate signed by a practicing Chartered Accountant, which verifies that the appropriate taxes have been paid or withheld. We review the required documentation and exchange guidelines.'
  }
];

export const govUpdatesData = [
  {
    id: 'irs-update-8938-thresholds',
    title: 'IRS Clarifies Asset Disclosure Rules for Non-Resident Filers',
    date: 'June 01, 2026',
    source: 'Internal Revenue Service (IRS)',
    category: 'IRS Updates',
    summary: 'The IRS has released updated guidelines clarifying filing thresholds and reporting requirements on Form 8938 (FATCA) for individuals transitioning tax residency between India and the United States.',
    importance: 'medium'
  },
  {
    id: 'fbar-filing-automatic-extension',
    title: 'FBAR (FinCEN Form 114) Filing Period and Automatic Extension',
    date: 'June 15, 2026',
    source: 'FinCEN Treasury',
    category: 'FBAR Deadlines',
    summary: 'FinCEN reminds taxpayers that the statutory FBAR deadline coincides with the regular federal income tax deadline, with an automatic 6-month extension to October 15, 2026, without the need for a separate extension request.',
    importance: 'high'
  },
  {
    id: 'india-budget-tds-real-estate',
    title: 'Income Tax Update: Property Sales Involving Non-Resident Sellers',
    date: 'May 10, 2026',
    source: 'Ministry of Finance (India)',
    category: 'Regulatory Announcements',
    summary: 'Updates concerning capital gains calculation and TDS processing for properties sold by non-residents in India. Procedural guidelines for physical and e-filing portals have been revised.',
    importance: 'high'
  },
  {
    id: 'irs-treaty-compliance-audits',
    title: 'IRS Focuses on Treaty-Based Return Disclosures (Form 8833)',
    date: 'April 05, 2026',
    source: 'IRS Commissioner Statement',
    category: 'Tax Notices',
    summary: 'The IRS has indicated increased review of treaty-focused return disclosures on Form 8833, verifying qualifications for claims made under Double Taxation Avoidance Agreements.',
    importance: 'medium'
  }
];

export const taxDeadlinesData = [
  {
    id: 'dl-1',
    event: 'US Federal Tax Return Filing (Form 1040/1120)',
    date: 'April 15, 2026',
    category: 'US',
    description: 'Deadline to file US Individual and Corporate income tax returns, or file an application for an automatic 6-month extension.'
  },
  {
    id: 'dl-2',
    event: 'Expatriate Tax Filing Extension (Automatic)',
    date: 'June 15, 2026',
    category: 'US',
    description: 'Automatic 2-month filing extension granted to US citizens and resident aliens living and working outside the United States.'
  },
  {
    id: 'dl-3',
    event: 'Indian Income Tax Return (ITR) Filing',
    date: 'July 31, 2026',
    category: 'India',
    description: 'Deadline to file individual income tax returns in India (including NRIs with Indian-sourced income) for the Assessment Year 2026-27.'
  },
  {
    id: 'dl-4',
    event: 'Extended FBAR & US Federal Return Deadline',
    date: 'October 15, 2026',
    category: 'FBAR/FATCA',
    description: 'Final extended deadline for electronic FBAR (FinCEN Form 114) reporting and Form 1040 federal return filings under the extension period.'
  }
];

export const complianceChecklists = [
  {
    id: 'checklist-nri',
    title: 'Pre-migration Tax Review (India to US)',
    audience: 'Individuals relocating from India to the US for professional opportunities or business setups',
    items: [
      'Redesignate Indian bank accounts to NRO Accounts in compliance with FEMA guidelines.',
      'Convert domestic Demat and brokerage accounts to Non-Resident status.',
      'Compile historical transaction records and asset values to establish tax basis for future reporting.',
      'Evaluate Indian mutual fund holdings to understand IRS passive investment (PFIC) treatment.',
      'Review foreign life insurance and savings policies for potential FATCA Form 8938 disclosures.'
    ]
  },
  {
    id: 'checklist-us-citizen-india',
    title: 'US Citizens & Green Card Holders Residing in India',
    audience: 'US citizens or lawful permanent residents living in India seeking to maintain IRS compliance',
    items: [
      'Prepare annual Form 1040 returns reportable to the IRS, declaring worldwide income sources.',
      'Check if the combined maximum valuation of Indian accounts exceeded $10,000 to determine FBAR requirements.',
      'Identify applicable FATCA thresholds to determine if Form 8938 is required.',
      'Utilize eligible Foreign Tax Credits (Form 1116) or exclusions to alleviate dual tax incidences.',
      'Identify any ownership in Indian corporate entities subject to Form 5471 or Form 8865 declarations.'
    ]
  }
];

export const resourcesData = [
  {
    id: 'guide-us-india-taxation',
    title: 'Comprehensive Guide to US-India Cross-Border Taxation (2026 Edition)',
    type: 'PDF Guide',
    fileSize: '2.4 MB',
    description: 'A detailed informational reference compiling DTAA articles, FBAR guidelines, FATCA thresholds, PFIC treatments, and Indian real estate transactions.'
  },
  {
    id: 'calculator-fbar-peak',
    title: 'FBAR Balance Compilation & Currency Conversion Worksheet',
    type: 'Excel Template',
    fileSize: '430 KB',
    description: 'A spreadsheet utility designed to compile foreign financial accounts and convert peak balances to USD using annual IRS-approved Treasury exchange rates.'
  },
  {
    id: 'worksheet-property-sale',
    title: 'Indian Property Sale Capital Gains Planning Form',
    type: 'Form Worksheet',
    fileSize: '1.1 MB',
    description: 'An informational cost-compilation worksheet to categorize asset acquisition dates, indexation values, and eligible foreign tax credits.'
  }
];

export const teamData = [
  {
    id: 'p-suuresh',
    name: 'P. Suuresh, FCA, DISA',
    role: 'Managing Partner - Cross-Border Tax & Compliance',
    expertise: ['Bilateral Treaty Application', 'FEMA Compliance Advisory', 'Estate Property Capital Gains'],
    credentials: ['Fellow Chartered Accountant (FCA), ICAI', 'Diploma in Information Systems Audit (DISA)', 'Over 30 Years of Professional Tax Practice'],
    bio: 'Suuresh is a veteran specialist in corporate cross-border operations and NRI wealth advisory. He has advised over 1,500 NRIs on funds repatriation, property transactions in India, and complex FEMA guidelines. He regularly participates in professional tax development seminars and local ICAI chapters.',
    imageAlt: 'Corporate Portrait of P. Suuresh, Chartered Accountant'
  },
  {
    id: 'anjali-sharma',
    name: 'Anjali Sharma, CPA (USA), ACA',
    role: 'Partner – US Tax & Expatriate Services',
    expertise: ['Individual Form 1040 Filing', 'FBAR/FATCA Compliance Programs', 'PFIC Disclosure Consulting'],
    credentials: ['Certified Public Accountant (CPA) - New Hampshire Accountancy Board', 'Associate Chartered Accountant (ACA), ICAI', '12+ Years in Cross-Border Professional Services'],
    bio: 'Anjali focuses on US expatriate compliance, tax residency definitions, and Streamlined Disclosure programs. Prior to joining P. Suuresh & Associates, she worked on cross-border tax advisory accounts for private clients at professional consulting firms in New York and Bangalore.',
    imageAlt: 'Corporate Portrait of Anjali Sharma, CPA'
  },
  {
    id: 'rohit-mehta',
    name: 'Rohit Mehta, LLB, ACS',
    role: 'Advisory Associate – Corporate Operations & FEMA Rules',
    expertise: ['Cross-Border Entity Advisory', 'Transfer Pricing Reporting', 'FEMA Regulatory Disclosures'],
    credentials: ['Bachelor of Laws (LLB) - Delhi University', 'Associate Company Secretary (ACS), ICSI', 'Professional Member of the International Fiscal Association'],
    bio: 'Rohit supports corporate entities and dual-country ventures with structured entity choices, Transfer Pricing reports, and FEMA regulatory paperwork. He provides clear compliance advisory for foreign investing and corporate setups.',
    imageAlt: 'Corporate Portrait of Rohit Mehta, Legal & FEMA Specialist'
  }
];

export const testimonialsData = [
  {
    id: 'rev-1',
    name: 'Sanjeev Nair',
    role: 'Technology Enterprise VP',
    company: 'SF Bay Area',
    quote: 'Selling our ancestral property in Hyderabad involved intricate compliance. Anjali and Suuresh arranged for our Lower TDS Certificate from India and structured the foreign tax credit on our US return to avoid duplicate federal tax exposure. Their assistance was accurate and reliable.',
    location: 'San Francisco, CA',
    rating: 5
  },
  {
    id: 'rev-2',
    name: 'Meera Deshmukh',
    role: 'Research Scientist',
    company: 'Clinical Research Labs',
    quote: 'As a green card holder, I was unaware of FBAR and FATCA requirements regarding my Indian accounts. P. Suuresh & Associates guided me through the Streamlined Disclosure procedure step-by-step, helping me resolve years of unfiled holdings without complications.',
    location: 'Boston, MA',
    rating: 5
  },
  {
    id: 'rev-3',
    name: 'Rajiv Singhal',
    role: 'Managing Director',
    company: 'ZettaScale Technologies',
    quote: 'We retained the firm to structure our regional subsidiary. They compiled our Transfer Pricing documentation and drafted intercompany services agreements. Their professional expertise in both Indian and US compliance was indispensable for our operations.',
    location: 'Austin, TX',
    rating: 5
  }
];
