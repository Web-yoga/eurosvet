import { configureStore } from '@reduxjs/toolkit';
import students from '../components/studentsList/studentsSlice';

const stringMiddleware = () => (next) => (action) => {
	if (typeof action === 'string') {
		return next({
			type: action
		})
	}
	return next(action)
};

const store = configureStore({
	reducer: {students},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
	devTools: process.env.NODE_ENV
});

export default store;