import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './style.css'
import 'bulma/css/bulma.css';
import { createApp } from './lib/createApp';
import { TodosList } from './components/TodosList';
import { DataStoreService } from './services/DataStoreService';
import { TodosService } from './services/TodosService';

const app = document.getElementById('app');

createApp(
  app,
  [
    Header,
    TodosList,
    Footer,
  ],
  [ DataStoreService, TodosService ]
);
