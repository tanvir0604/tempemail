# Temp Email

**Temp Email is a privacy-focused disposable email platform for creating temporary email addresses, receiving, replying to, and forwarding emails without registration.**

The platform provides users with instantly generated temporary email addresses and inboxes that can be used for online registrations, testing, privacy protection, avoiding unwanted email, and other situations where users do not want to expose their primary email address.

Unlike a basic temporary inbox, Temp Email also supports **replying to and forwarding received emails**, making the temporary mailbox useful for more complete email workflows.

The system is built using a **microservice and event-driven architecture** with NestJS, Next.js, PostgreSQL, RabbitMQ, Docker, and Mailcow.

---

## ✨ Features

- 📧 **Instant Temporary Email** — Generate disposable email addresses without registration.
- 📥 **Temporary Inbox** — Receive incoming emails in a temporary mailbox.
- ↩️ **Reply to Emails** — Reply directly to received emails from the temporary mailbox.
- ➡️ **Forward Emails** — Forward received emails to another email address.
- ⏳ **Temporary Mailboxes** — Temporary addresses and their associated data can expire automatically.
- 🔐 **Privacy Focused** — Use a temporary email address without exposing your primary mailbox.
- 🐳 **Dockerized Infrastructure** — Containerized development and production environments.
- ⚡ **Event-Driven Architecture** — RabbitMQ enables asynchronous communication between services.
- 🧩 **Microservice Architecture** — Application functionality is separated into independently manageable services.
- 📱 **Web Application** — Modern responsive interface built with Next.js.
- 📬 **Mail Infrastructure Integration** — Mailcow manages the underlying email infrastructure and mailbox communication.
- 📝 **Blog** — Dedicated content platform for educational and SEO-focused content.

---

# 🏗️ Architecture

Temp Email follows a **microservice-oriented, event-driven architecture**.

The platform consists of a Next.js web application, multiple NestJS services, RabbitMQ for asynchronous communication, PostgreSQL for persistent data, and Mailcow for email infrastructure.

### High-Level Architecture

```text
                         ┌─────────────────────┐
                         │      Next.js        │
                         │        Web          │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     NestJS API      │
                         │   API / Gateway     │
                         └──────────┬──────────┘
                                    │
                                    │ Events / Messages
                                    ▼
                         ┌─────────────────────┐
                         │      RabbitMQ       │
                         │   Message Broker    │
                         └──────────┬──────────┘
                                    │
             ┌──────────────────────┼──────────────────────┐
             │                      │                      │
             ▼                      ▼                      ▼
      ┌─────────────┐       ┌─────────────┐        ┌─────────────┐
      │   Email     │       │  Settings   │        │   Blog      │
      │   NestJS    │       │   NestJS    │        │   NestJS    │
      └──────┬──────┘       └──────┬──────┘        └─────────────┘
             │                     │
             │                     │
             ▼                     ▼
      ┌─────────────────────────────────────┐
      │             PostgreSQL              │
      └─────────────────────────────────────┘

                         ┌─────────────────────┐
                         │       Mailcow       │
                         │ Email Infrastructure│
                         └──────────┬──────────┘
                                    │
                                    ▼
                         Temporary Mailboxes
                                    │
                                    ▼
                         Incoming / Outgoing
                              Email Flow
```

---

# 🧩 Services

## Web

The **Web** application is built with **Next.js** and provides the primary user interface.

Users can:

- Generate temporary email addresses
- View incoming messages
- Read email content
- Reply to messages
- Forward messages
- Manage temporary email settings
- Interact with the platform without creating an account

The web application communicates with the backend API rather than directly accessing internal services.

---

## API

The **API** is built with **NestJS** and acts as the main application entry point.

It handles communication between the web application and the backend service layer.

Responsibilities include:

- API endpoints
- Request processing
- Authentication/session-related operations where required
- Email operations
- Temporary mailbox operations
- Service orchestration
- Communication with RabbitMQ
- Validation and application-level business logic

---

## Email Service

The **Email** microservice is responsible for application-level email functionality.

It works with the email infrastructure and handles operations such as:

- Incoming email processing
- Email retrieval
- Reply workflows
- Forwarding workflows
- Email-related business logic
- Communication with other services through RabbitMQ

The separation of email functionality into its own service keeps email-specific business logic isolated from the main API.

---

## Mailcow Service

The **Mailcow** service is responsible for communicating with and managing the **Mailcow email infrastructure**.

It acts as the integration layer between the Temp Email application and Mailcow.

Its responsibilities include:

- Creating temporary email accounts/mailboxes
- Managing mailbox lifecycle
- Communicating with Mailcow
- Reading incoming emails
- Handling email infrastructure operations
- Supporting email delivery workflows

This separation prevents the application layer from being tightly coupled to the underlying mail server infrastructure.

```text
Temp Email Application
        │
        ▼
   Mailcow Service
        │
        ▼
      Mailcow
        │
        ▼
Mail Infrastructure
```

---

## Settings Service

The **Settings** microservice manages application-level configuration and settings-related functionality.

Keeping settings in a dedicated service allows configuration-related responsibilities to remain isolated from the main API and email processing services.

---

## Blog Service

The **Blog** application is built with **NestJS** and provides the backend functionality for the Temp Email content platform.

The blog can be used for:

- Educational content
- Privacy-related articles
- Temporary email guides
- SEO content
- Product documentation
- Email-related resources

---

# 📨 Email Architecture

Email infrastructure is one of the most important parts of Temp Email.

Instead of implementing the mail server itself, the platform uses **Mailcow** as the underlying email infrastructure.

The application communicates with Mailcow through a dedicated NestJS microservice.

### Temporary Email Creation

```text
User
 │
 ▼
Next.js Web
 │
 ▼
NestJS API
 │
 ▼
RabbitMQ
 │
 ▼
Mailcow Service
 │
 ▼
Mailcow
 │
 ▼
Temporary Email Address
```

### Receiving Email

```text
External Sender
       │
       ▼
    Mailcow
       │
       ▼
 Mailcow Service
       │
       ▼
   RabbitMQ
       │
       ▼
 Email Service
       │
       ▼
 PostgreSQL
       │
       ▼
    NestJS API
       │
       ▼
   Next.js Web
       │
       ▼
   User Inbox
```

### Replying to Email

Users can reply to received messages directly from the temporary mailbox.

```text
User
 │
 ▼
Next.js Web
 │
 ▼
NestJS API
 │
 ▼
Email Service
 │
 ▼
RabbitMQ
 │
 ▼
Mailcow Service
 │
 ▼
Mailcow
 │
 ▼
External Recipient
```

### Forwarding Email

Temp Email also supports forwarding received messages to another email address.

```text
Temporary Inbox
      │
      ▼
   User Action
      │
      ▼
  NestJS API
      │
      ▼
 Email Service
      │
      ▼
   RabbitMQ
      │
      ▼
 Mailcow Service
      │
      ▼
    Mailcow
      │
      ▼
External Email Address
```

---

# 📨 RabbitMQ & Event-Driven Architecture

**RabbitMQ** acts as the messaging backbone between the API and backend microservices.

Instead of tightly coupling every service through synchronous communication, services can publish and consume messages asynchronously.

```text
                       RabbitMQ
                          │
          ┌───────────────┼───────────────┐
          │               │               │
          ▼               ▼               ▼
       Email          Mailcow         Settings
       Service        Service         Service
```

This architecture provides several benefits:

- Loose coupling between services
- Asynchronous processing
- Better fault isolation
- Independent service scaling
- Easier background processing
- Clear separation of responsibilities
- Ability to introduce new consumers without tightly coupling them to producers

---

# 🗄️ Data Layer

Temp Email uses **PostgreSQL** as its primary relational database.

**Prisma** can be used where applicable for type-safe database access and schema management.

The database layer stores application data required by the platform while Mailcow remains responsible for the underlying mailbox infrastructure.

---

# 🧰 Technology Stack

| Technology         | Purpose                                               |
| ------------------ | ----------------------------------------------------- |
| **TypeScript**     | Primary programming language                          |
| **NestJS**         | API and backend microservices                         |
| **Next.js**        | Web application                                       |
| **Turborepo**      | Monorepo and build orchestration                      |
| **RabbitMQ**       | Asynchronous messaging and event-driven communication |
| **PostgreSQL**     | Relational database                                   |
| **Prisma**         | Type-safe database access                             |
| **Mailcow**        | Email infrastructure and mailbox management           |
| **Docker**         | Application containerization                          |
| **Docker Compose** | Development and production orchestration              |

---

# 📁 Monorepo Architecture

Temp Email uses **Turborepo** to manage multiple applications and services within a single repository.

A simplified project structure:

```text
tempemail/
├── apps/
│   ├── api/
│   ├── blog/
│   ├── email/
│   ├── mailcow/
│   ├── settings/
│   └── web/
│
├── packages/
│   └── ...
│
├── compose.development.yaml
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

The exact structure may evolve as the platform grows.

---

# 🚀 Getting Started

## Prerequisites

Make sure the following are installed:

- **Node.js `<NODE_VERSION>`**
- **pnpm**
- **Docker**
- **Docker Compose**
- **Git**

Check your Node.js version:

```bash
node -v
```

Check pnpm:

```bash
pnpm -v
```

---

## 📥 Clone the Repository

```bash
git clone git@github.com:tanvir0604/tempemail.git
cd tempemail
```

---

## 📦 Install Dependencies

```bash
pnpm install
```

---

## 🔐 Environment Variables

Each application/service may require its own environment configuration.

Create the required `.env` files inside the relevant applications.

For example:

```text
apps/
├── api/
│   └── .env
├── blog/
│   └── .env
├── email/
│   └── .env
├── mailcow/
│   └── .env
├── settings/
│   └── .env
└── web/
    └── .env
```

Never commit real credentials, database passwords, API keys, Mailcow credentials, JWT secrets, or other sensitive configuration to the repository.

---

# 🛠️ Development

Start the development infrastructure:

```bash
sudo docker compose -f compose.development.yaml up -d
```

Then start the development applications:

```bash
pnpm dev
```

The complete development flow:

```bash
git clone git@github.com:tanvir0604/tempemail.git
cd tempemail

pnpm install

# Configure .env files

sudo docker compose -f compose.development.yaml up -d

pnpm dev
```

---

# 🐳 Production Deployment

Temp Email is containerized to simplify production deployment and provide consistency between development and production environments.

## Build Production Images

```bash
sudo docker compose build
```

## Push Images to Docker Hub

Tag the generated images with your Docker Hub repository names and push them:

```bash
docker tag <local-image> <dockerhub-username>/<image>:latest
docker push <dockerhub-username>/<image>:latest
```

Repeat for the required services.

## Deploy to Production

On the production server:

```bash
sudo docker compose up -d
```

Docker Compose will start the required Temp Email services and infrastructure.

---

# 🔄 Development vs Production

### Development

```text
Source Code
     │
     ▼
   pnpm
     │
     ▼
 Turborepo
     │
     ├── Next.js Web
     ├── NestJS API
     ├── NestJS Email
     ├── NestJS Mailcow
     ├── NestJS Settings
     └── NestJS Blog

Docker Compose
     │
     ├── PostgreSQL
     ├── RabbitMQ
     └── Mailcow
```

### Production

```text
Source Code
     │
     ▼
Docker Build
     │
     ▼
Docker Images
     │
     ▼
Docker Hub
     │
     ▼
Production Server
     │
     ▼
Docker Compose
     │
     ├── Web
     ├── API
     ├── Email
     ├── Mailcow Service
     ├── Settings
     ├── Blog
     ├── PostgreSQL
     ├── RabbitMQ
     └── Mailcow
```

---

# 🎯 Engineering Highlights

Temp Email demonstrates practical experience in designing and implementing a distributed email platform using modern backend technologies.

### Architecture

- Microservice-oriented backend architecture
- Event-driven communication
- Asynchronous messaging with RabbitMQ
- Independent service boundaries
- Dedicated email infrastructure integration
- Monorepo development using Turborepo

### Backend

- NestJS-based backend services
- TypeScript
- REST API architecture
- Service-to-service communication
- Email workflow orchestration
- Mail infrastructure integration

### Infrastructure

- Dockerized services
- Docker Compose orchestration
- PostgreSQL
- RabbitMQ
- Mailcow
- Production container deployment

### Product Engineering

- Temporary email generation
- Real-time inbox experience
- Incoming email processing
- Email replies
- Email forwarding
- Automatic mailbox lifecycle management
- Privacy-oriented user experience

---

# 🔮 Future Development

Potential areas for further development include:

- Advanced spam filtering
- Improved email threat detection
- Email attachment handling
- Advanced mailbox lifecycle controls
- Email search
- Additional privacy controls
- Public API
- Usage analytics
- Additional email providers/infrastructure integrations
- More advanced automated email processing

---

# 🤝 Contributing

Contributions, bug reports, feature requests, and architectural discussions are welcome.

If you find an issue or have an idea for improving the project, open an issue or submit a pull request.

---

# 📄 License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for details.

---

# 👨‍💻 About

Temp Email is a real-world engineering project demonstrating the design and development of a **privacy-focused disposable email platform** using microservices, event-driven architecture, modern TypeScript technologies, containerized infrastructure, and dedicated email infrastructure.

The project demonstrates experience in:

- Microservices
- Distributed systems
- Event-driven architecture
- RabbitMQ
- NestJS
- Next.js
- PostgreSQL
- Docker
- Mailcow integration
- Browser/server email workflows
- Scalable backend architecture

**Built with TypeScript, NestJS, Next.js, RabbitMQ, PostgreSQL, Docker, Turborepo, and Mailcow.**
