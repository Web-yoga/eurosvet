<?php
	
	$dbh = new PDO('sqlite:sqlite/students.db');
	
	if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		
		$statement = $dbh->query("SELECT * FROM students");
		$rows = $statement->fetchAll(PDO::FETCH_ASSOC);

		echo json_encode($rows);
		
	}
	
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		
		$data = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($data['name'])) $name = htmlspecialchars(trim($data['name']));
		if(!empty($data['course'])) $course = htmlspecialchars(trim($data['course']));

		if(!empty($name) && !empty($course)){
			try  { 
				$dbh->exec("INSERT INTO students (name, course) VALUES ('".$name."', '".$course."')");
				
				$newStudent = [
				"id" => $dbh->lastInsertId(),
				"name" => $name,
				"course" => $course
				];

				echo json_encode($newStudent);
				
			}catch(PDOException $e) {
				echo json_encode(['error' => $e->getMessage()]);
			}
		}else{
			echo json_encode(['error' => "Запись отклонена т.к. одно из полей не заполнено"]);
		}

	}
	
	if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
		
		$id = $_GET['id'];
		
		$sql = 'DELETE FROM students WHERE id = :id';

        $stmt = $dbh->prepare($sql);
        $stmt->bindValue(':id', $id);
        $stmt->execute();
		
		echo json_encode(["ok"]);

	}
	
?>