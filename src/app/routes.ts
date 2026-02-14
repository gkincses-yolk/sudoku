import { Routes } from '@angular/router';
import { Game } from './game';

const routeConfig: Routes = [
    {
        path: '',
        component: Game,
        title: 'Sudoku Game Page',
    },
];

export default routeConfig;