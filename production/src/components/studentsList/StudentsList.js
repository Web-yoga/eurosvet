import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import store from '../../store';
import { studentDeleted, fetchStudents, selectAll  } from './studentsSlice';
import StudentsListItem from "../studentsListItem/StudentsListItem";
import Spinner from '../spinner/Spinner';

import './studentsList.scss';

const StudentsList = () => {

	const studentsArr = selectAll(store.getState());
    const { studentLoadingStatus } = useSelector(state => state.students);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchStudents());
        // eslint-disable-next-line
    }, []);

    const onDelete = useCallback((id) => {
        request(`service/students.php?id=${id}`, "DELETE")
            .then(dispatch(studentDeleted(id)))
            .catch(err => console.log(err));
        // eslint-disable-next-line  
    }, [request]);

    if (studentLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (studentLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderStudentsList = (arr) => {

		if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="student">
                    <h5 className="text-center mt-5">Студентов пока нет</h5>
                </CSSTransition>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition 
                    key={id}
                    timeout={500}
                    classNames="student">
                    <StudentsListItem id={id} {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderStudentsList(studentsArr);
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default StudentsList;