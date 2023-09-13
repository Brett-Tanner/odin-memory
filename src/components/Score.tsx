interface props {
  score: number;
  pB: number;
}

export function Score({ score, pB }: props) {
  return (
    <div className="col-span-5 flex justify-center items-center gap-5 p-2 bg-sky-600 border-4 rounded-lg border-neutral-200 text-2xl font-bold text-neutral-200">
      <p>Score: {score.toString()}</p>
      <p>Personal Best: {pB.toString()}</p>
    </div>
  );
}
