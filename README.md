<h1>Task Manager API</h1>

<p>
  A RESTful backend API for managing tasks with authentication, role-based authorization and secure best practices.
</p>

<p>
  This project demonstrates a production-style Node.js backend using Express, TypeScript, Prisma and PostgreSQL.
  It includes authentication with JWT, request validation, error handling, security middleware and Docker support.
</p>

<h2>API Documentation</h2>

<p>The API is fully documented with Swagger:</p>

<p align="center">
  <img src="./assets/swagger.png" width="900"/>
</p>

<hr>

<h2>Tech Stack</h2>

<ul>
<li>Node.js</li>
<li>Express</li>
<li>TypeScript</li>
<li>Prisma ORM</li>
<li>PostgreSQL</li>
<li>Docker & Docker Compose</li>
<li>JWT Authentication</li>
<li>Zod Validation</li>
<li>Swagger (OpenAPI Documentation)</li>
<li>Pino Logger</li>
<li>Helmet Security Middleware</li>
<li>Express Rate Limit</li>
</ul>

<hr>

<h2>Project Architecture</h2>

<p>The application follows a layered architecture:</p>

<pre>
  Routes → Controllers → Services → Database
</pre>

<ul>
<li><b>Routes</b> define the API endpoints</li>
<li><b>Controllers</b> handle the HTTP request/response cycle</li>
<li><b>Services</b> contain business logic</li>
<li><b>Prisma</b> manages database access</li>
</ul>

<p>Error handling, validation and authentication are implemented using Express middlewares.</p>

<hr>

<h2>Project Structure</h2>

<pre>
  src
  ├── controllers
  ├── services
  ├── routes
  ├── middlewares
  ├── errors
  ├── schemas
  ├── config
  ├── prisma
  └── server.ts
</pre>

<hr>

<h2>Running the Project</h2>

<p>Clone the repository:</p>

<pre>
  git clone https://github.com/t0msly3r/task-api.git
  cd task-manager-api
</pre>

<h3>Environment Variables</h3>

<p>Create a <code>.env</code> file in the root directory:</p>

<pre>
  DATABASE_URL=postgresql://admin:admin@postgres:5432/tasksdb
  JWT_SECRET=your_secret_key
</pre>

<p>Run the application with Docker:</p>

<pre>
  docker-compose up --build
</pre>

<p>Run the application locally:</p>

<pre>
  npm install
  npx prisma generate
  npm run dev
</pre>

<p>The API will be available at:</p>

<pre>
  http://localhost:3000
</pre>

<hr>

<h2>API Documentation</h2>

<p>
Swagger documentation is available at:
</p>

<pre>
http://localhost:3000/docs
</pre>

<p>You can explore and test all endpoints directly from the browser.</p>

<hr>

<h2>Main Endpoints</h2>

<h3>Authentication</h3>

<ul>
<li>POST /auth/register</li>
<li>POST /auth/login</li>
<li>GET /auth/me</li>
</ul>

<h3>Tasks</h3>

<ul>
<li>GET /tasks</li>
<li>POST /tasks</li>
<li>PUT /tasks/{id}</li>
<li>DELETE /tasks/{id}</li>
</ul>

<hr>

<h2>Security Features</h2>

<ul>
<li>Password hashing with bcrypt</li>
<li>JWT authentication</li>
<li>Role-based authorization</li>
<li>Request validation with Zod</li>
<li>Rate limiting to prevent brute force attacks</li>
<li>Secure HTTP headers with Helmet</li>
</ul>

<hr>

<h2>Future Improvements</h2>

<ul>
<li>Unit and integration tests</li>
<li>CI/CD pipeline</li>
<li>Refresh tokens for authentication</li>
<li>Pagination and filtering for tasks</li>
<li>Admin role management</li>
<li>Frontend client built with React or Next.js</li>
</ul>
