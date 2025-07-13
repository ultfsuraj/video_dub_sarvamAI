export type ScriptType = {
  id: number;
  text: string;
};

export type ClipType = {
  width: number;
  x: number;
};

export const DUB_CLIPS: Array<ClipType> = [
  { width: 20, x: 5 },
  { width: 80, x: 30 },
  { width: 60, x: 120 },
  { width: 20, x: 205 },
  { width: 80, x: 230 },
  { width: 60, x: 310 },
  { width: 20, x: 400 },
  { width: 80, x: 430 },
];

export const SCRIPT_CLIPS: Array<ClipType> = [{ width: 10000, x: 0 }];

export const SCRIPTS: Array<ScriptType> = [
  {
    id: 0,
    text: 'After years of hard work and perseverance, he finally launched his own startup in the heart of the city.',
  },
  {
    id: 1,
    text: 'The sky turned orange during sunset.',
  },
  {
    id: 2,

    text: 'The teacher explained the concept multiple times, but many students were still confused about how the formula actually works in practice.',
  },
  {
    id: 4,
    text: 'Although he was tired from work, he still helped his daughter with her homework.',
  },
  {
    id: 5,
    text: 'Even though the rain ruined most of the outdoor plans, everyone still had a great time playing games and sharing stories indoors with hot tea.',
  },
  {
    id: 6,
    text: 'She packed her bags quietly, not wanting to disturb anyone in the early hours of morning.',
  },
  {
    id: 7,
    text: 'She always keeps a journal by her bedside.',
  },
  {
    id: 8,
    text: 'We decided to cancel the trip because of the unexpected weather conditions.',
  },
];

export const DUB_SCRIPTS: Array<ScriptType> = [
  {
    id: 0,
    text: 'वर्षों की मेहनत और लगन के बाद, उसने आखिरकार शहर के बीचों-बीच अपना स्टार्टअप शुरू किया।',
  },
  {
    id: 1,
    text: 'सूर्यास्त के समय आसमान नारंगी हो गया।',
  },
  {
    id: 2,

    text: 'अध्यापक ने यह अवधारणा कई बार समझाई, लेकिन कई छात्र अभी भी नहीं समझ पाए कि सूत्र वास्तव में कैसे काम करता है।',
  },
  {
    id: 4,
    text: 'काम से थकने के बावजूद, उसने अपनी बेटी का होमवर्क करने में मदद की।',
  },
  {
    id: 5,
    text: 'हालांकि बारिश ने अधिकतर बाहरी योजनाएं बिगाड़ दीं, फिर भी सभी ने अंदर खेल खेलकर और गर्म चाय के साथ कहानियां सुनाकर अच्छा समय बिताया।',
  },
  {
    id: 6,
    text: 'उसने चुपचाप अपने बैग पैक किए, ताकि सुबह-सुबह किसी को परेशान न करे।',
  },
  {
    id: 7,
    text: 'वह हमेशा अपने बिस्तर के पास एक डायरी रखती है।',
  },
  {
    id: 8,
    text: 'हमने अप्रत्याशित मौसम की स्थिति के कारण यात्रा रद्द करने का निर्णय लिया।',
  },
];

export const LANGUAGES: string[] = [
  'Hindi',
  'Marathi',
  'Bangali',
  'Telugu',
  'Tamil',
  'Kannada',
  'Marwari',
  'Odia',
  'Punjabi',
  'Gujarati',
  'Malayalam',
  'Assamese',
  'Urdu',
  'English',
  'Bhojpuri',
  'Haryanvi',
  'Rajasthani',
  'Konkani',
  'Sindhi',
  'Dogri',
  'Santali',
  'Kashmiri',
  'Nepali',
  'Manipuri',
  'Bodo',
];
