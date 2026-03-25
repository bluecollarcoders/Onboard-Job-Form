# Recruiter Dashboard Wireframes

## 1. Dashboard Overview Page
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Recruiter Dashboard                    [Profile] [⚙️] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Quick Stats Row:                                            │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────┐ │
│ │ Active Jobs │ │New Apps     │ │In Pipeline  │ │Hired    │ │
│ │     12      │ │     24      │ │     18      │ │    3    │ │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────┘ │
│                                                             │
│ Recent Activity Feed:                          My Jobs:     │
│ ┌─────────────────────────────┐               ┌─────────────┐│
│ │ 🟢 New application for      │               │[+ New Job] │││
│ │    Senior React Developer   │               │             │││
│ │    2 min ago               │               │📋 Senior    │││
│ │                           │               │   React Dev │││
│ │ 🟡 Status changed: John    │               │   (8 apps)  │││
│ │    moved to Interview      │               │             │││
│ │    5 min ago               │               │📋 Backend   │││
│ │                           │               │   Engineer  │││
│ │ 🔴 Application rejected    │               │   (12 apps) │││
│ │    for UI/UX Designer      │               │             │││
│ │    1 hour ago              │               │📋 DevOps    │││
│ └─────────────────────────────┘               │   Lead      │││
│                                               │   (3 apps)  │││
│                                               └─────────────┘│
└─────────────────────────────────────────────────────────────┘
```

## 2. Job Management Table View
```
┌─────────────────────────────────────────────────────────────┐
│ Jobs Management                                             │
├─────────────────────────────────────────────────────────────┤
│ [🔍 Search jobs...] [Filter: All▼] [Sort: Date▼] [+ New Job]│
│                                                             │
│ Job Table:                                                  │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Job Title         │Company│Location│Apps│Status │Actions│ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ Senior React Dev  │TechCo │Remote  │ 8  │🟢Active│[View]│ │
│ │ Backend Engineer  │TechCo │SF      │ 12 │🟢Active│[View]│ │
│ │ DevOps Lead      │TechCo │NYC     │ 3  │🟢Active│[View]│ │
│ │ UI/UX Designer   │TechCo │Remote  │ 15 │🟡Paused│[View]│ │
│ │ Product Manager  │TechCo │LA      │ 22 │🔴Closed│[View]│ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ [◀ Previous] Page 1 of 3 [Next ▶]                         │
└─────────────────────────────────────────────────────────────┘
```

## 3. Application Pipeline View (Kanban)
```
┌─────────────────────────────────────────────────────────────┐
│ ← Back to Jobs    Senior React Developer - Pipeline View    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐   │
│ │ SUBMITTED │ │ SCREENING │ │INTERVIEW │ │ OFFER     │   │
│ │    (3)    │ │    (2)    │ │   (2)     │ │   (1)     │   │
│ ├───────────┤ ├───────────┤ ├───────────┤ ├───────────┤   │
│ │┌─────────┐│ │┌─────────┐│ │┌─────────┐│ │┌─────────┐│   │
│ ││ 👤 John ││ ││ 👤 Sarah││ ││ 👤 Mike ││ ││ 👤 Lisa ││   │
│ ││ Doe     ││ ││ Chen    ││ ││ Johnson ││ ││ Williams││   │
│ ││ 2 days  ││ ││ 1 week  ││ ││ 3 days  ││ ││ 1 day   ││   │
│ ││ React,  ││ ││ Node.js ││ ││ 5 years ││ ││ Senior  ││   │
│ ││ 3 years ││ ││ expert  ││ ││ exp     ││ ││ level   ││   │
│ │└─────────┘│ │└─────────┘│ │└─────────┘│ │└─────────┘│   │
│ │┌─────────┐│ │┌─────────┐│ │┌─────────┐│ │           │   │
│ ││ 👤 Amy  ││ ││ 👤 David││ ││ 👤 Emma ││ │           │   │
│ ││ Wilson  ││ ││ Brown   ││ ││ Davis   ││ │           │   │
│ ││ 1 day   ││ ││ 4 days  ││ ││ 1 week  ││ │           │   │
│ │└─────────┘│ │└─────────┘│ │└─────────┘│ │           │   │
│ │┌─────────┐│ │           │ │           │ │           │   │
│ ││ 👤 Alex ││ │           │ │           │ │           │   │
│ ││ Taylor  ││ │           │ │           │ │           │   │
│ ││ 3 hours ││ │           │ │           │ │           │   │
│ │└─────────┘│ │           │ │           │ │           │   │
│ └───────────┘ └───────────┘ └───────────┘ └───────────┘   │
│                                                             │
│ ┌───────────┐ ┌───────────┐                               │
│ │  HIRED    │ │ REJECTED  │                               │
│ │   (1)     │ │    (4)    │                               │
│ ├───────────┤ ├───────────┤                               │
│ │┌─────────┐│ │[Collapsed]│                               │
│ ││ 👤 Tom  ││ │ Click to  │                               │
│ ││ Anderson││ │ expand    │                               │
│ ││ Last Mon││ │           │                               │
│ │└─────────┘│ │           │                               │
│ └───────────┘ └───────────┘                               │
└─────────────────────────────────────────────────────────────┘
```

## 4. Candidate Detail Panel (Side Panel/Modal)
```
┌─────────────────────────────────────────────────────────────┐
│ John Doe - Application Details                        [✕]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Candidate Info:                    Status Actions:          │
│ ┌─────────────────────────────┐   ┌─────────────────────────┐│
│ │ 👤 John Doe                 │   │ Current: SUBMITTED      ││
│ │ 📧 john.doe@email.com      │   │                         ││
│ │ 📱 (555) 123-4567          │   │ Quick Actions:          ││
│ │ 📍 San Francisco, CA       │   │ [Move to Screening]     ││
│ │ 💼 3 years React exp       │   │ [Schedule Interview]    ││
│ │ 🎓 CS Degree - Stanford    │   │ [Send Rejection]        ││
│ └─────────────────────────────┘   └─────────────────────────┘│
│                                                             │
│ Cover Letter:                                               │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ "I'm excited about this React Developer position       │ │
│ │ because I've been following TechCo's innovative        │ │
│ │ approach to user experience. My experience building    │ │
│ │ scalable React applications at my current company..."   │ │
│ │                                                         │ │
│ │ [Read More...]                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Status History:                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 🟢 SUBMITTED    → Dec 20, 2:30 PM  by System           │ │
│ │ 🟡 RECEIVED     → Dec 20, 2:31 PM  by Sarah (Recruiter)│ │
│ │ 📋 Note added  → Dec 20, 3:15 PM  "Strong portfolio"  │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Internal Notes:                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [Add a note...]                              [Save]     │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Resume/Portfolio:                                           │
│ 📎 john_doe_resume.pdf  [Download]                         │
│ 🔗 https://johndoe.dev  [Visit Portfolio]                  │
│                                                             │
│                               [Close]  [Save Changes]      │
└─────────────────────────────────────────────────────────────┘
```

## 5. Mobile Responsive Considerations
```
Mobile Pipeline View (Stacked Cards):
┌─────────────────────┐
│ Senior React Dev    │
│ ← Back             │
├─────────────────────┤
│ Pipeline: [SUBMITT▼]│
│                     │
│ ┌─────────────────┐ │
│ │ 👤 John Doe     │ │
│ │ SUBMITTED       │ │
│ │ 2 days ago      │ │
│ │ [View] [Move▼]  │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │ 👤 Amy Wilson   │ │
│ │ SUBMITTED       │ │
│ │ 1 day ago       │ │
│ │ [View] [Move▼]  │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │ 👤 Alex Taylor  │ │
│ │ SUBMITTED       │ │
│ │ 3 hours ago     │ │
│ │ [View] [Move▼]  │ │
│ └─────────────────┘ │
└─────────────────────┘
```