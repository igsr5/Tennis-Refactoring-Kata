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

  getScoreDiff(): number {
    return Math.abs(this.m_score1 - this.m_score2);
  }

  isFinished(): boolean {
    return (
      (this.m_score1 >= 4 || this.m_score2 >= 4) && this.getScoreDiff() >= 2
    );
  }

  isAdvantage(): boolean {
    return (
      (this.m_score1 >= 4 || this.m_score2 >= 4) && this.getScoreDiff() === 1
    );
  }

  getScore(): string {
    const diff = this.getScoreDiff();
    const isDeuce = this.m_score1 >= 3 && diff === 0;

    switch (true) {
      case this.isAdvantage():
        return `Advantage ${this.getCurrentWinner()}`;
      case this.isFinished():
        return `Win for ${this.getCurrentWinner()}`;
      case isDeuce:
        return "Deuce";
      default:
        return diff === 0
          ? `${POINT_NAME[this.m_score1]}-All`
          : `${POINT_NAME[this.m_score1]}-${POINT_NAME[this.m_score2]}`;
    }
  }
}
