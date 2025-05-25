# Insightboard
An Angular-based dynamic dashboard settings panel allowing users to configure widget properties such as labels and data sources. Designed with reactive forms, Angular signals, and Material UI components.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/dashboard-settings.git
   cd dashboard-settings
   ```
   
2. **Install dependencies:**

    Make sure you have Node.js (v18+) and Angular CLI installed globally.
    
      ```bash
      npm install -g @angular/cli
      npm install
      ```

3. **Start the mock (json) server:**
    ```bash
    npx json-server insightboard-db.json
    ```
4. **Run the development server:**
   ```bash
   ng serve
   ```
   Navigate to the address provided in the terminal. The app will automatically reload if you change any source files.


## ✨ Features

- Editable widget settings (label, data source)
- Reactive Forms with validation
- Users can drag and rearrange the widgets to customize the layout
- Responsive layout using Angular Material
- The layout is saved to localStorage
- Each widget fetches data from an API

## 🧰 Tech Stack

- Angular 19
- Angular Material
- TypeScript
- SCSS


## 🛠️ Project Structure
    
    src/
    ├── app/
    │   ├── dashboard/         # Main dashboard layout
    │   ├── settings/          # Settings component with form
    │   ├── services/          # DashboardService to manage widgets
    │   └── models/            # Widget type definitions
    

🤝 Contributing
Feel free to fork the project and submit a pull request. All contributions are welcome!

📄 License
This project is licensed under the MIT License.

Made with ❤️ using Angular and Material.
