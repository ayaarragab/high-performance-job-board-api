import { faker } from "@faker-js/faker";
import "dotenv/config";
import type { Sql } from "postgres";
import sql from "./config.js";

/**
 * I'll use weighted random selection
 */

const countriesWithCities = [
  { country: "Egypt", city: "Cairo", isCapital: true },
  { country: "Egypt", city: "Cairo", isCapital: true },
  { country: "Egypt", city: "Cairo", isCapital: true },
  { country: "Egypt", city: "Cairo", isCapital: true },
  { country: "Egypt", city: "Cairo", isCapital: true },
  { country: "Egypt", city: "Alexandria", isCapital: false },
  { country: "Egypt", city: "Alexandria", isCapital: false },
  { country: "Egypt", city: "Mansoura", isCapital: false },

  { country: "United States", city: "Washington, D.C.", isCapital: true },
  { country: "United States", city: "Washington, D.C.", isCapital: true },
  { country: "United States", city: "Washington, D.C.", isCapital: true },
  { country: "United States", city: "Washington, D.C.", isCapital: true },
  { country: "United States", city: "New York", isCapital: false },
  { country: "United States", city: "San Francisco", isCapital: false },
  { country: "United States", city: "Austin", isCapital: false },

  { country: "United Kingdom", city: "London", isCapital: true },
  { country: "United Kingdom", city: "London", isCapital: true },
  { country: "United Kingdom", city: "London", isCapital: true },
  { country: "United Kingdom", city: "London", isCapital: true },
  { country: "United Kingdom", city: "London", isCapital: true },
  { country: "United Kingdom", city: "Manchester", isCapital: false },
  { country: "United Kingdom", city: "Birmingham", isCapital: false },

  { country: "Germany", city: "Berlin", isCapital: true },
  { country: "Germany", city: "Berlin", isCapital: true },
  { country: "Germany", city: "Berlin", isCapital: true },
  { country: "Germany", city: "Berlin", isCapital: true },
  { country: "Germany", city: "Munich", isCapital: false },
  { country: "Germany", city: "Frankfurt", isCapital: false },

  { country: "France", city: "Paris", isCapital: true },
  { country: "France", city: "Paris", isCapital: true },
  { country: "France", city: "Paris", isCapital: true },
  { country: "France", city: "Paris", isCapital: true },
  { country: "France", city: "Lyon", isCapital: false },
  { country: "France", city: "Marseille", isCapital: false },

  { country: "Japan", city: "Tokyo", isCapital: true },
  { country: "Japan", city: "Tokyo", isCapital: true },
  { country: "Japan", city: "Tokyo", isCapital: true },
  { country: "Japan", city: "Tokyo", isCapital: true },
  { country: "Japan", city: "Osaka", isCapital: false },
  { country: "Japan", city: "Kyoto", isCapital: false },

  { country: "Canada", city: "Ottawa", isCapital: true },
  { country: "Canada", city: "Ottawa", isCapital: true },
  { country: "Canada", city: "Ottawa", isCapital: true },
  { country: "Canada", city: "Toronto", isCapital: false },
  { country: "Canada", city: "Vancouver", isCapital: false },

  { country: "Australia", city: "Canberra", isCapital: true },
  { country: "Australia", city: "Canberra", isCapital: true },
  { country: "Australia", city: "Canberra", isCapital: true },
  { country: "Australia", city: "Sydney", isCapital: false },
  { country: "Australia", city: "Melbourne", isCapital: false },

  { country: "India", city: "New Delhi", isCapital: true },
  { country: "India", city: "New Delhi", isCapital: true },
  { country: "India", city: "New Delhi", isCapital: true },
  { country: "India", city: "Mumbai", isCapital: false },
  { country: "India", city: "Bangalore", isCapital: false },

  { country: "Brazil", city: "Brasília", isCapital: true },
  { country: "Brazil", city: "Brasília", isCapital: true },
  { country: "Brazil", city: "Brasília", isCapital: true },
  { country: "Brazil", city: "São Paulo", isCapital: false },
  { country: "Brazil", city: "Rio de Janeiro", isCapital: false },
];

const remoteTypes = [
  "remote",
  "remote",
  "remote",
  "hybrid",
  "hybrid",
  "hybrid",
  "hybrid",
  "hybrid",
  "onsite",
  "onsite",
  "onsite",
  "onsite",
  "onsite",
  "onsite",
  "onsite",
  "onsite",
  "onsite",
  "onsite",
  "onsite",
  "onsite",
];

const dates = [
  new Date(2026, 0, 1),
  new Date(2026, 0, 5),
  new Date(2026, 0, 7),
  new Date(2026, 0, 9),
  new Date(2026, 0, 13),
  new Date(2026, 0, 12),
  new Date(2026, 0, 21),
  new Date(2026, 0, 22),
  new Date(2026, 0, 24),
  new Date(2026, 0, 25),
  new Date(2026, 0, 27),
  new Date(2026, 0, 29),
  new Date(2026, 0, 30),
  new Date(2026, 0, 31),
  new Date(2026, 0, 30),
  new Date(2026, 0, 22),
  new Date(2026, 0, 23),
  new Date(2026, 0, 24),
  new Date(2026, 0, 25),
  new Date(2026, 0, 26),
  new Date(2026, 0, 27),
  new Date(2026, 0, 28),
  new Date(2026, 0, 12),
  new Date(2026, 0, 13),
  new Date(2026, 0, 14),
  new Date(2026, 0, 15),
  new Date(2026, 0, 16),
  new Date(2026, 0, 17),
  new Date(2026, 0, 17),
  new Date(2026, 0, 18),
  new Date(2026, 0, 19),
  new Date(2026, 0, 20),
  new Date(2026, 0, 19),
  new Date(2026, 0, 25),
  new Date(2026, 0, 26),
  new Date(2026, 0, 27),
  new Date(2026, 0, 29),
  new Date(2026, 0, 30),
];

const jobsWithDescriptions = [
  {
    title: "Software Engineer",
    description: "Design and implement scalable microservices using Node.js and TypeScript. Collaborate with frontend teams to define robust API contracts."
  },
  {
    title: "Software Engineer",
    description: "Build robust and scalable software. Work closely with product managers to translate complex business requirements into performant technical solutions."
  },
  {
    title: "Software Engineer",
    description: "Develop RESTful APIs and background processing services. Focus on writing clean, testable, and maintainable code in a fast-paced environment."
  },
  {
    title: "Software Engineer",
    description: "Maintain and improve existing core backend systems. Optimize database queries in PostgreSQL to handle high-traffic spikes efficiently."
  },
  {
    title: "Software Engineer",
    description: "Join our core engineering team to build scalable data pipelines. Solid understanding of data structures and algorithms is required."
  },
  {
    title: "Software Engineer",
    description: "Participate in system design and code reviews. Build secure authentication and authorization flows for our enterprise applications."
  },
  {
    title: "Software Engineer II",
    description: "Take ownership of backend features from design to deployment. Implement caching strategies using Redis to improve API response times."
  },
  {
    title: "Software Engineer II",
    description: "Develop resilient distributed systems. Experience with message brokers like RabbitMQ or Kafka is highly desirable."
  },
  {
    title: "Senior Software Engineer",
    description: "Drive system architecture and tackle complex scaling challenges. Establish engineering best practices and mentor junior developers."
  },
  {
    title: "Senior Software Engineer",
    description: "Lead the design of high-availability backend services. Deep expertise in relational database design, indexing strategies, and performance tuning."
  },
  {
    title: "Senior Software Engineer",
    description: "Architect secure and scalable cloud-based solutions. Collaborate with DevOps to streamline deployment pipelines and CI/CD processes."
  },
  {
    title: "Staff Software Engineer",
    description: "Set the technical vision for the backend infrastructure. Resolve critical performance bottlenecks and design cross-service communication protocols."
  },
  {
    title: "Principal Software Engineer",
    description: "Provide technical leadership across multiple engineering teams. Drive innovation in backend architecture and ensure system reliability under massive load."
  },
  {
    title: "Junior Software Engineer",
    description: "Write clean, efficient code under the guidance of senior engineers. Learn and apply best practices in API development and database integration."
  },
  {
    title: "Junior Software Engineer",
    description: "Assist in developing server-side logic and writing unit tests. Great opportunity to grow your skills in a modern TypeScript environment."
  },

  {
    title: "Backend Engineer",
    description: "Design, build, and maintain scalable server-side applications. Strong proficiency in building robust APIs with Node.js and Express/NestJS."
  },
  {
    title: "Backend Engineer",
    description: "Responsible for developing high-performance server logic, ensuring data security, and integrating third-party payment gateways seamlessly."
  },
  {
    title: "Senior Backend Engineer",
    description: "Lead the architecture of our distributed backend systems. Expert knowledge in complex SQL queries, database sharding, and caching mechanisms."
  },
  {
    title: "Senior Backend Engineer",
    description: "Design and implement scalable microservices architecture. Resolve critical system issues and optimize overall backend performance."
  },
  {
    title: "API Developer",
    description: "Design and implement secure RESTful and GraphQL APIs. Ensure seamless integration with client applications and strict API versioning."
  },
  {
    title: "Node.js Developer",
    description: "Focus on writing clean, fast, and testable server-side JavaScript. Build low-latency and highly available backend services."
  },
  {
    title: "TypeScript Engineer",
    description: "Leverage the power of TypeScript to build type-safe, maintainable, and highly scalable backend applications."
  },

  {
    title: "Platform Engineer",
    description: "Build the foundational internal tools and services that enable product engineering teams to develop and deploy backend code faster."
  },
  {
    title: "Systems Engineer",
    description: "Maintain core backend infrastructure, automate deployment pipelines, and ensure system reliability and API performance under heavy load."
  },
  {
    title: "Database Engineer",
    description: "Design highly efficient database schemas, optimize slow queries, and manage database migrations in high-transaction environments."
  },
  {
    title: "Backend Architect",
    description: "Define the overall backend technology stack and architecture. Ensure long-term technical sustainability and scalability of the platform."
  }
];

const skills = [
  "Node.js",
  "TypeScript",
  "JavaScript",
  "PostgreSQL",
  "REST APIs",
  "GraphQL",
  "Microservices",
  "System Design",
  "Express.js",
  "NestJS",
  "SQL",
  "Database Architecture",
  "Query Optimization",
  "Redis",
  "RabbitMQ",
  "Apache Kafka",
  "Docker",
  "Kubernetes",
  "AWS",
  "CI/CD",
  "Git",
  "Unit Testing",
  "Jest",
  "Performance Tuning",
  "Data Structures",
  "Algorithms",
  "API Security",
  "Caching Strategies",
  "Distributed Systems",
  "Cloud Architecture",
  "Clean Code",
  "Agile Methodologies"
];

const getRandomCompanyId = async (sql: Sql) => {
  const companyIds = await sql`SELECT id FROM companies`;
  return companyIds[Math.floor(Math.random() * companyIds.length)];
};

const getRandomSkillId = async (sql: Sql) => {
  const skillIds = await sql`SELECT id FROM skills`;
  return skillIds[Math.floor(Math.random() * skillIds.length)];
};

const seedSkills = async (sql: Sql) => {
  console.log("Starting to seed skills...");

  const skillsToInsert = skills.map(skillName => ({ name: skillName }));

  try {
    const insertedSkills = await sql`
      INSERT INTO skills ${sql(skillsToInsert)}
      ON CONFLICT (name) DO NOTHING
    `;
  } catch (error) {
    console.error("Error while seeding skills:", error);
    throw error;
  }
};

const seedCompanies = async (sql: Sql) => {
  console.log("Starting to seed 200 companies...");

  const companySizes = ['small', 'medium', 'large'];
  const companiesToInsert = [];

  for (let i = 0; i < 200; i++) {
    const randomSize = companySizes[Math.floor(Math.random() * companySizes.length)];
    
    companiesToInsert.push({
      name: faker.company.name(),
      industry: faker.commerce.department(), 
      size: randomSize
    });
  }

  try {
    const insertedCompanies = await sql`
      INSERT INTO companies ${sql(companiesToInsert)}
      RETURNING id
    `;

    console.log(`Successfully inserted ${insertedCompanies.length} companies.`);
    
    return insertedCompanies.map(company => company.id);
  } catch (error) {
    console.error("Error while seeding companies:", error);
    throw error;
  }
};

const getAllCompanyIds = async (sql: Sql): Promise<number[]> => {
  const result = await sql`SELECT id FROM companies`;
  return result.map(row => row.id);
};

const seedJobs = async (sql: Sql) => {
  // randomaization based on company large or not is remaining
  const allCompanyIds = await getAllCompanyIds(sql);
  
  const generateJob = function* (): Iterable<any[]> {
    const seedCount = Number(process.env.SEED_COUNT) || 2000000;
    for (let index = 0; index < seedCount; index++) {
      const randomLocation =
        countriesWithCities[
          Math.floor(Math.random() * countriesWithCities.length)
        ];
      const randomRemoteType =
        remoteTypes[Math.floor(Math.random() * remoteTypes.length)];
      const randomDate = dates[Math.floor(Math.random() * dates.length)];
      const randomTitleAndDes =
        jobsWithDescriptions[
          Math.floor(Math.random() * jobsWithDescriptions.length)
        ];
      const randomCompanyId = allCompanyIds[Math.floor(Math.random() * allCompanyIds.length)];      

      const haveSalary = Math.random() > 0.8;
      let salary_max = null;
      let salary_min = null;

      if (haveSalary) {
        salary_min = Math.floor(Math.random() * 50000);
        salary_max = Math.floor(Math.random() * 1000000) + salary_min;
      }
      const finalDescription = `${randomTitleAndDes?.description} \n ${faker.lorem.paragraphs(2)}`;

      yield [
        randomTitleAndDes?.title,
        finalDescription,
        randomLocation?.country,
        randomLocation?.city,
        randomDate,
        randomRemoteType,
        randomCompanyId,
        "open",
        salary_max,
        salary_min,
      ];
    }
  };
  try {
    const generator = generateJob();

    await sql`
    COPY jobs (
        title, 
        description, 
        country, 
        city,
        created_at,
        remote_type, 
        company_id, 
        status, 
        salary_max, 
        salary_min
      ) FROM STDIN ${sql(generator)}
    `;
  } catch (error) {
  console.error("Error in COPY jobs:", error);
  }
};

const logReport = async (sql: Sql) => {
  const jobsCount = await sql`SELECT COUNT(*) FROM jobs`;
  console.log(jobsCount);
}

const deleteEverthing  = async (sql: Sql) => {
  await sql`DELETE FROM jobs`;
  await sql`DELETE FROM companies`;
  await sql`DELETE FROM skills`;
}

await seedCompanies(sql);
await seedJobs(sql);
await logReport(sql);