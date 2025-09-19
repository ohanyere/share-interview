
import { Link } from "react-router-dom";


type Question = {
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

type CardProps = {
  data: Question[];
}

const Card: React.FC<CardProps> = ({ data: filteredQuestions }) => {
  
    

  
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
