const QuestionId = ({questions , index}: {questions :string, index : number}) => {
    return ( 
        <div className="bg-orange-50 rounded-xl p-4">
           <p className="text-gray-700">{questions}</p> 
          
        </div>
     );
}
 
export default QuestionId;