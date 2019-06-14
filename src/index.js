import Model from './model';
import View from './view';
import Controller from './controller';
import { save, load } from './helpers';

const state = load();

const model = new Model(state || undefined);
model.on('change', state => save(state));

const view = new View();
const controller = new Controller(model, view);
