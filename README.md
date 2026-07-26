# Quiz Builder Application

A full-stack quiz management platform built using **ASP.NET Core Web API** and **Angular**.

The application enables users to create, manage, publish and attempt quizzes through a scalable web-based solution.

---

# Project Overview

Quiz Builder is designed to demonstrate full-stack application development following modern software engineering practices.

The project covers:

- Requirement analysis and decomposition
- Domain-driven entity modelling
- REST API design
- Backend service development
- Frontend implementation
- Database design
- Authentication and authorization

---

# Key Features

- Create and manage quizzes
- Add and organize questions
- Publish quizzes for users
- Attempt quizzes and submit responses
- Calculate scores
- Manage quiz lifecycle
- RESTful API-based communication
- Responsive Angular UI

---

# Solution Design Approach

The application was designed following a structured engineering approach:

```txt

Business Requirements
|
↓
Requirement Decomposition
|
↓
Domain Modelling
|
↓
Application Workflow Design
|
↓
API & Backend Implementation
|
↓
Frontend Development
|
↓
Testing & Enhancement

```

---

# Requirements Decomposition and Feature Identification

Business requirements were analysed and broken down into functional capabilities before implementation.

This helped identify:

- Core application modules
- User interactions
- Business workflows
- Required entities
- API boundaries

<img src="YOUR_REQUIREMENT_ANALYSIS_IMAGE_URL" width="800">

---

# Initial Domain Entity Mapping

Initial domain modelling was performed to identify core business entities and their relationships.

The entity design helped establish:

- Domain boundaries
- Data relationships
- Database structure
- API contract requirements

<img src="YOUR_ENTITY_MAPPING_IMAGE_URL" width="800">

---

# Application Workflow and API Design

Application workflows and API interactions were designed before implementation.

The design covers:

- User journeys
- Functional flows
- Service interactions
- API responsibilities
- Data communication between frontend and backend

<img src="YOUR_FLOW_DIAGRAM_IMAGE_URL" width="800">

---

# Solution Architecture


                Angular Frontend
                       |
                       |
                HTTP REST APIs
                       |
                       |
          ASP.NET Core Web API
                       |
    ---------------------------------
    |               |               |

```txt

Quiz Service User Service Auth Service
|
|
Entity Framework Core
|
|
SQL Server Database

```

---

# Technology Stack

## Backend

- ASP.NET Core Web API
- C#
- Entity Framework Core
- LINQ
- Dependency Injection
- RESTful API Design

## Frontend

- Angular
- TypeScript
- HTML5
- CSS
- Angular Reactive Forms

## Database

- SQL Server
- Entity Framework Core ORM

## Security

- JWT Authentication
- Role-Based Authorization

---

# Application Screenshots

(Add actual application screenshots here)

Examples:

- Login Page
- Quiz Dashboard
- Quiz Creation Page
- Question Management
- Quiz Attempt Screen
- Results Page

---

# Development Practices

The project follows:

- Clean Code principles
- SOLID principles
- Separation of concerns
- Layered architecture
- Maintainable API design
- Reusable frontend components

---

# Future Enhancements

- AI-powered quiz generation using OpenAI
- Automated question recommendations
- Analytics dashboard
- Quiz performance insights
- Cloud deployment using Azure
- CI/CD pipeline integration

---

# Learning Outcomes

This project demonstrates practical experience with:

- Full-stack application development
- Domain modelling
- API-first development
- Software architecture principles
- Modern .NET and Angular ecosystem
