
const StudentsListItem = ({id, name, course, onDelete}) => {

    return (
        <li 
            className={`card mb-2 shadow-lg`}>
            <div className={`card-body row`}>
                <div className="col-1">
					<span className="badge rounded-pill bg-light text-dark">{id}</span>
				</div>
				<div className="col-6">
					<span className="fw-bold">{name}</span>
				</div>
                <div className="col-5">
					{course}
				</div>
            </div>
            <span onClick={onDelete} 
                className="position-absolute top-0 end-0">
                <button type="button" className="btn-close btn-close" aria-label="Close"></button>
            </span>
        </li>
    )
}

export default StudentsListItem;