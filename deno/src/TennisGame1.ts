import { TennisGame } from "./TennisGame.ts";

const POINT_NAME: Record<number, string> = {
  0: "Love",
  1: "Fifteen",
  2: "Thirty",
  3: "Forty",
};

export class TennisGame1 implements TennisGame {
  private readonly player1Name: string;
  private readonly player2Name: string;
  private readonly score: Map<string, number> = new Map();

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
    this.score.set(player1Name, 0);
    this.score.set(player2Name, 0);
  }

  wonPoint(playerName: string): void {
    this.score.set(playerName, this.score.get(playerName)! + 1);
  }

  /**
   * @returns [player1Score, player2Score]
   */
  getCurrentScore(): [number, number] {
    return [
      this.score.get(this.player1Name)!,
      this.score.get(this.player2Name)!,
    ];
  }

  getCurrentWinner(): string {
    const [p1Score, p2Score] = this.getCurrentScore();
    if (p1Score > p2Score) return this.player1Name;
    if (p1Score < p2Score) return this.player2Name;
    return "";
  }

  getScoreDiff(): number {
    const [p1Score, p2Score] = this.getCurrentScore();
    return Math.abs(p1Score - p2Score);
  }

  isFinished(): boolean {
    const [p1Score, p2Score] = this.getCurrentScore();
    return (p1Score >= 4 || p2Score >= 4) && this.getScoreDiff() >= 2;
  }

  isAdvantage(): boolean {
    const [p1Score, p2Score] = this.getCurrentScore();
    return (p1Score >= 4 || p2Score >= 4) && this.getScoreDiff() === 1;
  }

  isDuece(): boolean {
    return this.score.get(this.player1Name)! >= 3 && this.getScoreDiff() === 0;
  }

  getScore(): string {
    const [p1Score, p2Score] = this.getCurrentScore();
    switch (true) {
      case this.isAdvantage():
        return `Advantage ${this.getCurrentWinner()}`;
      case this.isFinished():
        return `Win for ${this.getCurrentWinner()}`;
      case this.isDuece():
        return "Deuce";
      default: // game is continued
        return this.getScoreDiff() === 0
          ? `${POINT_NAME[p1Score]}-All`
          : `${POINT_NAME[p1Score]}-${POINT_NAME[p2Score]}`;
    }
  }
}
