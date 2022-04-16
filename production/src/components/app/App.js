import StudentsList from '../studentsList/StudentsList';
import StudentsAddForm from '../studentsAddForm/StudentsAddForm';

import './app.scss';

const App = () => {
    
    return (
        <main className="app">
            <div className="container mt-5">
			<div class="row justify-content-md-center">
				<div class="col-12 col-lg-4 mb-5">
					<StudentsAddForm/>
				</div>
				<div class="col-12 col-lg-8">
					<StudentsList/>
				</div>
			</div>
                
                
            </div>
        </main>
    )
}

export default App;