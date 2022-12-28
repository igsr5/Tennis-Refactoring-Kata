import scores from "./scores.json" assert { type: "json" };
import { assertEquals } from "testing/asserts.ts";

import { TennisGame } from "../src/TennisGame.ts";
import { TennisGame1 } from "../src/TennisGame1.ts";
import { TennisGame2 } from "../src/TennisGame2.ts";
import { TennisGame3 } from "../src/TennisGame3.ts";

type Score = [number, number, string];

Deno.test("TennisGame1", async (t) => {
  await Promise.all(
    scores.map((score) => {
      const [ps1, ps2, expected] = score as Score;
      return t.step({
        name: `${ps1} - ${ps2} => ${expected}}`,
        fn: () => {
          // Setup
          const game: TennisGame = new TennisGame1("player1", "player2");

          // Exericise
          for (let i = 0; i < ps1; i++) {
            game.wonPoint("player1");
          }
          for (let i = 0; i < ps2; i++) {
            game.wonPoint("player2");
          }

          // Verify
          assertEquals(game.getScore(), expected);
        },
        sanitizeResources: false,
        sanitizeOps: false,
        sanitizeExit: false,
      });
    })
  );

  await t.step({
    name: ".getCurrentWinner",
    fn: () => {
      // setup
      const game = new TennisGame1("player1", "player2");

      // exercise
      game.wonPoint("player1");
      game.wonPoint("player1");
      game.wonPoint("player2");

      // verify
      assertEquals(game.getCurrentWinner(), "player1");
    },
  });

  await t.step({
    name: ".isFinished",
    fn: () => {
      // setup
      const game = new TennisGame1("player1", "player2");

      // exercise
      [...Array(4)].forEach(() => game.wonPoint("player1"));

      // verify
      assertEquals(game.isFinished(), true);
    },
  });

  await t.step({
    name: ".isAdvantage",
    fn: () => {
      // setup
      const game = new TennisGame1("player1", "player2");

      // exercise
      [...Array(4)].forEach(() => game.wonPoint("player1"));
      [...Array(5)].forEach(() => game.wonPoint("player2"));

      // verify
      assertEquals(game.isAdvantage(), true);
    },
  });
});

Deno.test("TennisGame2", async (t) => {
  await Promise.all(
    scores.map((score) => {
      const [ps1, ps2, expected] = score as Score;
      return t.step({
        name: `${ps1} - ${ps2} => ${expected}}`,
        fn: () => {
          // Setup
          const game: TennisGame = new TennisGame2("player1", "player2");

          // Exericise
          for (let i = 0; i < ps1; i++) {
            game.wonPoint("player1");
          }
          for (let i = 0; i < ps2; i++) {
            game.wonPoint("player2");
          }

          // Verify
          assertEquals(game.getScore(), expected);
        },
        sanitizeResources: false,
        sanitizeOps: false,
        sanitizeExit: false,
      });
    })
  );
});

Deno.test("TennisGame3", async (t) => {
  await Promise.all(
    scores.map((score) => {
      const [ps1, ps2, expected] = score as Score;
      return t.step({
        name: `${ps1} - ${ps2} => ${expected}}`,
        fn: () => {
          // Setup
          const game: TennisGame = new TennisGame3("player1", "player2");

          // Exericise
          for (let i = 0; i < ps1; i++) {
            game.wonPoint("player1");
          }
          for (let i = 0; i < ps2; i++) {
            game.wonPoint("player2");
          }

          // Verify
          assertEquals(game.getScore(), expected);
        },
        sanitizeResources: false,
        sanitizeOps: false,
        sanitizeExit: false,
      });
    })
  );
});
