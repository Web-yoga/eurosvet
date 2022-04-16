import {useHttp} from '../../hooks/http.hook';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { studentCreated } from '../studentsList/studentsSlice';

const StudentAddForm = () => {
    const [studentName, setStudentName] = useState('');
    const [studentCourse, setStudentCourse] = useState('');

    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newStudent = {
            name: studentName,
            course: studentCourse,
        }

        request("service/students.php", "POST", JSON.stringify(newStudent))
            .then( res => { 
				if( typeof(res['error']) === 'undefined' ){
					dispatch(studentCreated(res));
				}else{
					console.log(res['error']);
				}
			})
            .catch(err => console.log(err));

        setStudentName('');
        setStudentCourse('');
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового студента</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="ФИО"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Курс</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Курс студента"
                    value={studentCourse}
                    onChange={(e) => setStudentCourse(e.target.value)}/>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default StudentAddForm;