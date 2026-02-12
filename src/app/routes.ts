import { Routes } from '@angular/router';
import { Board } from './board';

const routeConfig: Routes = [
    {
        path: '',
        component: Board,
        title: 'Sudoku Board Page',
    },
];

export default routeConfig;