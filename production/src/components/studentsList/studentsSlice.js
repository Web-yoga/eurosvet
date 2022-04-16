import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';



const studentsAdapter = createEntityAdapter();

const initialState = studentsAdapter.getInitialState({
	studentsLoadingStatus: 'idle'
});


export const fetchStudents = createAsyncThunk(
	'students/fetchStudents',
		async () => {
			const { request } = useHttp();
			return await request("service/students.php");
		}
);

const studentsSlice = createSlice({
	name: 'students',
	initialState,
	reducers: {
		studentCreated: (state, action) => {
			studentsAdapter.addOne( state, action.payload );
		},
		studentDeleted: (state, action) => {
			studentsAdapter.removeOne( state, action.payload );
		},
	},
	extraReducers: (builder) => {
		builder
		.addCase(fetchStudents.pending, state => { state.studentsLoadingStatus = 'loading' })
		.addCase(fetchStudents.fulfilled, (state, action) => {
			state.studentsLoadingStatus = 'idle';
			studentsAdapter.setAll(state, action.payload);
		})
		.addCase(fetchStudents.rejected, state => { state.studentsLoadingStatus = 'error' })
		.addDefaultCase(() => {})
	}
});

const { actions, reducer } = studentsSlice;

export default reducer;

export const { selectAll } = studentsAdapter.getSelectors(state => state.students);

export const {
	studentsFetching,
	studentsFetched,
	studentsFetchingError,
	studentCreated,
	studentDeleted
} = actions;