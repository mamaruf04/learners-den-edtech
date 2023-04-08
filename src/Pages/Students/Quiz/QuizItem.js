import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userAns } from "../../../features/QuizzesApi/QuizzesSlice";

const QuizItem = ({ quize, index}) => {
  const dispatch = useDispatch();

  // quiz options state.
  const [selectedOptions, setSelectedOptions] = useState(
    quize.options.map((op) => ({
      id: op.id,
      option: op.option,
      isCorrect: false,
    }))
  );

  const compareIsCorrect = (correctAns, studentAns) => {
    // create a map of options in the first array by their id
    const optionsMap = {};
    correctAns.forEach((option) => {
      optionsMap[option.id] = option.isCorrect;
    });

    // iterate over options in the second array and compare their isCorrect field
    for (const option of studentAns) {
      if (option.id in optionsMap) {
        if (option.isCorrect !== optionsMap[option.id]) {
          return false;
        }
      } else {
        return false;
      }
    }

    return true;
  };

  //   copy the options array and update the value for quiz isCorrect
  const handleIsCorrectChange = (e, index) => {
    const newOptions = [...selectedOptions];
    newOptions[index].isCorrect = e.target.checked;
    setSelectedOptions(newOptions);
    // console.log(compareIsCorrect(quize.options,selectedOptions));
    const isCorrect = compareIsCorrect(quize.options, selectedOptions);
    dispatch(userAns({ id, isCorrect }));
  };

  const { question, video_title, options, id, video_id } = quize || {};

  return (
    <div className="quiz">
      <h4 className="question">
        Quiz {index + 1} - {question}
      </h4>
      <div className="quizOptions">
        {selectedOptions.map((option, index) => (
          <form key={option.id}>
            <label>
              <input
                className="mx-1"
                type="checkbox"
                // checked={option.isCorrect}
                onChange={(e) => handleIsCorrectChange(e, index)}
              />
              {option.option}
            </label>
            <br />
          </form>
        ))}
      </div>
    </div>
  );
};

export default QuizItem;
