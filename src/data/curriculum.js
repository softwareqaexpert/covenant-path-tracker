// Covenant path curriculum content.
// Sources: Preach My Gospel (2023, Chapter 3) and My Covenant Path;
// temple recommend questions per General Handbook section 26.

export const prereqs = [
  { id: 'pre-missionaries', label: 'Meet with the missionaries and learn the gospel' },
  { id: 'pre-faith', label: 'Develop faith in Jesus Christ' },
  { id: 'pre-repent', label: 'Repent of past sins' },
  { id: 'pre-sacrament', label: 'Attend sacrament meeting' },
  { id: 'pre-wow', label: 'Begin living the Word of Wisdom' },
  { id: 'pre-chastity', label: 'Begin living the law of chastity' },
  { id: 'pre-tithing', label: 'Prepare to live the law of tithing' },
  { id: 'pre-interview', label: 'Complete the baptismal interview' },
]

export const lessons = [
  {
    id: 'l1', num: 1, title: 'The Message of the Restoration',
    scripture: 'Joseph Smith—History 1; Book of Mormon Introduction',
    url: 'https://www.churchofjesuschrist.org/study/manual/preach-my-gospel-2023/04-chapter-3/08-chapter-3-lesson-1?lang=eng',
    principles: [
      { id: 'l1-p1', label: 'God Is Our Loving Heavenly Father' },
      { id: 'l1-p2', label: 'God Reveals the Gospel through Prophets' },
      { id: 'l1-p3', label: "Jesus Christ's Earthly Ministry and Atonement" },
      { id: 'l1-p4', label: 'The Falling Away' },
      { id: 'l1-p5', label: 'The Restoration through Joseph Smith' },
      { id: 'l1-p6', label: 'The Book of Mormon' },
      { id: 'l1-p7', label: 'Pray to Know the Truth' },
    ],
  },
  {
    id: 'l2', num: 2, title: "Heavenly Father's Plan of Salvation",
    scripture: 'Alma 40–42; Moses 1',
    url: 'https://www.churchofjesuschrist.org/study/manual/preach-my-gospel-2023/04-chapter-3/09-chapter-3-lesson-2?lang=eng',
    principles: [
      { id: 'l2-p1', label: 'Premortal Life' },
      { id: 'l2-p2', label: 'The Creation' },
      { id: 'l2-p3', label: 'The Fall of Adam and Eve' },
      { id: 'l2-p4', label: 'Our Life on Earth' },
      { id: 'l2-p5', label: 'The Atonement of Jesus Christ' },
      { id: 'l2-p6', label: 'The Spirit World' },
      { id: 'l2-p7', label: 'Resurrection, Salvation, and Exaltation' },
      { id: 'l2-p8', label: 'Judgment and Kingdoms of Glory' },
    ],
  },
  {
    id: 'l3', num: 3, title: 'The Gospel of Jesus Christ',
    scripture: '2 Nephi 31; 3 Nephi 11',
    url: 'https://www.churchofjesuschrist.org/study/manual/preach-my-gospel-2023/04-chapter-3/10-chapter-3-lesson-3?lang=eng',
    principles: [
      { id: 'l3-p1', label: 'The Divine Mission of Jesus Christ' },
      { id: 'l3-p2', label: 'Faith in Jesus Christ' },
      { id: 'l3-p3', label: 'Repentance' },
      { id: 'l3-p4', label: 'Baptism: Our First Covenant with God' },
      { id: 'l3-p5', label: 'The Gift of the Holy Ghost' },
      { id: 'l3-p6', label: 'Endure to the End' },
      { id: 'l3-p7', label: "The Gospel Blesses All God's Children" },
    ],
  },
  {
    id: 'l4', num: 4, title: 'Becoming Lifelong Disciples of Jesus Christ',
    scripture: 'Organized around the four baptismal covenants',
    url: 'https://www.churchofjesuschrist.org/study/manual/preach-my-gospel-2023/04-chapter-3/11-chapter-3-lesson-4?lang=eng',
    principles: [
      { id: 'l4-p1', group: 'Take upon Us the Name of Christ', label: 'Pray Often' },
      { id: 'l4-p2', group: 'Take upon Us the Name of Christ', label: 'Study the Scriptures' },
      { id: 'l4-p3', group: 'Keep the Commandments of God', label: 'The Two Great Commandments' },
      { id: 'l4-p4', group: 'Keep the Commandments of God', label: 'Follow the Prophet' },
      { id: 'l4-p5', group: 'Keep the Commandments of God', label: 'Keep the Ten Commandments' },
      { id: 'l4-p6', group: 'Keep the Commandments of God', label: 'Live the Law of Chastity' },
      { id: 'l4-p7', group: 'Keep the Commandments of God', label: 'Keep the Law of Tithing' },
      { id: 'l4-p8', group: 'Keep the Commandments of God', label: 'Obey the Word of Wisdom' },
      { id: 'l4-p9', group: 'Keep the Commandments of God', label: 'Keep the Sabbath Day Holy' },
      { id: 'l4-p10', group: 'Keep the Commandments of God', label: 'Obey and Honor the Law' },
      { id: 'l4-p11', group: 'Serve God and Others', label: 'Service' },
      { id: 'l4-p12', group: 'Serve God and Others', label: 'Sharing the Gospel' },
      { id: 'l4-p13', group: 'Serve God and Others', label: 'Fasting and Fast Offerings' },
      { id: 'l4-p14', group: 'Endure to the End', label: 'Priesthood and Church Organizations' },
      { id: 'l4-p15', group: 'Endure to the End', label: 'Marriage and Families' },
      { id: 'l4-p16', group: 'Endure to the End', label: 'Temple and Family History Work' },
      { id: 'l4-p17', group: 'Endure to the End', label: 'Temples, Endowment, Eternal Families' },
    ],
  },
]

// Path stages shown on the covenant path timeline, in order.
// 'derived' stages compute progress from other data; others toggle directly.
export const pathStages = [
  { id: 'baptism', label: 'Baptism', kind: 'profileDate', dateKey: 'baptismDate' },
  { id: 'confirmation', label: 'Confirmation & Gift of the Holy Ghost', kind: 'profileDate', dateKey: 'confirmationDate' },
  { id: 'lessons', label: 'The four lessons', kind: 'lessons', link: '/lessons' },
  { id: 'family-name', label: 'Find a family name', kind: 'toggle', link: '/family' },
  { id: 'limited-recommend', label: 'Limited-use temple recommend', kind: 'toggle', link: '/temple' },
  { id: 'baptisms-dead', label: 'Baptisms for the dead', kind: 'toggle', link: '/temple' },
  { id: 'aaronic', label: 'Aaronic Priesthood (brethren)', kind: 'toggle' },
  { id: 'melchizedek', label: 'Melchizedek Priesthood (brethren)', kind: 'toggle' },
  { id: 'recommend-interview', label: 'Temple recommend interview', kind: 'toggle', link: '/recommend' },
  { id: 'endowment', label: 'Receive your endowment', kind: 'toggle', link: '/temple' },
  { id: 'sealing', label: 'Be sealed to your family', kind: 'toggle' },
]

export const actions = [
  { id: 'act-friends', label: 'Make friends with members of your ward' },
  { id: 'act-study', label: 'Improve gospel study' },
  { id: 'act-sabbath', label: 'Keep the Sabbath day holy' },
  { id: 'act-home-evening', label: 'Participate in a home evening' },
  { id: 'act-prophet', label: 'Follow the prophet' },
  { id: 'act-commandments', label: 'Obey the commandments' },
  { id: 'act-serve', label: 'Serve others' },
  { id: 'act-share', label: 'Share the gospel' },
  { id: 'act-discouragement', label: 'Overcome discouragement and setbacks' },
  { id: 'act-patriarchal', label: 'Receive a patriarchal blessing' },
  { id: 'act-self-reliant', label: 'Be self-reliant (Self-Reliance class)' },
]

export const learnAbout = [
  { id: 'learn-aaronic', label: 'Learn about the Aaronic Priesthood / Young Men' },
  { id: 'learn-yw', label: 'Learn about the Young Women Program' },
  { id: 'learn-rs', label: 'Learn about the Relief Society' },
  { id: 'learn-primary', label: 'Learn about Primary — Serving Children' },
  { id: 'learn-melchizedek', label: 'Learn about the Melchizedek Priesthood' },
]

export const recommendQuestions = [
  { id: 'rq1', label: 'Faith in and testimony of God the Father, Jesus Christ, and the Holy Ghost' },
  { id: 'rq2', label: 'Testimony of the Atonement of Jesus Christ and His role as Savior' },
  { id: 'rq3', label: 'Testimony of the Restoration of the gospel' },
  { id: 'rq4', label: 'Sustain the President of the Church as prophet, seer, and revelator' },
  { id: 'rq5', label: 'Sustain the First Presidency and Quorum of the Twelve Apostles' },
  { id: 'rq6', label: 'Sustain the other general and local leaders of the Church' },
  { id: 'rq7', label: 'Strive to live the law of chastity' },
  { id: 'rq8', label: 'No support of teachings contrary to the Church' },
  { id: 'rq9', label: 'Strive to be honest in all that you do' },
  { id: 'rq10', label: 'Obey the Word of Wisdom' },
  { id: 'rq11', label: 'A full-tithe payer' },
  { id: 'rq12', label: 'Keep the Sabbath day holy; attend meetings; partake of the sacrament' },
  { id: 'rq13', label: 'Honest with family responsibilities' },
  { id: 'rq14', label: 'No sins needing resolution with priesthood leaders' },
  { id: 'rq15', label: 'Consider yourself worthy to enter the temple' },
]

// Daily habits — toggled each day.
export const checkinItems = [
  { id: 'ci-prayer', label: 'Morning prayer' },
  { id: 'ci-scripture', label: 'Scripture study' },
  { id: 'ci-serve', label: 'Serve / minister to someone' },
]
// Weekly — done once per week.
export const weeklyItems = [
  { id: 'ci-sacrament', label: 'Attend sacrament meeting & partake' },
]
// Monthly — done once per month.
export const monthlyItems = [
  { id: 'ci-fast', label: 'Fast & give a fast offering' },
]

export const familySteps = [
  { id: 'fam-1', label: 'Create a free FamilySearch account' },
  { id: 'fam-2', label: 'Add your parents and grandparents' },
  { id: 'fam-3', label: 'Look for an ancestor with a temple icon' },
  { id: 'fam-4', label: 'Print or save the name card' },
  { id: 'fam-5', label: 'Bring it to the temple with your recommend' },
]

export const templePrep = {
  baptisms: {
    title: 'Baptisms for the dead',
    when: 'Now · year 1',
    need: 'You need a limited-use recommend',
    steps: [
      { id: 'tb-1', label: 'Interview with your bishop' },
      { id: 'tb-2', label: 'Bring a family name (optional)' },
      { id: 'tb-3', label: 'Bring a change of clothing' },
    ],
    note: 'The temple provides the white clothing you change into. You will be baptized and confirmed for an ancestor.',
  },
  endowment: {
    title: 'Your endowment',
    when: 'Later · year 2',
    need: 'You need a full temple recommend',
    steps: [
      { id: 'te-1', label: 'Interview with bishop, then stake president' },
      { id: 'te-2', label: 'Take a temple preparation class' },
    ],
    note: 'You will receive the initiatory ordinances, be authorized to wear the temple garment, and make sacred covenants.',
  },
}

export const defaultContacts = [
  { id: 'c1', name: '', role: 'Ministering brother / sister', phone: '', email: '' },
  { id: 'c2', name: '', role: 'Second minister', phone: '', email: '' },
  { id: 'c3', name: '', role: 'A friend in the ward', phone: '', email: '' },
  { id: 'c4', name: '', role: 'Full-time missionaries', phone: '', email: '' },
  { id: 'c5', name: '', role: 'Bishop / Branch President', phone: '', email: '' },
]

export const covenantPathIntro =
  'The covenant path is the series of sacred covenants — beginning at baptism and ' +
  'continuing in the temple — that lead us back to God. This app helps you track each ' +
  'step, stay close to people who support you, and prepare to enter the House of the Lord.'

// All are canonical /study/ URLs, so they open in the Gospel Library app when installed.
export const introLinks = [
  { id: 'lnk-christofferson', label: 'Why the Covenant Path (Elder Christofferson)',
    url: 'https://www.churchofjesuschrist.org/study/general-conference/2021/04/54christofferson?lang=eng' },
  { id: 'lnk-nelson', label: 'The Everlasting Covenant (President Nelson)',
    url: 'https://www.churchofjesuschrist.org/study/liahona/2022/10/04-the-everlasting-covenant?lang=eng' },
  { id: 'lnk-topic', label: 'Covenants and Ordinances (Gospel Topics)',
    url: 'https://www.churchofjesuschrist.org/study/manual/gospel-topics/covenant-study-guide?lang=eng' },
  { id: 'lnk-mcp', label: 'My Covenant Path (new-member guide)',
    url: 'https://www.churchofjesuschrist.org/study/manual/my-covenant-path/my-covenant-path?lang=eng' },
]
