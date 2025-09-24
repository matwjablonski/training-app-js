import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LoginForm } from './components/LoginForm';
import './style.css'
import 'bulma/css/bulma.css';
import { createApp } from './lib/createApp';
import { TodosList } from './components/TodosList';
import { DataStoreService } from './services/DataStoreService';
import { TodosService } from './services/TodosService';
import { AuthService } from './services/AuthService';

const app = document.getElementById('app');

// Initialize services - create empty object first
const services = {};

// Create service instances
services.DataStoreService = new DataStoreService(services);
services.TodosService = new TodosService(services);  
services.AuthService = new AuthService(services);

// Inject services into each service (for any late binding)
Object.values(services).forEach(service => {
  if (service.injectServices) {
    service.injectServices(services);
  }
});

// Check authentication status
function initApp() {
  if (services.AuthService.isAuthenticated()) {
    // User is authenticated, show main app
    showMainApp();
  } else {
    // User is not authenticated, show login form
    showLoginForm();
  }
}

function showMainApp() {
  // Clear app content first
  app.innerHTML = '';
  
  createApp(
    app,
    [
      Header,
      TodosList,
      Footer,
    ],
    services
  );
}

function showLoginForm() {
  // Clear app content
  app.innerHTML = '';
  
  // Create login form with callback
  const loginForm = new LoginForm({
    onLoginSuccess: () => {
      // User successfully logged in, show main app
      showMainApp();
    }
  });
  
  // Inject services
  loginForm.injectServices(services);
  
  // Append to app
  app.appendChild(loginForm.component);
}

// Initialize the application
initApp();
