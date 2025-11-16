

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
