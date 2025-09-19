import { Star } from "lucide-react";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db , auth} from "../../firebase.config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ContributeData = () => {
  const navigate = useNavigate()

  type FormData = {
    department: string;
    coursecode: string;
    difficulty: 'Medium' | 'Easy' | 'Hard';
    level: string;
    questions: string; // keep as string for textarea
    tips: string;
    rating: number;
  };

  type Answer = {
  answer: string;
  question: string;
}

type ApiResponseSuccess = {
  answers: Answer[];
}

type ApiError = {
  stack: string;
  message: string;
}

type ApiResponse = ApiResponseSuccess | ApiError;

  const [formData, setFormData] = useState<FormData>({
    department: '',
    coursecode: '',
    difficulty: 'Medium',
    level: '',
    questions: '',
    tips: '',
    rating: 0
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

 const handleSubmit = async () => {
  // Destructure formData for easier access and cleaner code
  const { department, coursecode, level, difficulty, tips, rating, questions } = formData;

  // Convert questions string to array only when submitting
  const questionsArray = questions
    .split(/\r?\n|,|;/)
    .map(q => q.trim())
    .filter(Boolean);

  if (
    !department ||
    !coursecode ||
    !level ||
    !difficulty ||
    questionsArray.length === 0 ||
    !tips ||
    rating <= 0
  ) {
    toast.error("Please fill in all form fields!");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/quiz", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questions: questionsArray,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const datas: ApiResponse = await response.json();
    
    if("answers" in datas){
      await addDoc(collection(db, "data"), {
      department: department,
      coursecode: coursecode,
      level: level,
      difficulty: difficulty,
      questions: questionsArray,
      tips: tips,
      rating: Number(rating),
      answers: datas.answers, // Corrected variable name
      userId: auth.currentUser?.uid,
      createdAt: serverTimestamp(),
    });

     toast.success("Thank you for sharing your past quiz questions!");
    navigate("/view");
    }
    else {
    toast.error(datas.message || "Failed to get answers from the server.");
  }

  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message || "Failed to save contribution to database");
    }
    toast.error("Failed to save contribution to database");
  }
};

  return (
    <div className="max-w-4xl mx-auto pt-[5rem] z-[-2]">
      <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Share Your Quiz Questions</h2>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="e.g., ComSci"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Course Code</label>
              <input
                type="text"
                name="coursecode"
                value={formData.coursecode}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="e.g., Math 101"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
              <select
                name="level"
                
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">select level</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
                <option value={300}>300</option>
                <option value={400}>400</option>
                <option value={500}>500</option>
                <option value={600}>600</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Questions Asked</label>
            <textarea
              name="questions"
              value={formData.questions}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 h-32"
              placeholder="List the questions you were asked (one per line)..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tips & Advice</label>
            <textarea
              name="tips"
              value={formData.tips}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 h-24"
              placeholder="Share your tips and advice for future candidates..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Overall Rating of how difficult the questions are</label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className={`transition-colors ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`}
                >
                  <Star className="w-8 h-8 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Share Your Experience
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContributeData;
