import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Get In Touch',
    'nav.call_us': 'Call Us',

    // Hero
    'hero.badge': 'Enterprise Digital Solutions',
    'hero.subtitle': 'Turning ideas into scalable, high-performance software.',
    'hero.description': 'We specialize in crafting professional, responsive, and secure custom solutions — including point-of-sale systems, financial systems, educational portals, and web architectures that drive real business value.',
    'hero.explore': 'Explore Projects',
    'hero.contact_agent': 'Contact Agent',
    'hero.available': 'Available for Projects',
    'hero.tagline': 'Partner with us to make your company faster, smarter, and more successful.',

    // Projects Section
    'projects.badge': 'Case Studies',
    'projects.title': 'Our Production Project History',
    'projects.desc': 'A showcase of custom applications, portals, and software infrastructures designed and deployed globally.',
    'projects.search_placeholder': 'Search by project name...',
    'projects.view_details': 'View Details',
    'projects.no_results': 'No Projects Found',
    'projects.no_results_desc': "We couldn't find any projects matching your search term.",
    'projects.req_consult': 'Request Consultation',
    'projects.all': 'All',

    // Contact Section
    'contact.badge': 'Connect',
    'contact.title': "Let's Build Something Together",
    'contact.desc': 'Reach out directly for project inquiries, technical consultations, or custom quotes.',
    'contact.call_rep': 'Call Business Representative',
    'contact.alt_line': 'Alternative Direct Line',
    'contact.send_email': 'Send an Email Inquiry',
    'contact.fb_header': 'Connect on Facebook',
    'contact.fb_desc': 'Follow our official page for updates, project announcements, and direct inquiries.',

    // Footer
    'footer.tagline': 'Excellence in Custom Digital Infrastructure',
    'footer.copyright': 'All rights reserved.',
  },
  km: {
    // Navigation
    'nav.home': 'ទំព័រដើម',
    'nav.portfolio': 'ស្នាដៃការងារ',
    'nav.contact': 'ទំនាក់ទំនង',
    'nav.call_us': 'ហៅទូរស័ព្ទ',

    // Hero — inspired by GROW SMART poster: growth + digital for gov & business
    'hero.badge': 'ដំណោះស្រាយឌីជីថល សម្រាប់រដ្ឋភិបាល និងសហគ្រាស',
    'hero.subtitle': 'រីកចម្រើនឆ្លាតវៃ ជាមួយប្រព័ន្ធឌីជីថលទំនើប',
    'hero.description': 'យើងផ្ដល់ដំណោះស្រាយបច្ចេកវិទ្យាមានគុណភាពខ្ពស់ ដល់ស្ថាប័នរដ្ឋ និងសហគ្រាសឯកជន — រួមមានប្រព័ន្ធគ្រប់គ្រងហិរញ្ញវត្ថុ ប្រព័ន្ធអប់រំ ប្រព័ន្ធលក់ទំនិញ និងហេដ្ឋារចនាសម្ព័ន្ធឌីជីថលផ្សេងៗ ដែលជំរុញការរីកចម្រើនដ៏ស្ថិតស្ថេរ។',
    'hero.explore': 'ស្វែងមើលគម្រោង',
    'hero.contact_agent': 'ទំនាក់ទំនងភ្នាក់ងារ',
    'hero.available': 'ព្រៀមខ្លួនទទួលគម្រោងថ្មី',
    'hero.tagline': 'សហការជាមួយយើងខ្ញុំ ដើម្បីធ្វើឱ្យក្រុមហ៊ុនរបស់អ្នកលឿនជាងមុន ឆ្លាតវៃជាងមុន និងរីកចម្រើនជាងមុន។',

    // Projects Section
    'projects.badge': 'ស្នាដៃការងារ',
    'projects.title': 'គម្រោងឌីជីថលដែលយើងបានបង្កើត',
    'projects.desc': 'ស្នាដៃប្រព័ន្ធ គម្រោងវិបសាយ និងហេដ្ឋារចនាសម្ព័ន្ធកម្មវិធីសម្រាប់ស្ថាប័នរដ្ឋ និងសហគ្រាសឯកជននៅជុំវិញពិភពលោក។',
    'projects.search_placeholder': 'ស្វែងរកតាមឈ្មោះគម្រោង...',
    'projects.view_details': 'មើលលម្អិត',
    'projects.no_results': 'រកមិនឃើញគម្រោងទេ',
    'projects.no_results_desc': 'គ្មានគម្រោងណាត្រូវនឹងការស្វែងរករបស់អ្នកទេ។',
    'projects.req_consult': 'ស្នើសុំការពិគ្រោះយោបល់',
    'projects.all': 'ទាំងអស់',

    // Contact Section
    'contact.badge': 'ទំនាក់ទំនង',
    'contact.title': 'ចាប់ផ្ដើមគម្រោងឌីជីថលជាមួយយើង',
    'contact.desc': 'ទំនាក់ទំនងដោយផ្ទាល់ ដើម្បីស្នើសុំការផ្ដល់ប្រឹក្សា ការគិតថ្លៃ ឬពិភាក្សាអំពីគម្រោងឌីជីថលរបស់អ្នក។',
    'contact.call_rep': 'ទូរស័ព្ទទៅតំណាងផ្លូវការ',
    'contact.alt_line': 'លេខទូរស័ព្ទបម្រុង',
    'contact.send_email': 'ផ្ញើអ៊ីមែលសាកសួរ',
    'contact.fb_header': 'តាមដានយើងនៅ Facebook',
    'contact.fb_desc': 'ចូលទំព័រផ្លូវការ ដើម្បីទទួលព័ត៌មានថ្មីៗ ស្នាដៃការងារ និងការប្រកាសគម្រោងថ្មីៗ។',

    // Footer
    'footer.tagline': 'ភាពរស្ដើងនៃហេដ្ឋារចនាសម្ព័ន្ធឌីជីថលតាមតម្រូវការ',
    'footer.copyright': 'រក្សាសិទ្ធិគ្រប់យ៉ាង។',
  }
};

const projectTranslations = {
  // Categories
  'Management': 'គ្រប់គ្រង',
  'Finance': 'ហិរញ្ញវត្ថុ',
  'Web3': 'Web3',
  'EdTech': 'បច្ចេកវិទ្យាអប់រំ',
  'E-Commerce': 'ពាណិជ្ជកម្មអេឡិចត្រូនិច',
  'Utility': 'ឧបករណ៍ប្រើប្រាស់',
  'Corporate': 'សាជីវកម្ម',
  'Real Estate': 'អចលនទ្រព្យ',
  'Media': 'ប្រព័ន្ធផ្សព្វផ្សាយ',

  // Project Titles and Descriptions
  '1.title': 'ប្រព័ន្ធលក់ទំនិញ (POS)',
  '1.desc': 'កម្មវិធីលក់ទំនិញរួមបញ្ចូលគ្នាពេញលេញ ដែលមានលក្ខណៈពិសេសតាមដានសារពើភ័ណ្ឌភ្លាមៗ ប្លង់បោះពុម្ពវិក្កយបត្រ រក្សាទុកទិន្នន័យក្រៅប្រព័ន្ធ និងការធ្វើសមកាលកម្មវេនស្វ័យប្រវត្ត។',
  
  '2.title': 'ប្រព័ន្ធគ្រប់គ្រងប្រាក់កម្ចី',
  '2.desc': 'ផ្ទាំងគ្រប់គ្រងសៀវភៅបញ្ជីឥណទាន និងមីក្រូហិរញ្ញវត្ថុស្វ័យប្រវត្ត។ គ្រប់គ្រងប្រវត្តិរូបអតិថិជន កាលវិភាគបង់រំលស់ ម៉ាស៊ីនគិតលេខការប្រាក់បូកបញ្ចូលគ្នា និងការវិភាគការសងប្រាក់វិញជាក្រាហ្វិក។',
  
  '3.title': 'គេហទំព័រគ្រីបតូ',
  '3.desc': 'ទំព័រដើមគុណភាពខ្ពស់សម្រាប់ប្រព័ន្ធហិរញ្ញវត្ថុវិមជ្ឈការ (DeFi) ដែលបង្ហាញពីក្រាហ្វិកតម្លៃគ្រីបតូ ប្លង់ប្តូរថូខឹន និងផ្ទៃបង្ហាញងងឹត (Dark Mode)។',
  
  '4.title': 'វគ្គសិក្សាអប់រំ',
  '4.desc': 'ប្រព័ន្ធគ្រប់គ្រងការសិក្សា (LMS) ដែលមានសូចនាករវឌ្ឍនភាពមេរៀន វីដេអូ សំណួរមេរៀន និងការទាញយកវិញ្ញាបនបត្រ។',
  
  '5.title': 'គេហទំព័ររថយន្ត',
  '5.desc': 'គេហទំព័រជួល និងលក់រថយន្តកម្រិតខ្ពស់ ដោយប្រើប្រាស់ការផ្លាស់ប្តូររូបភាព GSAP យ៉ាងរលូន និងតម្រងស្វែងរក។',
  
  '6.title': 'ប្រព័ន្ធចេញវិក្កយបត្រ និងតម្លៃ',
  '6.desc': 'ប្រព័ន្ធចេញតម្លៃ និងវិក្កយបត្រសម្រាប់អតិថិជន B2B។ សម្រួលវិក្កយបត្រ គណនាតម្លៃចំណេញ នាំចេញជា PDF និងការផ្ញើអ៊ីមែល។',
  
  '7.title': 'ប្រព័ន្ធរដ្ឋបាលសាលារៀន',
  '7.desc': 'ប្រព័ន្ធគ្រប់គ្រងការិយាល័យក្រោយសាលារៀន គ្រប់គ្រងការចាត់ចែងថ្នាក់រៀន បញ្ជីឈ្មោះសិស្ស រចនាសម្ព័ន្ធពិន្ទុ និងការបង់ថ្លៃសិក្សា។',
  
  '8.title': 'គេហទំព័រការសិក្សាសាលារៀន',
  '8.desc': 'វិបសាយសាធារណៈសម្រាប់ការចុះឈ្មោះចូលរៀន ការផ្សព្វផ្សាយព័ត៌មាន វិចិត្រសាលសិស្ស និងគ្រោងវគ្គសិក្សា។',
  
  '9.title': 'គេហទំព័រស្វែងរកអចលនទ្រព្យ',
  '9.desc': 'ប្រព័ន្ធស្វែងរកអចលនទ្រព្យដែលបង្ហាញទីតាំងនៅលើផែនទីអន្តរកម្ម ក្រាហ្វិកតម្លៃ និងប្រព័ន្ធទំនាក់ទំនងរវាងម្ចាស់ផ្ទះ និងអ្នកជួល។',
  
  '10.title': 'គេហទំព័រលក់អចលនទ្រព្យ',
  '10.desc': 'ប្រព័ន្ធសម្រាប់ភ្នាក់ងារលក់អចលនទ្រព្យ។ រួមបញ្ចូលទាំងការមើលប្លង់បន្ទប់ 3D ការកំណត់កាលវិភាគជួបអតិថិជន និងការតាមដានកិច្ចសន្យា។',
  
  '11.title': 'ប្រវត្តិក្រុមហ៊ុន (អន្តរកម្ម)',
  '11.desc': 'ទំព័រប្រវត្តិក្រុមហ៊ុនដ៏គួរឱ្យទាក់ទាញ ដែលបង្ហាញពីដំណាក់កាលអភិវឌ្ឍន៍ក្រុមហ៊ុន ករណីសិក្សា និងមតិរិះគន់របស់អតិថិជន។',
  
  '12.title': 'ប្រវត្តិក្រុមហ៊ុន (សាជីវកម្ម)',
  '12.desc': 'ទំព័រដើមបែបសាមញ្ញសម្រាប់ក្រុមហ៊ុនបច្ចេកវិទ្យាបង្កើតថ្មី។ ផ្តោតលើដំណើរការលឿន ភាពងាយស្រួលក្នុងការអាន និងអក្សរស្អាតៗ។',
  
  '13.title': 'ប្រព័ន្ធព័ត៌មានវិបសាយ',
  '13.desc': 'ប្រព័ន្ធសារព័ត៌មានដែលមានអ្នកទស្សនាច្រើន បង្ហាញប្លុកមាតិកាឌីណាមិក ការស្វែងរកលឿន និងផ្ទាំងគ្រប់គ្រងសម្រាប់អ្នកកែសម្រួល។',
  
  '14.title': 'គេហទំព័រព័ត៌មាន',
  '14.desc': 'ទំព័រព័ត៌មានសាមញ្ញ បង្ហាញអត្ថបទព័ត៌មានភ្លាមៗ ផ្ទាំងប្រភេទព័ត៌មាន និងប្លង់អានដ៏ស្អាត។'
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const tCategory = (cat) => {
    if (language === 'km' && projectTranslations[cat]) {
      return projectTranslations[cat];
    }
    return cat;
  };

  const tProjectTitle = (id, defaultTitle) => {
    if (language === 'km' && projectTranslations[`${id}.title`]) {
      return projectTranslations[`${id}.title`];
    }
    return defaultTitle;
  };

  const tProjectDesc = (id, defaultDesc) => {
    if (language === 'km' && projectTranslations[`${id}.desc`]) {
      return projectTranslations[`${id}.desc`];
    }
    return defaultDesc;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tCategory, tProjectTitle, tProjectDesc }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
