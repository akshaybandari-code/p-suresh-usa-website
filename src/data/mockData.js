// Centralized Local Mock Data for P. Suuresh & Associates
// Fully offline-capable, reusable, and consumed across all pages of the application.

export const mockServices = [
  {
    id: 'service-1',
    title: 'Dual-Jurisdiction Expat Tax Preparation',
    slug: 'expat-tax-preparation',
    category: 'individual',
    description: 'Comprehensive tax filing for US citizens and green card holders residing in India. We optimize international exclusions, foreign tax credits, and treaty provisions to minimize dual liabilities.',
    icon: 'FileText',
    features: [
      'Form 1040 & 1040-NR preparation and optimization',
      'Foreign Earned Income Exclusion (Form 2555) evaluation',
      'Foreign Tax Credit (Form 1116) mapping for Indian source tax',
      'Bilateral state-level tax return compliance audits'
    ],
    benefits: [
      'Eliminates duplicate taxation on Indian earned salary',
      'Ensures full compliance with the IRS and domestic rules',
      'Maximize deductions for non-resident status filers'
    ]
  },
  {
    id: 'service-2',
    title: 'FBAR & FATCA Disclosure Services',
    slug: 'fbar-fatca-disclosures',
    category: 'individual',
    description: 'Expert guidance on reporting foreign financial accounts (FinCEN Form 114) and foreign assets (Form 8938) for US persons holding Indian assets, provident funds, and mutual funds.',
    icon: 'ShieldAlert',
    features: [
      'FinCEN Form 114 (FBAR) online portal electronic filing',
      'IRS Form 8938 (FATCA statement) integration',
      'Valuation of Indian PPF, EPF, and LIC cash surrender value',
      'Audit-proof trail documentation for foreign asset disclosures'
    ],
    benefits: [
      'Avoid severe civil penalties ($10k+ per non-willful violation)',
      'Accurately reconcile bank and investment accounts',
      'Clear compliance path for cross-border legacy assets'
    ]
  },
  {
    id: 'service-3',
    title: 'IRS Streamlined Filing Compliance',
    slug: 'streamlined-compliance',
    category: 'individual',
    description: 'A structured amnesty pathway for non-willful US taxpayers in India to catch up on unfiled returns and FBARs without facing penalties or administrative prosecution.',
    icon: 'Scale',
    features: [
      'Preparation of 3 years of late Form 1040/1040-NR returns',
      'Reconstruction of 6 years of historical FBAR filings',
      'Drafting of certified IRS Non-Willfulness Statements',
      'Comprehensive penalty waiver negotiation & submission'
    ],
    benefits: [
      '100% penalty waiver for foreign expats qualifying for SDOP',
      'Restores perfect standing with the US Treasury',
      'Confidential and professional case assessment'
    ]
  },
  {
    id: 'service-4',
    title: 'Cross-Border Real Estate & Lower TDS',
    slug: 'real-estate-lower-tds',
    category: 'both',
    description: 'Assisting NRIs in structuring the sale of inherited or acquired property in India. We manage Form 197 applications for lower withholding tax (TDS) and optimize US capital gains.',
    icon: 'BadgePercent',
    features: [
      'Income Tax Form 197 lower TDS certificate filing in India',
      'US Section 121 primary residence exclusion analysis',
      'Double Taxation Avoidance Agreement (DTAA) credit mapping',
      'Historical cost basis calculation using indexation tables'
    ],
    benefits: [
      'Reduces Indian property sale TDS from 22.8% to under 3%',
      'Eliminates cash flow lockup with the Indian Tax Department',
      'Streamlines repatriations of funds to US bank accounts'
    ]
  },
  {
    id: 'service-5',
    title: 'PFIC Analysis & Mutual Fund Reporting',
    slug: 'pfic-reporting',
    category: 'individual',
    description: 'Navigating the punitive US Passive Foreign Investment Company (PFIC) guidelines for Indian mutual funds and equity holdings to minimize confiscatory interest and tax rates.',
    icon: 'Briefcase',
    features: [
      'IRS Form 8621 election modeling (QEF vs. Mark-to-Market)',
      'Reconstruction of historical cost basis for Indian mutual funds',
      'Analysis of Indian ETF and unit-linked insurance tax impact',
      'Compliant portfolio design for cross-border investors'
    ],
    benefits: [
      'Reduces marginal tax rates from 37%+ down to capital gains rates',
      'Avoids cumulative interest penalties on deferred earnings',
      'Accurate tax optimization for wealth build-up'
    ]
  },
  {
    id: 'service-6',
    title: 'Corporate Transfer Pricing & Subsidiaries',
    slug: 'transfer-pricing-subsidiaries',
    category: 'corporate',
    description: 'Comprehensive compliance and advisory for US companies setting up back-offices or subsidiaries in India, and Indian corporations expanding into the US market.',
    icon: 'Globe',
    features: [
      'Arm-length price benchmarking studies under Section 482',
      'IRS Form 5471 (controlled foreign corporations) filing',
      'IRS Form 5472 (foreign-owned US corporations) reporting',
      'Drafting intercompany service level agreements (SLAs)'
    ],
    benefits: [
      'Prevents double-taxation adjustments by IRS or Indian ITD',
      'Establishes defensible transfer pricing methodologies',
      'Ensures compliance with GILTI, Subpart F, and BEAT rules'
    ]
  },
  {
    id: 'service-7',
    title: 'India-US Estate & Inheritance Planning',
    slug: 'estate-inheritance-planning',
    category: 'both',
    description: 'Structured planning to protect family wealth transferred across borders. We coordinate Indian estate structures, gift taxes, and US estate/trust reporting.',
    icon: 'Scale',
    features: [
      'IRS Form 3520 (Foreign Gift/Trust Receipt) preparation',
      'Structuring of cross-border family trusts',
      'DTAA Article 28 analysis on Estate and Gift tax relief',
      'Coordination of legal heirs and asset transmission processes'
    ],
    benefits: [
      'Protects US heirs from severe penalties on foreign gift reporting',
      'Reconciles Indian gift tax exemptions with US exclusion limits',
      'Guarantees seamless multi-generational wealth transitions'
    ]
  },
  {
    id: 'service-8',
    title: 'Pre-Departure Residency Transition Planning',
    slug: 'residency-transition-planning',
    category: 'both',
    description: 'Critical strategic advisory for professionals transitioning physical residency between the US and India to manage timing, exit taxes, and asset disclosures.',
    icon: 'Globe',
    features: [
      'IRS Substantial Presence Test (SPT) and treaty tie-breaker rules',
      'Transition planning for EPF, PPF, and Indian Demat accounts',
      'Dual-status tax return preparation for transition year',
      'Restructuring of US brokerage and IRA retirement plans'
    ],
    benefits: [
      'Prevents accidental global tax liability on Indian property sales',
      'Ensures correct tax resident status with both IRS and India',
      'Optimizes step-up in basis provisions where applicable'
    ]
  }
];

export const mockArticles = [
  {
    id: 'art-1',
    title: 'Navigating IRS Rules on Inheriting Indian Properties',
    slug: 'inheriting-indian-properties-irs',
    excerpt: 'Understanding Form 3520 reporting thresholds, cost basis indexation, and capital gains structures when a US citizen inherits assets in India.',
    content: 'Inheriting property in India is a common and financially significant milestone for Non-Resident Indians (NRIs) and dual citizens. However, from an IRS perspective, several strict compliance mandates apply immediately. First, while there is no US estate or inheritance tax on foreign properties inherited by a US person, you must file IRS Form 3520 if you receive a bequest or gift from a non-US person that exceeds $100,000 in a calendar year. Failure to file this form on time can trigger non-willful penalties of 25% of the asset value. Second, calculating the cost basis of the property for future sales requires establishing the fair market value (FMV) on the date of the decedent\'s death, converted to USD. We explore these indexation guidelines, FEMA rules on NRI repatriations, and how the US-India double-tax treaty (DTAA) protects you from double taxation.',
    date: 'June 18, 2026',
    category: 'NRI Compliance',
    featuredImage: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=800',
    readTime: '6 min read',
    author: 'Anjali Suresh, CPA',
    featured: true
  },
  {
    id: 'art-2',
    title: 'Demystifying PFIC: Why Indian Mutual Funds Can Be a US Tax Trap',
    slug: 'pfic-indian-mutual-funds-tax-trap',
    excerpt: 'An in-depth look at Passive Foreign Investment Company (PFIC) rules and why the IRS taxes Indian mutual funds at punitive rates up to 37% plus interest.',
    content: 'Many US residents of Indian origin invest in Indian mutual funds to capture growth in the emerging domestic market. What they often do not realize is that the IRS classifies practically all foreign mutual funds, ETFs, and unit-linked insurance plans as Passive Foreign Investment Companies (PFICs) under Internal Revenue Code Section 1297. Standard US tax exemptions do not apply to PFICs; instead, they are subject to punitive tax rates. Undistributed earnings and "excess distributions" are taxed at the highest individual marginal tax rate (currently 37%), and interest is charged retroactively for each day the tax was deferred. To mitigate this confiscatory treatment, investors can file IRS Form 8621 and make a Qualified Electing Fund (QEF) or Mark-to-Market (MTM) election. This guide details how these elections work and why structuring your Indian portfolio under US-compliant pathways is vital.',
    date: 'June 12, 2026',
    category: 'FATCA',
    featuredImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800',
    readTime: '8 min read',
    author: 'P. Suuresh, FCA',
    featured: false
  },
  {
    id: 'art-3',
    title: 'FBAR vs Form 8938: Reconciling Foreign Financial Asset Disclosures',
    slug: 'fbar-vs-form-8938-disclosures',
    excerpt: 'Many expats confuse FBAR and FATCA Form 8938. Learn the key differences in reporting thresholds, eligible assets, and potential non-filing penalties.',
    content: 'If you are a US citizen, green card holder, or resident national with financial accounts in India, you likely have dual reporting requirements under FBAR and FATCA. While they seem identical, they are governed by different bodies and have distinct thresholds. FBAR (FinCEN Form 114) is administered by the Financial Crimes Enforcement Network and has a flat reporting threshold of $10,000 in aggregate across all foreign accounts at any point during the year. It covers bank accounts, mutual funds, PPF, EPF, and cash-value insurance. Form 8938 is an IRS FATCA requirement with higher thresholds ($50,000 to $400,000 depending on filing status and location) and includes non-account assets like partnership interests, foreign stock certificates, and deferred compensation. Understanding which form to file is critical because missing either can lead to severe fines and audits. This publication outlines comparison charts, step-by-step checklists, and real-world case studies.',
    date: 'May 28, 2026',
    category: 'FBAR',
    featuredImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min read',
    author: 'Anjali Suresh, CPA',
    featured: false
  },
  {
    id: 'art-4',
    title: 'Securing a Lower TDS Certificate (Form 197) for NRI Property Sales',
    slug: 'lower-tds-certificate-form-197-nri',
    excerpt: 'How NRI home sellers can avoid a 22.8% withholding tax on Indian real estate transactions by securing an advance Lower TDS Certificate from the ITD.',
    content: 'NRIs selling residential property in India are often shocked to learn that buyers are legally required to withhold Tax Deducted at Source (TDS) at a flat rate of 20% (plus surcharges and cess, totaling 22.8%) on the gross sale value, rather than on the actual capital gains. This means on a sale of INR 1 Crore, INR 22.8 Lakhs is immediately withheld, even if the actual capital gain is negligible or negative. To prevent this severe cash lockup, NRIs can apply for a Lower TDS Certificate under Section 197 of the Income Tax Act by submitting Form 13 with supporting purchase deeds, indexation calculations, and proof of reinvestment plans in India. Processing takes 4 to 8 weeks and instructs the buyer to deduct a much lower percentage (typically 1% to 3% of the sale value). We walk you through the document compilation, online filing portal steps, and how to coordinate this with your US capital gains disclosures.',
    date: 'May 14, 2026',
    category: 'India-US Treaties',
    featuredImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    readTime: '7 min read',
    author: 'P. Suuresh, FCA',
    featured: false
  },
  {
    id: 'art-5',
    title: 'Pre-Departure Checklist: Moving from India to the United States',
    slug: 'pre-departure-checklist-india-to-us',
    excerpt: 'Key tax maneuvers to execute before arriving in the US, including Demat account conversions, NRE/NRO designations, and basis step-ups.',
    content: 'Transitioning from India to the US is an exciting career move, but failing to arrange your financial affairs beforehand can expose your Indian earnings to immediate US taxation. Once you meet the US Substantial Presence Test (generally 183 days), you are considered a US Tax Resident and must report worldwide income. Essential checklist steps before boarding your flight include: 1. Convert your Indian savings accounts to Non-Resident Ordinary (NRO) and Non-Resident External (NRE) accounts. 2. Notify your Indian mutual fund houses of your NRI status. 3. Evaluate your Public Provident Fund (PPF) - while interest is tax-exempt in India, it is taxable annually in the US. 4. Redesignate your domestic Demat account to a Portfolio Investment Scheme (PIS) NRI account. Executing these transitions properly protects your historical wealth from inadvertent US tax and FBAR penalties.',
    date: 'April 22, 2026',
    category: 'NRI Compliance',
    featuredImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800',
    readTime: '10 min read',
    author: 'Anjali Suresh, CPA',
    featured: false
  },
  {
    id: 'art-6',
    title: 'Double Taxation Treaties: Maximizing Foreign Tax Credits on Form 1116',
    slug: 'double-taxation-treaty-foreign-tax-credits',
    excerpt: 'How to utilize the India-US DTAA to claim tax credits on your US return for taxes already paid in India on rental income, capital gains, or dividends.',
    content: 'The Double Taxation Avoidance Agreement (DTAA) signed between the US and India provides an essential shield against being taxed twice on the same income. When an individual pays tax on Indian-sourced income (such as rent on a flat in Bangalore, interest on NRO deposits, or capital gains on Indian equities), they can offset their US tax liability on that same income by claiming a Foreign Tax Credit (FTC) using IRS Form 1116. This credit is categorised into General Limit Income (for salaries and business profits) and Passive Income (for interest, dividends, and royalties). However, the IRS limits the credit to the lesser of the actual foreign tax paid or the US tax allocated to that foreign income. This article explains how to compute these allocation ratios, carry back/forward unused credits, and avoid common errors that trigger IRS audits.',
    date: 'April 10, 2026',
    category: 'India-US Treaties',
    featuredImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800',
    readTime: '6 min read',
    author: 'P. Suuresh, FCA',
    featured: false
  },
  {
    id: 'art-7',
    title: 'The Streamlined Procedure: Catching Up on Unfiled Foreign Assets',
    slug: 'streamlined-compliance-amnesty-irs',
    excerpt: 'Did you miss several years of FBAR and FATCA filings? The Streamlined Foreign Offshore Procedure is your path to 100% penalty amnesty.',
    content: 'For many expats and green card holders, discovering they have been in violation of US foreign asset disclosure laws is a stressful experience. Fortunately, the IRS offers a highly successful amnesty program called the Streamlined Filing Compliance Procedures. Designed specifically for taxpayers whose failure to disclose was "non-willful" (due to negligence, inadvertence, or genuine misunderstanding of the law), the program requires filing 3 years of late federal returns, 6 years of late FBARs, and a detailed certification statement declaring the non-willfulness of the omission. For eligible US expats residing abroad (including India), the IRS waives 100% of the late-filing and FBAR penalties. For those living in the US, the penalty is limited to a flat 5% of the highest balance of the foreign assets. We detail the eligibility guidelines, required documentation, and step-by-step strategy to secure peace of mind.',
    date: 'March 15, 2026',
    category: 'FBAR',
    featuredImage: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=800',
    readTime: '9 min read',
    author: 'Anjali Suresh, CPA',
    featured: false
  },
  {
    id: 'art-8',
    title: 'Tax Treatment of Indian Provident Funds (EPF & PPF) for US Persons',
    slug: 'tax-treatment-indian-provident-funds-us',
    excerpt: 'Learn why Public Provident Funds (PPF) and Employee Provident Funds (EPF) are treated differently by the IRS and how to report them legally.',
    content: 'Indian Provident Funds are highly popular tax-saving vehicles in India. The Public Provident Fund (PPF) offers tax-free interest, tax-free contributions, and tax-free withdrawals under Indian Section 80C. However, the US IRS does not recognize Indian tax-free designations. For a US person, PPF interest is taxable annually, even if it is not withdrawn or accessible. Conversely, Employee Provident Funds (EPF) are recognized under treaty clauses. While employer contributions and interest are deferred until withdrawal if you are a qualified employee, they must still be reported. Both EPF and PPF balances must be declared annually on the FBAR and Form 8938 if they meet the thresholds. This article covers the tax calculation formulas, reporting boxes, and proper reporting methodologies.',
    date: 'March 02, 2026',
    category: 'US Tax',
    featuredImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800',
    readTime: '7 min read',
    author: 'P. Suuresh, FCA',
    featured: false
  }
];

export const mockTaxUpdates = [
  {
    id: 'up-1',
    title: 'IRS Launches Special Campaign Targeting Offshore Assets and FBAR Compliance',
    slug: 'irs-offshore-campaign-fbar-2026',
    summary: 'The IRS has announced an aggressive audits campaign focusing on unfiled FBARs and unreported foreign financial assets held by dual residents, particularly in South Asia.',
    content: 'The Internal Revenue Service (IRS) is rolling out a new compliance campaign designed to identify US citizens and permanent residents who have failed to report foreign bank accounts, mutual funds, and cash-value assets. Leveraging data shared via FATCA by Indian financial institutions, the IRS is matching local bank records directly against filed Form 8938 and FinCEN 114 reports. Discrepancies are triggering automatic inquiry letters. Taxpayers with unfiled assets are strongly advised to utilize voluntary disclosure or streamlined compliance programs before they are flagged for audit, as penalties are significantly higher once an audit begins.',
    date: 'June 15, 2026',
    source: 'Internal Revenue Service (IRS)',
    importance: 'high',
    category: 'IRS News',
    guidelines: [
      'Conduct a thorough review of all Indian bank, pension, and mutual fund balances from 2020 through 2025.',
      'Reconcile annual interest and capital gains from NRO/NRE statements on Form 1040.',
      'If aggregate balances exceeded $10,000 at any point, verify that an FBAR was filed.'
    ]
  },
  {
    id: 'up-2',
    title: 'India-US Joint FATCA Audits: Auto-Matching of PAN & SSN Commences',
    slug: 'india-us-fatca-auto-matching-pan-ssn',
    summary: 'The Indian Income Tax Department and IRS have completed integration of their automated data-sharing systems to link Permanent Account Numbers (PAN) with Social Security Numbers (SSN).',
    content: 'Under the bilateral Foreign Account Tax Compliance Act (FATCA) Inter-Governmental Agreement (IGA), tax authorities in India and the US have transitioned to fully automated matching of financial records. Indian mutual fund houses, cooperative banks, and insurance firms are now submitting PAN data that is mapped to SSNs and transmitted directly to the US Treasury. This has led to a significant spike in notices regarding foreign dividend income and bank balance disclosures.',
    date: 'May 10, 2026',
    source: 'Central Board of Direct Taxes (CBDT) / IRS',
    importance: 'high',
    category: 'FATCA',
    guidelines: [
      'Ensure all Indian bank accounts have updated FATCA/CRS self-certification forms.',
      'Cross-verify PAN declarations in India with your US tax filings.',
      'Disclose all foreign life insurance policies with cash surrender value on Form 8938.'
    ]
  },
  {
    id: 'up-3',
    title: 'IRS Clarifies Treatment of Indian provident funds (PPF) Interest Accruals',
    slug: 'irs-clarifies-treatment-indian-ppf-interest',
    summary: 'A new technical guidance letter clarifies that Public Provident Fund interest remains subject to current year US taxation and does not qualify for tax-deferral treaties.',
    content: 'The IRS issued technical guidance confirming that interest earned inside Indian Public Provident Fund (PPF) accounts is fully taxable in the year of accrual for US tax residents. Unlike Employee Provident Funds (EPF), which fall under pension treaty deferrals, PPF is classified as an individual savings scheme, and its tax-exempt status in India is unrecognized by the US. Taxpayers must compute accrued interest annually and report it on Schedule B of Form 1040.',
    date: 'April 05, 2026',
    source: 'IRS Office of Chief Counsel',
    importance: 'medium',
    category: 'Expat Compliance',
    guidelines: [
      'Download annual interest summaries from your PPF account provider.',
      'Convert interest accruals to USD using the Treasury Department\'s yearly average exchange rate.',
      'Report the calculated interest as foreign passive interest on Schedule B.'
    ]
  },
  {
    id: 'up-4',
    title: 'FinCEN Electronic FBAR Portal Upgraded with Automated Basis Tracking',
    slug: 'fincen-fbar-portal-upgrade-basis-tracking',
    summary: 'The Financial Crimes Enforcement Network (FinCEN) has deployed an updated filing portal with cross-validation checks for historical account balances.',
    content: 'FinCEN has upgraded its electronic filing system for FinCEN Form 114 (FBAR). The new platform includes database validation to flag accounts with wild fluctuations or those omitted after appearing in prior filings. This upgrade is part of a broader government effort to reduce non-compliance on foreign accounts and ensure persistent reporting over the lifespan of foreign assets.',
    date: 'March 20, 2026',
    source: 'FinCEN Treasury Department',
    importance: 'medium',
    category: 'FBAR',
    guidelines: [
      'Maintain an unbroken list of all active, closed, or joint accounts in India.',
      'Report the highest calendar year balance, not the year-end balance.',
      'Reconcile closed accounts to ensure proper final filings are marked.'
    ]
  },
  {
    id: 'up-5',
    title: 'Indian Union Budget 2026: Key Changes for NRI Capital Gains Tax Rates',
    slug: 'indian-union-budget-2026-nri-capital-gains',
    summary: 'Important amendments to Section 112 and Section 115A affecting capital gains tax rates on property and securities for Non-Resident Indians (NRIs).',
    content: 'The Indian Finance Act of 2026 has restructured the capital gains tax brackets for NRIs. Long-Term Capital Gains (LTCG) on unlisted assets (such as physical property) are now taxed at a flat 20% with indexation benefits restored, while Short-Term Capital Gains are aligned with standard progressive brackets. These changes require meticulous calculation when preparing Lower TDS certificates and computing foreign tax credits in the US.',
    date: 'February 10, 2026',
    source: 'Ministry of Finance, Government of India',
    importance: 'high',
    category: 'Expat Compliance',
    guidelines: [
      'Use Indian indexation multipliers to reduce net taxable capital gains on property sales.',
      'Secure formal valuation certificates (from registered Indian valuers) for cost-basis determination.',
      'Track the holding period carefully as unlisted property requires a 24-month duration for LTCG.'
    ]
  },
  {
    id: 'up-6',
    title: 'Form 5471 Penalties Hardened: Automatic $10k Fines for Late Filers',
    slug: 'form-5471-automatic-fines-late-filers',
    summary: 'The IRS has implemented automated systemic billing for failure to file Form 5471 regarding Controlled Foreign Corporations (CFCs) in India.',
    content: 'Taxpayers holding more than 10% shareholding in Indian private limited companies are required to submit Form 5471 with their Form 1040. The IRS has updated its processing systems to automatically assess a flat $10,000 penalty for any Form 5471 filed late, even if no tax is owed. Reasonable cause defenses are facing stricter reviews, and proactive administrative compliance is highly recommended.',
    date: 'January 18, 2026',
    source: 'IRS Small Business / Self-Employed Division',
    importance: 'high',
    category: 'Form 5471',
    guidelines: [
      'Verify shareholding percentages in any Indian family business or private startup.',
      'Ensure the company Balance Sheet and P&L are converted to US GAAP standards for Schedule C/F.',
      'File timely extensions on Form 4868 to secure additional filing time if needed.'
    ]
  },
  {
    id: 'up-7',
    title: 'New Thresholds for Form 8938 (FATCA) Reporting Adjusted for Inflation',
    slug: 'form-8938-fatca-thresholds-inflation-2026',
    summary: 'The IRS has announced inflation adjustments for foreign financial asset reporting thresholds applicable to tax returns filed in 2026.',
    content: 'The statutory limits for filing Form 8938 alongside individual returns have been adjusted for inflation. For taxpayers residing in the US, filing is required if foreign assets exceed $50,000 on the last day of the year or $75,000 at any point (doubled for married joint filers). For expats living abroad, the threshold starts at $200,000 (single) and $400,000 (married joint). Both liquid and non-liquid foreign investments are aggregated.',
    date: 'January 05, 2026',
    source: 'Internal Revenue Service (IRS)',
    importance: 'low',
    category: 'Form 8938',
    guidelines: [
      'Check if your joint holdings meet the high expat thresholds before omitting the form.',
      'Remember that Form 8938 is filed with your tax return, unlike the FBAR which goes to FinCEN.',
      'Consult dual-credentialed professionals to audit complicated holdings.'
    ]
  },
  {
    id: 'up-8',
    title: 'Double Taxation Relief: Standardized Filing Formats Released for DTAA Article 20',
    slug: 'dtaa-article-20-standardized-filing-formats',
    summary: 'New joint advisory releases unified reporting guidelines for students, trainees, and researchers claiming treaty exemptions under Article 20.',
    content: 'The regulatory agencies have finalized standardized reporting formats for individuals claiming exemptions under Article 20 (Student/Trainee benefits) of the India-US Tax Treaty. The new formats eliminate arbitrary rejections and provide clear rules on claiming deductions for fellowship stipends and foreign academic support funds.',
    date: 'December 12, 2025',
    source: 'Bilateral Joint Commission on Tax Cooperation',
    importance: 'low',
    category: 'Tax Deadlines',
    guidelines: [
      'Ensure Form 8833 (Treaty-Based Return Position Disclosure) is appended to your tax return.',
      'Document enrollment letters and fellowship grant certificates.',
      'Keep copies of bank statements showing foreign wire transfers.'
    ]
  }
];

export const mockResources = [
  {
    id: 'res-1',
    title: 'The Comprehensive FBAR Reporting Guide (2026 Edition)',
    type: 'PDF Guide',
    description: 'A step-by-step PDF manual illustrating how to consolidate, value, and report your Indian bank accounts, provident funds, and insurance policies on FinCEN Form 114.',
    fileSize: '2.4 MB',
    downloadLink: '#',
    category: 'Guides'
  },
  {
    id: 'res-2',
    title: 'FATCA Compliance Workbook & Form 8938 Checklist',
    type: 'PDF Guide',
    description: 'An interactive workbook to help dual taxpayers track inflation-adjusted asset thresholds, classify passive assets, and prepare required disclosure spreadsheets.',
    fileSize: '1.8 MB',
    downloadLink: '#',
    category: 'Guides'
  },
  {
    id: 'res-3',
    title: 'NRI Tax Checklist: Real Estate Capital Gains & Lower TDS',
    type: 'PDF Checklist',
    description: 'A comprehensive document checklist required to apply for a Lower TDS Certificate (Form 13/197) in India, including basis indexation calculations and gift tax forms.',
    fileSize: '950 KB',
    downloadLink: '#',
    category: 'Checklists'
  },
  {
    id: 'res-4',
    title: 'Indian Income Tax Indexation Multipliers Table (2001-2026)',
    type: 'Template',
    description: 'A practical Excel template populated with historic Cost Inflation Index (CII) multipliers from India to easily calculate inflation-adjusted acquisition costs of property.',
    fileSize: '1.2 MB',
    downloadLink: '#',
    category: 'Templates'
  },
  {
    id: 'res-5',
    title: 'FBAR Account Balance Reconstruction Spreadsheet',
    type: 'Template',
    description: 'An audit-proof Excel template to catalog multiple Indian accounts, trace exchange rates, and calculate the highest annual balance in USD as mandated by FinCEN.',
    fileSize: '1.1 MB',
    downloadLink: '#',
    category: 'Templates'
  }
];

export const mockTaxDeadlines = [
  {
    id: 'dl-1',
    event: 'Q4 Individual Estimated Payments (Form 1040-ES)',
    date: 'January 15',
    category: 'US Tax',
    description: 'Final payment deadline for individual taxpayers with income not subject to standard US salary withholding (e.g., foreign dividends, capital gains, consulting retainers).'
  },
  {
    id: 'dl-2',
    event: 'Filing of Form 1099-NEC & 1099-MISC',
    date: 'January 31',
    category: 'US Tax',
    description: 'Businesses must file forms to report non-employee compensations and payments to local and state contractors.'
  },
  {
    id: 'dl-3',
    event: 'US Federal Individual Tax Return (Form 1040 / 1040-NR)',
    date: 'April 15',
    category: 'US Tax',
    description: 'Statutory deadline to submit returns or secure formal six-month extension via Form 4868.'
  },
  {
    id: 'dl-4',
    event: 'Q1 Estimated Tax Payment Deadline',
    date: 'April 15',
    category: 'US Tax',
    description: 'Initial estimated installment due for the current tax year.'
  },
  {
    id: 'dl-5',
    event: 'Statutory FBAR Deadline (Automatic Extension)',
    date: 'April 15',
    category: 'FBAR',
    description: 'Official filing limit for FinCEN Form 114 (Automatically extends to Oct 15 without filing form).'
  },
  {
    id: 'dl-6',
    event: 'US Expatriate Filing Deadline (Automatic Extension)',
    date: 'June 15',
    category: 'Expat Compliance',
    description: 'Automatic two-month filing extension given to US citizens and permanent residents residing and working overseas.'
  }
];

export const mockTeam = [
  {
    id: 'team-1',
    name: 'P. Suuresh, FCA',
    role: 'Senior Founding Partner',
    bio: 'P. Suuresh is a highly senior Fellow Chartered Accountant (FCA) with over 25 years of extensive practice in Indian corporate taxation, cross-border investment structuring, and regulatory FEMA guidelines. He specializes in assisting high-net-worth NRIs in optimizing real estate disinvestments and navigating Lower TDS pathways.',
    profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    expertise: ['Cross-Border Investment Structuring', 'Lower TDS Property Advisory', 'FEMA Regulatory Procedures', 'Inward Repatriation Law'],
    credentials: ['Fellow Chartered Accountant (FCA) - ICAI', 'B.Com (Hons) - Madras University', 'Registered Tax Valuer']
  },
  {
    id: 'team-2',
    name: 'Anjali Suresh, CPA',
    role: 'Managing Partner (US Tax Operations)',
    bio: 'Anjali is a licensed US Certified Public Accountant (CPA) with specialisation in international expat tax optimization, FATCA Form 8938 disclosures, and IRS Streamlined Filing amnesty procedures. With a career spanning major international consultancies, she bridges the gap between US IRS guidelines and Indian savings assets.',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    expertise: ['US Expat Tax Preparation', 'FATCA & FBAR Voluntary Disclosures', 'IRS Streamlined Amnesty Cases', 'Double-Taxation treaty mapping'],
    credentials: ['Certified Public Accountant (CPA) - State of Colorado', 'IRS Enrolled Agent (EA)', 'M.S. in International Taxation']
  },
  {
    id: 'team-3',
    name: 'Vikram Seth, CA, LL.B.',
    role: 'Tax Controversy & Legal Counsel',
    bio: 'Vikram brings dual qualifications in accountancy and law to handle tax controversy, transfer pricing benchmarking studies, and representation before the Commissioner of Income Tax (Appeals) in India. He acts as primary legal counsel for corporate subsidiaries and transfer pricing filings.',
    profileImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    expertise: ['Tax Controversy & Appeals', 'Corporate Transfer Pricing studies', 'Subsidiary Legal Structuring', 'Bilateral Contract Reviews'],
    credentials: ['Associate Chartered Accountant (ACA) - ICAI', 'Bachelor of Laws (LL.B.) - National Law School of India', 'Member of Supreme Court Tax Bar Association']
  },
  {
    id: 'team-4',
    name: 'Meera Raghavan, EA',
    role: 'Senior Expat Consultant',
    bio: 'Meera is an Enrolled Agent (EA) admitted to practice before the IRS. She has over 12 years of experience focusing on international wealth planning, PFIC passive mutual fund filings, and FBAR asset disclosure statements for expatriates in Bangalore and Hyderabad.',
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    expertise: ['PFIC Reporting & Cost-Basis Reconstructions', 'FBAR Compliance Reconciliations', 'Expatriate Exit Planning', 'FBAR Audit Defense'],
    credentials: ['IRS Enrolled Agent (EA)', 'B.Sc. in Finance - Boston University', 'Certified Financial Planner (CFP)']
  },
  {
    id: 'team-5',
    name: 'Rohan Deshmukh, ACA',
    role: 'International Tax Consultant',
    bio: 'Rohan is a young and dynamic Chartered Accountant specializing in treaty-based taxation positions under Article 20 and Article 12 of the India-US DTAA. He manages filing submissions for NRI property capital gains tax assessments.',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    expertise: ['Bilateral Treaty Deductions', 'NRI Withholding Tax (TDS) Assessments', 'DTAA Form 15CA/15CB Certificates', 'Technology Expat Compliance'],
    credentials: ['Associate Chartered Accountant (ACA) - ICAI', 'Diploma in International Tax - ICAI', 'B.Com - University of Mumbai']
  },
  {
    id: 'team-6',
    name: 'Sandeep Mehta, CPA, MST',
    role: 'Partner (Corporate Cross-Border Services)',
    bio: 'Sandeep holds a Master of Science in Taxation (MST) and handles corporate international tax matters, cross-border mergers, and pre-departure tax planning for tech executives relocating between Silicon Valley and Indian IT hubs.',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    expertise: ['Pre-Departure Planning', 'Corporate Subsidiary Taxing', 'Venture Investment Structuring', 'Cross-border M&A Tax'],
    credentials: ['Certified Public Accountant (CPA) - California', 'Master of Science in Taxation (MST)', 'Member of AICPA']
  },
  {
    id: 'team-7',
    name: 'Priyah Sharma, CA',
    role: 'Senior FEMA Advisory Consultant',
    bio: 'Priyah specializes in estate planning and regulatory compliance under FEMA. She regularly guides NRI families on ancestral inheritance transitions, real estate capital accounts, and repatriation procedures.',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    expertise: ['FEMA Capital Accounts', 'Estate Planning & Trusts', 'Inheritance Asset Transitions', 'Inward Repatriation Protocols'],
    credentials: ['Associate Chartered Accountant (ACA) - ICAI', 'B.Com - Delhi University', 'Certified Wealth Manager (CWM)']
  },
  {
    id: 'team-8',
    name: 'David Vance, Esq.',
    role: 'US Tax Attorney & Counsel',
    bio: 'David serves as legal counsel on complex IRS audit defense matters and bilateral treaty interpretation. He drafts voluntary disclosure resolutions and handles legal representations for offshore trust disclosures.',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    expertise: ['IRS Tax Controversy', 'Offshore Trust Structuring', 'Bilateral Treaty Disputes', 'Amnesty Representation'],
    credentials: ['Juris Doctor (JD) - Georgetown Law', 'Member of Colorado Bar Association', 'M.B.A. - Boston College']
  }
];

export const mockTestimonials = [
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
  },
  {
    id: 'rev-4',
    name: 'Ananth Padmanabhan',
    role: 'Expatriate Tech Consultant',
    company: 'Fintech Solutions LLC',
    quote: 'Navigating PFIC tax on my Indian mutual funds was an absolute nightmare until Rohan and Meera structured a comprehensive Mark-to-Market election strategy. Their guidance saved me thousands in retroactive interest and IRS compliance audits.',
    location: 'Jersey City, NJ',
    rating: 5
  },
  {
    id: 'rev-5',
    name: 'Dr. Sunita Rao',
    role: 'Professor of Economics',
    company: 'Midwest State University',
    quote: 'When my father passed away in Bangalore leaving substantial estate and liquid assets, we were terrified of the IRS Form 3520 reporting laws. P. Suuresh & Associates handled the legal heir transfers, FEMA repatriation accounts, and IRS filings flawlessly.',
    location: 'Chicago, IL',
    rating: 5
  }
];

export const mockFaqs = [
  {
    id: 'faq-1',
    question: 'Who qualifies as a "US Person" for FBAR and FATCA reporting?',
    answer: 'The IRS defines a "US Person" to include US citizens (even those residing in India), Green Card holders (Permanent Residents), and foreign nationals who meet the Substantial Presence Test (generally residing in the US for at least 183 days over a 3-year weighted period). All such individuals are legally required to disclose global financial assets.',
    category: 'FBAR'
  },
  {
    id: 'faq-2',
    question: 'How does the India-US DTAA (Double Tax Treaty) prevent double taxation?',
    answer: 'The Double Taxation Avoidance Agreement (DTAA) provides mechanism rules to claim Foreign Tax Credits (FTC) on IRS Form 1116. If you pay tax on Indian rental income or capital gains in India, you can use those tax receipts to offset and claim credits against your US federal tax liability on the same income.',
    category: 'India-US Treaties'
  },
  {
    id: 'faq-3',
    question: 'What is the penalty for failing to file an FBAR (FinCEN Form 114)?',
    answer: 'Penalties for non-compliance are severe. For non-willful violations (errors due to ignorance), the fine is $10,000 per violation, adjusted annually for inflation (now over $15,000). For willful failure to disclose, the penalty can be the greater of $100,000 or 50% of the maximum balance in the foreign account for each year of non-filing.',
    category: 'FBAR'
  },
  {
    id: 'faq-4',
    question: 'What is the IRS Streamlined Filing Compliance Procedure?',
    answer: 'The Streamlined Procedure is an amnesty program for non-willful taxpayers to come into full compliance. Taxpayers file 3 years of back taxes, 6 years of FBARs, and pay a reduced or zero penalty (0% penalty for expats living abroad; 5% penalty for US residents), in exchange for an agreement to waive standard late-filing fees.',
    category: 'NRI Compliance'
  },
  {
    id: 'faq-5',
    question: 'Why are Indian Mutual Funds classified as PFICs by the IRS?',
    answer: 'The IRS classifies all foreign-registered mutual funds, ETFs, and unit-linked insurance plans as Passive Foreign Investment Companies (PFICs) under Code Section 1297. Unlike US funds, PFIC dividends and capital gains are taxed at ordinary income tax brackets up to 37% and incur retroactively computed interest charges on deferred profits.',
    category: 'FATCA'
  },
  {
    id: 'faq-6',
    question: 'Can an NRI sell property in India and repatriate funds to the US?',
    answer: 'Yes. Under FEMA guidelines, NRIs are permitted to repatriate up to USD 1 Million per financial year from their NRO accounts. Repatriation requires submitting Forms 15CA and 15CB, which must be certified by a Chartered Accountant to verify that all capital gains taxes in India have been fully settled.',
    category: 'NRI Compliance'
  },
  {
    id: 'faq-7',
    question: 'What is a Lower TDS Certificate (Form 197) and how does it help NRIs?',
    answer: 'When an NRI sells property, the buyer is required to withhold Tax Deducted at Source (TDS) at 22.8% on the GROSS sale price. To prevent this cash-flow trap, the NRI can file Form 13 with the Income Tax Department to request a Lower TDS Certificate (under Section 197) based on actual capital gains, reducing the TDS to 1% to 3%.',
    category: 'NRI Compliance'
  },
  {
    id: 'faq-8',
    question: 'How are Indian Public Provident Funds (PPF) taxed in the United States?',
    answer: 'While PPF interest is tax-free in India, it does not qualify for tax deferral under the India-US treaty. As a result, US persons must compute accrued interest annually and report it as taxable interest on Schedule B of their US Form 1040, even if the funds are locked and unwithdrawn.',
    category: 'US Tax'
  },
  {
    id: 'faq-9',
    question: 'What is the reporting threshold for receiving inherited cash or property from India?',
    answer: 'If you receive an inheritance, legacy bequest, or gift from a non-resident alien (non-US person) that exceeds $100,000 in aggregate in a single tax year, you must disclose it on IRS Form 3520. While there is no tax liability on the gift itself, late filing of Form 3520 carries an automatic penalty of 25% of the total amount.',
    category: 'US Tax'
  },
  {
    id: 'faq-10',
    question: 'Is interest earned in NRE and NRO savings accounts taxable in the US?',
    answer: 'Yes. NRE interest is tax-exempt in India for non-residents, but is fully taxable in the US for US citizens or green card holders. NRO interest is taxed in India at 31.2% TDS, and is also taxable in the US, but you can claim a Foreign Tax Credit (Form 1116) on your US return for the Indian TDS paid.',
    category: 'India-US Treaties'
  },
  {
    id: 'faq-11',
    question: 'What is the difference between FBAR (FinCEN 114) and FATCA (Form 8938)?',
    answer: 'FBAR is a Treasury report filed electronically for accounts exceeding $10,000 in aggregate at any point in the year. FATCA Form 8938 is filed with the IRS for accounts/assets exceeding $50,000 (US residents) or $200,000 (expats abroad). Form 8938 includes non-custodial assets like partnerships or private stock, which FBAR does not.',
    category: 'FATCA'
  },
  {
    id: 'faq-12',
    question: 'Do I have to pay tax in the US on my Indian Employee Provident Fund (EPF)?',
    answer: 'Under Article 22 of the India-US DTAA, taxes on employer contributions and interest inside a qualified employer pension plan like EPF are deferred until withdrawal. Unlike PPF, EPF interest is not taxable annually in the US during the accumulation phase, provided you remain a qualified employee.',
    category: 'US Tax'
  },
  {
    id: 'faq-13',
    question: 'What is Form 5471, and who is required to file it?',
    answer: 'Form 5471 is required for US persons who are officers, directors, or shareholders holding 10% or more of the stock in a Controlled Foreign Corporation (CFC), such as an Indian Private Limited company. Failing to file this form on time incurs an automatic, non-willful penalty of $10,000 per year.',
    category: 'US Tax'
  },
  {
    id: 'faq-14',
    question: 'How are capital gains on Indian stocks or mutual funds taxed in the US?',
    answer: 'If the mutual funds are not classified as PFICs (or have a valid QEF/MTM election), capital gains are taxed at standard US long-term rates (0%, 15%, or 20%) or short-term ordinary rates. In addition, you must convert the purchase and sale price to USD using exchange rates from the exact dates of the transactions.',
    category: 'US Tax'
  },
  {
    id: 'faq-15',
    question: 'How do I document and prove the cost basis of property sold in India?',
    answer: 'You must maintain the original purchase deed, registration fee receipts, cost of improvements, and indexation multipliers. For US tax returns, all historic costs must be converted to USD using the exchange rate on the original date of purchase/expense, and the sale converted using the sale date exchange rate.',
    category: 'NRI Compliance'
  }
];

export const mockDashboardActivities = [
  { id: 'act-1', message: 'FBAR Expat Compliance deadline reminder posted in Tax Updates section', time: '10 minutes ago', type: 'update' },
  { id: 'act-2', message: 'Lower TDS property advisory guide template updated with 2026 inflation indexes', time: '2 hours ago', type: 'resource' },
  { id: 'act-3', message: 'New team member bio published for Senior Founding Partner P. Suuresh', time: 'Yesterday', type: 'team' },
  { id: 'act-4', message: 'IRS Campaign campaign announcement added on the Regulatory Updates Board', time: 'Yesterday', type: 'update' },
  { id: 'act-5', message: 'PFIC Indian mutual funds guide edited by administrator Anjali', time: '3 days ago', type: 'article' }
];

export const mockDashboardNotifications = [
  { id: 'not-1', text: 'Alert: US Individual Tax Return Extension (Form 4868) deadline is approaching.', severity: 'high', date: 'June 25, 2026' },
  { id: 'not-2', text: 'Weekly Sync: Automated FATCA database backup successfully completed.', severity: 'low', date: 'June 23, 2026' },
  { id: 'not-3', text: 'IRS Policy Advisory: Compliance parameters for non-willfulness certifications have been tightened.', severity: 'medium', date: 'June 20, 2026' }
];
