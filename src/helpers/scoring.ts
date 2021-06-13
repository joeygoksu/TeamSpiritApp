export const scoringEngine = (score: number): string => {
  if (score >= 90) {
    return 'Super Happy';
  } else if (score >= 70 && score <= 89) {
    return 'Happy';
  } else if (score >= 50 && score <= 69) {
    return 'Normal';
  } else if (score > 0 && score <= 49) {
    return 'Not Happy';
  } else {
    return 'Calculating...';
  }
};

export const averageScore = (data: any): string => {
  let score = 0;

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (element.score >= 0) {
      score = score + element.score;
    }
  }

  score = score / data.length;

  // console.log('👀 LOGGING ~ file: scoring.ts ~ line 28 ~ averageScore ~ score', score);
  return score.toFixed(1);
};
