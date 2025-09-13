// import { Clock } from "lucide-react";

// const Quiz = () => {

// //     const filteredCompanies = companies.filter(company =>
// //     company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
// //     (filterIndustry === 'all' || company.industry === filterIndustry)
// //   );

// //   const filteredExperiences = experiences.filter(exp =>
// //     exp.companyName.toLowerCase().includes(searchTerm.toLowerCase()) &&
// //     (filterDifficulty === 'all' || exp.difficulty === filterDifficulty)
// //   );

//   const filteredQuestions = questions.filter(q =>
//     q.companyName.toLowerCase().includes(searchTerm.toLowerCase()) &&
//     (filterDifficulty === 'all' || q.difficulty === filterDifficulty)
//   );

//   const getDifficultyColor = (difficulty: string) => {
//     switch (difficulty) {
//       case 'Easy': return 'text-green-600 bg-green-100';
//       case 'Medium': return 'text-yellow-600 bg-yellow-100';
//       case 'Hard': return 'text-red-600 bg-red-100';
//       default: return 'text-gray-600 bg-gray-100';
//     }
//   };

//   const getOutcomeColor = (outcome: string) => {
//     switch (outcome) {
//       case 'Offer': return 'text-green-600 bg-green-100';
//       case 'Rejected': return 'text-red-600 bg-red-100';
//       case 'Pending': return 'text-blue-600 bg-blue-100';
//       default: return 'text-gray-600 bg-gray-100';
//     }
//   };

//     return ( 

//           <div className="space-y-6">
//             {filteredQuestions.map((question) => (
//               <div
//                 key={question.id}
//                 className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
//               >
//                <h3 className="text-lg font-bold text-gray-900">{question.companyName}</h3>
//               </div>
//             ))}
//           </div>
    
//      );
// }
 
// export default Quiz;

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";
import { Link } from "react-router-dom";

interface CardData {
  id: string;
  department: string;
  coursecode: string;
  level: string;
  difficulty: string;
  rating: number;
  tips: string;
  userId: string;
}

const Quiz = () => {
  const [cards, setCards] = useState<CardData[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      const querySnapshot = await getDocs(collection(db, "data"));
      const fetchedCards: CardData[] = [];
      querySnapshot.forEach((doc) => {
        fetchedCards.push({ id: doc.id, ...doc.data() } as CardData);
      });
      setCards(fetchedCards);
    };

    fetchCards();
  }, []);

  return (
    <div>
      <h1>All Users' Cards</h1>
      <ul>
        {cards.map((card) => (
          <li key={card.id}>
            <Link to={`/cards/${card.id}`}>
              {card.coursecode} - {card.department} ({card.level})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quiz;
