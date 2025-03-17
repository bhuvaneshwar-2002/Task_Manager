# 🏢 Employee Management System - Spring Boot

A simple **Employee Management System** built with **Spring Boot**, **Spring Data JPA**, **H2 Database**, and **MapStruct**.  
This project provides **CRUD operations** (Create, Read, Update, Delete) with proper **exception handling**.

---

## 📌 Features
- ✅ **CRUD Operations** for Employee Management  
- ✅ **DTO & Entity Separation** using MapStruct  
- ✅ **Global Exception Handling** (`@ControllerAdvice`)  
- ✅ **H2 In-Memory Database** for quick testing  
- ✅ **Swagger UI** for API documentation  

---

## 🛠️ Technologies Used
- **Spring Boot** (REST APIs)
- **Spring Data JPA** (Database operations)
- **H2 Database** (In-memory database)
- **MapStruct** (Entity-DTO mapping)
- **Lombok** (Reduces boilerplate code)
- **Swagger UI** (API documentation)

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

git clone https://github.com/your-username/employee-management.git
cd employee-management

### 2️⃣ Configure the Database
No additional setup is required for the database since we are using H2 (in-memory database).

However, you can modify src/main/resources/application.properties to use MySQL/PostgreSQL.

### ⚙️ Running the Application
### 1️⃣ Build and Run the Spring Boot App
mvn spring-boot:run
The application will start at http://localhost:8080.

### 📡 API Endpoints
Employee CRUD Operations
Method	Endpoint	Description
GET	/employees	Get all employees
GET	/employees/{id}	Get employee by ID
POST	/employees	Create new employee
PUT	/employees/{id}	Update employee by ID
DELETE	/employees/{id}	Delete employee by ID
Example JSON for Creating/Updating an Employee
json
{
    "name": "John Doe",
    "department": "IT"
}

### 📖 Exception Handling
Scenario	Response Code	Example Response
Employee Not Found	404 Not Found	{ "message": "Employee not found with ID: 99" }
Server Error	500 Internal Server Error	{ "message": "Something went wrong" }

### 🔍 Swagger API Documentation
Once the app is running, open Swagger UI to test APIs:
📌 http://localhost:8080/swagger-ui.html

### 📂 Project Structure
employee-management/
├── src/main/java/com/example/employee/
│   ├── controller/      --> REST API Controllers
│   ├── service/         --> Business Logic
│   ├── repository/      --> Data Access Layer
│   ├── entity/          --> Database Entities
│   ├── dto/             --> Data Transfer Objects
│   ├── mapper/          --> Mapping between DTO and Entity
│   ├── exception/       --> Global Exception Handling
│   ├── EmployeeManagementApplication.java  --> Main Application
└── pom.xml              --> Dependencies


### 📌 Next Steps
 🔒 Add Authentication (JWT)
 💾 Switch to MySQL Database
 🎨 Add Frontend with Angular/React
🤝 Contributing
Contributions are welcome! Feel free to fork this repo and submit a pull request. 🚀

### 📜 License
This project is licensed under the MIT License.

### 📞 Contact
For any queries, contact:
📧 bhuvaneshwar2002s@gmail.com
👤 Bhuvaneshwar

---

###  **How to Upload to GitHub**
1. **Initialize Git Repository**  

git init
git add .
git commit -m "Initial commit - Employee Management System"
Push to GitHub

git branch -M main
git remote add origin https://github.com/your-username/employee-management.git
git push -u origin main
