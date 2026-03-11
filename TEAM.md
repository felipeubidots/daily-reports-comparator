# Ubidots Development Team Structure

Last updated: 2026-03-11

## Teams Overview

### 🔧 Backend Team
**Lead:** Gustavo Angulo (woakas, CTO)

| Name | Username | Email | Seniority | Focus |
|------|----------|-------|-----------|-------|
| Gustavo Angulo | woakas | gustavo.angulo@ubidots.com | Principal | Architecture, Infrastructure, Technical Leadership |
| Gerardo Gerónimo | gajaguar | gerardo.geronimo@ubidots.com | **Senior** | API Development, Database Optimization, Refactoring |
| Juan Agudelo | juan.agudelo | juan.agudelo@ubidots.com | **Senior** | API Development, Infrastructure, Deployment |
| Gustavo Díaz | gustabot | gustavo.diaz@ubidots.com | **Senior** | API Development, Database, Testing |
| Cristian Rubio | cristian.rubio | cristian.rubio@ubidots.com | **Semi-Senior** | API Development, Performance Optimization, Testing |
| Juan David Tangarife | juan.david.tangarife | juan.david.tangarife@ubidots.com | Junior | API Development, Bug Fixes, Testing, **IoT Integration** |

### 🎨 Frontend Team
| Name | Username | Email | Seniority | Focus |
|------|----------|-------|-----------|-------|
| Cristian Arrieta | cristianarrieta | cristian.arrieta@ubidots.com | **Senior (Tech Lead)** | UI Components, State Management, Performance, Technical Leadership |
| Angelo Zambrano | angelo.zambrano | angelo.zambrano@ubidots.com | **Senior** | UI Development, Performance, Accessibility |
| Ricardo Rito | ricardo.rito | ricardo.rito@ubidots.com | **Senior** | UI Development, React, Backend API, Fullstack Integration (transitioning) |
| Brian Florez | brian.florez | brian.florez@ubidots.com | **Senior** | UI Development, Bug Fixes, Performance |
| Harold Peñaloza | harpeblue | harold.penaloza@ubidots.com | **Semi-Senior** | UI Development, Testing, Documentation |
| Christian Elías Cruz | elias | christian.elias@ubidots.com | **Semi-Senior** | UI Development, React, Testing |
| Robin Romero | robin.romero | robin.romero@ubidots.com | **Semi-Senior** | UI Development, Component Development, Testing |

### 🚀 DevOps Team
**Lead:** Gustavo Angulo (woakas, CTO)

| Name | Username | Email | Seniority | Focus |
|------|----------|-------|-----------|-------|
| Gustavo Angulo | woakas | gustavo.angulo@ubidots.com | Principal | Infrastructure, CI/CD, Technical Architecture |
| Juan Agudelo | juan.agudelo | juan.agudelo@ubidots.com | Senior | Infrastructure, Deployment, DevOps |

### 📦 Product Team
**Lead:** Isabel López

| Name | Username | Email | Seniority | Role |
|------|----------|-------|-----------|------|
| Isabel López | isabel.lopez | isabel.lopez@ubidots.com | Senior | Product Owner + **QA** |

### 🎭 Design Team
**Lead:** Maryan González

| Name | Username | Email | Seniority |
|------|----------|-------|-----------|
| Maryan González | maryan.gonzalez | maryan.gonzalez@ubidots.com | Senior |

### 📋 Management / Operations
| Name | Username | Email | Seniority | Role |
|------|----------|-------|-----------|------|
| Felipe Moreno | felipemoreno5879 | felipe.moreno@ubidots.com | Senior | Project Manager / Scrum Master + **QA Support** |

---

## Technical Leadership & Specializations

### Mobile Team
| Person | Role | Responsibility |
|--------|------|-----------------|
| **Angelo Zambrano** | Mobile Team Lead | Makes technical decisions for mobile app |
| **Brian Florez** | Mobile Developer | Supporting mobile app development |

### Technical Specifications & Documentation
| Person | Team | Responsibility |
|--------|------|-----------------|
| **Cristian Arrieta** | Frontend | Frontend Tech Lead - oversees specs & docs |
| **Christian Elías** | Frontend | Supports Arrieta in creating frontend technical specs and documentation |
| **Gerardo Gerónimo** | Backend | Creates backend technical specifications and architecture documentation |

---

## Special Cases & Dual Roles

| Person | Primary Role | Secondary Role | Notes |
|--------|--------------|-----------------|-------|
| **Angelo Zambrano** | Senior Frontend Engineer | Mobile Team Lead | Makes technical decisions for mobile app |
| **Brian Florez** | Senior Frontend Engineer | Mobile Developer | Supporting mobile development under Angelo's leadership |
| **Christian Elías** | Semi-Senior Frontend Engineer | Frontend Specs/Docs Support | Supporting Arrieta with technical documentation |
| **Gerardo Gerónimo** | Senior Backend Engineer | Backend Specs/Docs | Creates backend technical specifications |
| **Juan David Tangarife** | Backend Engineer (Junior) | IoT Engineer | Supporting Customer Success team |
| **Isabel López** | Product Owner (Senior) | QA Testing | Quality assurance duties |
| **Felipe Moreno** | Project Manager / Scrum Master (Senior) | QA Support | Supporting QA efforts |

## Team Statistics

- **Total:** 15 members
- **Backend:** 6 engineers (1 principal, 3 senior, 1 semi-senior, 1 junior)
- **Frontend:** 7 engineers (1 senior tech lead, 3 senior, 3 semi-senior)
- **DevOps:** 2 engineers (1 principal, 1 senior)
- **Product:** 1 (senior)
- **Design:** 1 (senior)

**Seniority Breakdown:**
- Principal: 1 (woakas)
- Senior: 11
- Semi-Senior: 4
- Junior: 1

## Usage in Daily Reports

The `people-context.json` file is used by the daily report comparator to:
1. Validate developer identifiers (username, email, full name)
2. Provide context about role expectations and focus areas
3. Track team velocity and alignment with role

### Updating Team Information

When team structure changes:
1. Update `people-context.json` (machine-readable format)
2. Update `TEAM.md` (human-readable format)
3. Commit both changes together
