import { TennisGame } from "./TennisGame.ts";

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
    // TODO: use `else if` instead of `else` to avoid bugs
    else this.m_score2 += 1;
  }

  getScore(): string {
    let score: string = "";
    let tempScore: number = 0;

    const diff = Math.abs(this.m_score1 - this.m_score2);
    const isAdvantage =
      (this.m_score1 >= 4 || this.m_score2 >= 4) && diff === 1;
    const isFinished = (this.m_score1 >= 4 || this.m_score2 >= 4) && diff >= 2;

    // NOTE: when both player scores are equal
    if (this.m_score1 === this.m_score2) {
      switch (this.m_score1) {
        case 0:
          score = "Love-All";
          break;
        case 1:
          score = "Fifteen-All";
          break;
        case 2:
          score = "Thirty-All";
          break;
        default:
          score = "Deuce";
          break;
      }
      // NOTE: when advantage the game
    } else if (isAdvantage) {
      if (this.m_score1 > this.m_score2) {
        score = "Advantage player1";
      } else {
        score = "Advantage player2";
      }
      // NOTE: when finish the game
    } else if (isFinished) {
      if (this.m_score1 > this.m_score2) {
        score = "Win for player1";
      } else {
        score = "Win for player2";
      }
    } else {
      for (let i = 1; i < 3; i++) {
        if (i === 1) tempScore = this.m_score1;
        else {
          score += "-";
          tempScore = this.m_score2;
        }
        switch (tempScore) {
          case 0:
            score += "Love";
            break;
          case 1:
            score += "Fifteen";
            break;
          case 2:
            score += "Thirty";
            break;
          case 3:
            score += "Forty";
            break;
        }
      }
    }
    return score;
  }
}
