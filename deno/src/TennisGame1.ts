import { TennisGame } from "./TennisGame.ts";

const POINT_NAME: Record<number, string> = {
  0: "Love",
  1: "Fifteen",
  2: "Thirty",
  3: "Forty",
};

export class TennisGame1 implements TennisGame {
  private m_score1: number = 0;
  private m_score2: number = 0;
  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  wonPoint(playerName: string): void {
    if (playerName === "player1") this.m_score1 += 1;
    else this.m_score2 += 1;
  }

  getCurrentWinner(): string {
    if (this.m_score1 > this.m_score2) return this.player1Name;
    else if (this.m_score1 < this.m_score2) return this.player2Name;
    else return "";
  }

  getScore(): string {
    let score: string = "";

    const diff = Math.abs(this.m_score1 - this.m_score2);
    const isAdvantage =
      (this.m_score1 >= 4 || this.m_score2 >= 4) && diff === 1;
    const isFinished = (this.m_score1 >= 4 || this.m_score2 >= 4) && diff >= 2;
    const isContinue = !isAdvantage && !isFinished;

    if (isContinue) {
      const isDeuce = this.m_score1 >= 3 && this.m_score1 === this.m_score2;
      if (isDeuce) score = "Deuce";
      else {
        if (this.m_score1 === this.m_score2)
          score = `${POINT_NAME[this.m_score1]}-All`;
        else
          score = `${POINT_NAME[this.m_score1]}-${POINT_NAME[this.m_score2]}`;
      }
    } else if (isAdvantage) {
      score = `Advantage ${this.getCurrentWinner()}`;
    } else if (isFinished) {
      score = `Win for ${this.getCurrentWinner()}`;
    }

    return score;
  }
}
