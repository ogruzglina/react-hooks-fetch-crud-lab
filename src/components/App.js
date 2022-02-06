import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [ questions, setQuestions] = useState([]);

  useEffect( () => {
    fetch('http://localhost:4000/questions')
      .then(resp => resp.json())
      .then( questionList => setQuestions(questionList))
  }, []);

  function handleAddQuestion (newQuestion) {
    setQuestions([
      ...questions,
      newQuestion
    ])
  }

  function handleDeleteQuestion (deletedQuestion) {
    const updatedQList = questions.filter( question => question.id !== deletedQuestion.id );

    setQuestions(updatedQList);
  }

  function handleUpdateQuestion (updatedQuestion) {
    const updatedQList = questions.map( question => 
      question.id === updatedQuestion.id
        ? updatedQuestion
        : question
    );

    setQuestions(updatedQList);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" 
        ? <QuestionForm onAddQuestion = { handleAddQuestion }/> 
        : <QuestionList 
            questions = { questions } 
            onDeleteQuestion = { handleDeleteQuestion }
            onUpdateQuestion = { handleUpdateQuestion }
          />
      }
    </main>
  );
}

export default App;
