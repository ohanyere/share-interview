import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import QuestionId from "../question-mat";

interface Question {
  id: string;
  department: string;
  coursecode: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: string[];
  category: string;
  tips: string;
  createdAt: any;
    userId : string
}

interface CardProps {
  data: Question[];
}

const Card: React.FC<CardProps> = ({ data: filteredQuestions }) => {
    console.log(filteredQuestions);
    
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  console.log(filteredQuestions);
  
  return (
    
        <div className="space-y-6 mt-11">
      {filteredQuestions.map((question) => (
        <Link to={`/card/${question.userId}`}>
            <div
          key={question.id}
          className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <span className="text-gray-600 text-4xl capitalize">{question.coursecode}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Card;
