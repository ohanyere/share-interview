import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db , auth} from "../../firebase.config";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import Spinner from "../../components/spinner";
type answer = {
  answer : string,
  question : string
}
type CardData = {
  id: string;
  department: string;
  coursecode: string;
  level: string;
  difficulty: string;
  rating: number;
  tips: string;
  userId: string;
  answers: answer[]
  questions: string[];
}


const fetchCard = async (id: string): Promise<CardData> => {
  const docRef = doc(db, "data", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) throw new Error("No such document!");
  return { id: docSnap.id, ...docSnap.data() } as CardData;
};

const Question = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: card,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["question", id],
    queryFn: () => fetchCard(id as string),
    enabled: !!id,
  });

  if (isLoading)
    return <Spinner/>

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg"> Error: {(error as Error).message}</p>
      </div>
    );

  if (!card) return null;

  // Difficulty color helper
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Hard":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 mt-10 bg-white rounded-2xl shadow-lg space-y-8 pt-[7rem]">
  
  <div className="flex justify-between items-center">
    <h1 className="sm:text-3xl font-bold text-gray-900 capitalize">
      {card.coursecode} - {card.department}
    </h1>
    <span
      className={`px-4 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(
        card.difficulty
      )}`}
    >
      {card.difficulty}
    </span>
  </div>

  {/* Meta Info */}
  <div className="grid grid-cols-2 gap-6 text-gray-700 text-lg">
    <p>
      <span className="font-semibold">Level:</span> {card.level}
    </p>
    <p className="flex gap-4 items-center">
      <span className="font-semibold ">Rating:</span> <Star className="w-6 h-6 fill-current text-yellow-400" /> {card.rating}
    </p>
  </div>

  {/* Q&A Section */}
  <div>
    <h2 className="text-xl font-bold text-gray-900 mb-4">{card.answers && card.answers.length > 0 ? "Questions & Answers" : "Questions" }</h2>
    <ul className="space-y-6">
      {card.answers && card.answers.length > 0 ? (
        card.answers.map((q, index) => (
          <li
            key={`qa-${index}`}
            className="p-6 rounded-xl shadow-sm bg-gray-50 border border-gray-200"
          >
            <p className="font-semibold text-blue-700 text-lg mb-2">
              Q{index + 1}: {q.question}
            </p>
            <p className="text-green-700 text-base leading-relaxed">
              {q.answer}
            </p>
          </li>
        ))
      ) : (
        card.questions.map((q, index) => (
          <li
            key={`qa-${index}`}
            className="p-6 rounded-xl shadow-sm bg-gray-50 border border-gray-200"
          >
            <p className="font-semibold text-blue-700 text-lg mb-2">
              {index + 1}: {q}
            </p>
           
          </li>
        ))
      )}
    </ul>
  </div>

  {/* Tips AFTER Q&A */}
  <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
    <h2 className="text-xl font-semibold text-yellow-800 mb-3">
      Tips & Advice
    </h2>
    <p className="text-gray-700 leading-relaxed">{card.tips}</p>
  </div>

  {/* Footer */}
  <div className="flex justify-between items-center">
    {auth.currentUser?.uid === card.userId && (
      <Link
        to={`/cards/update/${card.id}`}
        className="text-blue-600 hover:text-blue-800 font-medium capitalize"
      >
         Edit Details
      </Link>
    )}
    <Link
      to="/view"
      className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition capitalize"
    >
      Back to Questions
    </Link>
  </div>
</div>

  );
};

export default Question;
