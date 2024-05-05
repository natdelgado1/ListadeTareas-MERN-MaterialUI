import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

const CommentOnTask = ({ commentPosition }) => {
  const handleSumit = (e) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={handleSumit}
      className="rounded-lg px-4 py-3 text-sm bg-white absolute z-50 h-fit shadow-lg border-1 border-gray-400"
      style={{ top: `${commentPosition.y + 190}px`, right: `10px` }}
    >
      <div>
        <textarea
          className="block outline-none text-sm rounded-md w-full"
          placeholder="Comentario"
          id="comment"
          name="comment"
          rows="3"
          //   value={comment}
          //   onChange={handleChange}
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button type="submit"><PaperAirplaneIcon width={24} height={24} />{" "}</button>
      </div>
    </form>
  );
};

export default CommentOnTask;
