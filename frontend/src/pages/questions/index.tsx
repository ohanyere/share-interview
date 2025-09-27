import { Link } from "react-router-dom";
import { db } from "../../firebase.config";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useEffect, useRef } from "react";
import { Star } from "lucide-react";
import Spinner from "../../components/spinner";
// import {debounce} from "lodash"

export type CardData = {
  id: string;
  department: string;
  coursecode: string;
  level: string;
  difficulty: string;
  rating: number;
  tips: string;
  userId: string;
};

const fetchCards = async () => {
  const baseQuery = collection(db, "data");
  const snapshot = await getDocs(query(baseQuery, orderBy("createdAt", "desc")));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as CardData));
};

const Question = () => {
  const [filters, setFilters] = useState<{ coursecode?: string; level?: string }>({});
  const [searchTerm, setSearchTerm] = useState(""); 
  const [level, setLevel] = useState(""); 
  const inputref = useRef<HTMLInputElement>(null)

  const { data, status } = useQuery({
    queryKey: ["cards"],
    queryFn: fetchCards,
  });



  const handleBounce = <T extends (...args : any) => void>(cb : T, delay  = 500) => {
    let timeOut : ReturnType<typeof setTimeout>
    return (...args : Parameters<T>) => {
      clearTimeout(timeOut)
      timeOut = setTimeout(() => {
        cb(...args)
      }, delay);
    }
  }

  const handleBounc = <T extends (...args : any) => void>(cb : T, delay  = 500) => {
    let timeOut : ReturnType<typeof setTimeout>
    return (...args : Parameters<T>) => {
      clearTimeout(timeOut)
      timeOut = setTimeout(() => {
        cb(...args)
      }, delay);
    }
  }


  const debouncedUpdate = useMemo(() =>
    handleBounce((value: string) => setFilters((prev) => ({ ...prev, coursecode: value }))
  , 500)
, []);

const debouncedUpdateLevel = useMemo(() =>
    handleBounc((value: string) => setFilters((prev) => ({ ...prev, level: value }))
  , 500)
, []);

useEffect(()=> {
  if(inputref.current){
    inputref.current?.focus()
  }
},[])
 
  useEffect(() => {
    debouncedUpdate(searchTerm)
  }, [searchTerm, debouncedUpdate]);

  useEffect(() => {
    debouncedUpdateLevel(level)
  }, [level, debouncedUpdateLevel]);

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

  if (status === "pending") {
    return <Spinner />
  }

  if (status === "error") {
    return <p className="text-red-500 text-center">Failed to load questions</p>;
  }

  // Filter data
  let filteredCards = data || [];
  if (filters.coursecode) {
    const search = filters.coursecode.toLowerCase();
    filteredCards = filteredCards.filter((card) =>
      card.coursecode.toLowerCase().includes(search)
    );
  }
  if (filters.level) {
    filteredCards = filteredCards.filter((card) => card.level === filters.level);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-[7rem]">
      <div className="flex flex-col sm:flex-row gap-4 mb-8 sticky top-28 left-6">
        <input
          type="text"
          placeholder="Search by course code (e.g. MATH101)"
          value={searchTerm}
          ref={inputref}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full sm:w-1/2"
        />

        <select
          value={level}
          onChange={(e) =>{
            setLevel(e.target.value)
          }}
          className="px-4 py-2 border rounded-lg w-full sm:w-1/4"
        >
          <option value="">All Levels</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="300">300</option>
          <option value="400">400</option>
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <Link
              to={`/cards/${card.id}`}
              key={card.id}
              className="block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-800 capitalize">
                  {card.coursecode}
                </h2>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                    card.difficulty
                  )}`}
                >
                  {card.difficulty}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-2">
                {card.department} {" "} {card.level}
              </p>

              <p className="text-gray-700 text-sm line-clamp-2 mb-4">{card.tips}</p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center gap-4">
                  <Star className="w-6 h-6 fill-current text-yellow-400" /> {card.rating}
                </span>
                <span className="italic">View Details →</span>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No results found</p>
        )}
      </div>
    </div>
  );
};

export default Question;
