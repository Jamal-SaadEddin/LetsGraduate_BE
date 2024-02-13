# Let's Graduate Backend

## Overview
The Let's Graduate Backend repository serves as the backbone for the Let's Graduate platform, providing essential API services and data management capabilities. Built with Node.js and Express, and utilizing Sequelize for ORM with MySQL databases, it ensures efficient and secure handling of all backend functionalities. Key features include secure user authentication with bcrypt and email services using nodemailer.

## Project Link
[Let's Graduate](https://lets-graduate.netlify.app/)

## Technologies Used
- **Node.js and Express**: For creating a robust server-side API.
- **Sequelize**: As an ORM tool for MySQL, simplifying database transactions.
- **MySQL**: For database management and storage solutions.
- **bcrypt**: To ensure secure password hashing for user authentication.
- **nodemailer**: For handling email sending functionalities.

## Getting Started

### Prerequisites
- Node.js installed on your machine.
- MySQL database setup.

### Installation
1. **Clone the repository**:
   ```
   git clone https://github.com/Jamal-SaadEddin/LetsGraduate_BE.git
   cd LetsGraduate_BE
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory and populate it with your database credentials and other configuration settings.

4. **Run migrations**:
   ```
   npx knex migrate:latest
   ```

5. **Start the server**:
   ```
   npm start
   ```

## API Documentation
Refer to the `docs` folder for detailed API endpoints and usage instructions.

## Authors
- [Omar Qaneer](https://github.com/Omar-Qaneer)
- [Jamal SaadEddin](https://github.com/Jamal-SaadEddin)

## Contact
For any inquiries or suggestions, please contact us at omarmustafaqaneer@gmail.com.