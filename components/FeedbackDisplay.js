export default function FeedbackDisplay({ feedback }) {
  return (
    <div className="mt-4 p-4 bg-gray-900 rounded-xl border border-cyan-500">
      <h2 className="text-cyan-400 font-bold mb-2">AI-feedback</h2>
      <p>{feedback}</p>
    </div>
  );
}
