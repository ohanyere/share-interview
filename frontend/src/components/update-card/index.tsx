import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import toast from "react-hot-toast";

type CardData = {
  department: string;
  coursecode: string;
  level: string;
  difficulty: string;
  questions: string[]  | string;
  tips: string;
  rating: number;
}

const UpdateCard = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CardData>({
    department: "",
    coursecode: "",
    level: "",
    difficulty: "Medium",
    questions: [],
    tips: "",
    rating: 0,
  });

  useEffect(() => {
    const fetchCard = async () => {
      if (!id) return;
      const docRef = doc(db, "data", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setFormData(docSnap.data() as CardData);
      } else {
        toast.error("Qeustions not found");
      }
    };

    fetchCard();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!id) return;
    const docRef = doc(db, "data", id);
    await updateDoc(docRef, {
      ...formData,
      questions: Array.isArray(formData.questions)
        ? formData.questions
        : formData.questions.split(/\r?\n|,|;/).map((q:string) => q.trim()).filter(Boolean)
    });
    toast.success("card updated!");
    navigate("/view");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 mt-[4rem]">
      <h2 className="text-2xl font-bold">Update Card</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
        <input
        type="text"
        name="department"
        value={formData.department}
        onChange={handleChange}
        placeholder="Department"
        className="w-full p-3 border rounded"
      />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">coursecode</label>
        <input
        type="text"
        name="coursecode"
        value={formData.coursecode}
        onChange={handleChange}
        placeholder="Course Code"
        className="w-full p-3 border rounded"
      />
      </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">questions</label>
          <textarea
        name="questions"
        value={Array.isArray(formData.questions) ? formData.questions.join("\n") : formData.questions}
        onChange={handleChange}
        placeholder="Questions"
        className="w-full p-3 border rounded h-32"
      />
        </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">tips/advice</label>
        <textarea
        name="tips"
        value={formData.tips}
        onChange={handleChange}
        placeholder="Tips"
        className="w-full p-3 border rounded h-24"
      />
      </div>
      
      <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="w-full p-3 border rounded">
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Update Card
      </button>
    </div>
  );
};

export default UpdateCard;
