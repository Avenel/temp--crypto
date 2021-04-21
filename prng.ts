const getRandomNumber = function ({ seed }: {
  seed: number;
}): { randomNumber: number; nextSeed: number } {
  const nextSeed = seed * 7 % 101;
  const randomNumber = nextSeed % 11;

  return { randomNumber, nextSeed };
};

let seed = 1;

for (let i = 0; i < 200; i++) {
  const { randomNumber, nextSeed } = getRandomNumber({ seed });

  process.stdout.write(`${randomNumber} `);

  seed = nextSeed;
}
